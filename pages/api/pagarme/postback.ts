import { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "qs";
import validatePagarmePostback from "../../../use_cases/validatePagarmePostback";
import createContribution from "../../../use_cases/createContribution";
import completeContribution from "../../../use_cases/completeContribution";
import cancelContribution from "../../../use_cases/cancelContribution";
import completeSubscription from "../../../use_cases/completeSubscription";
import cancelSubscription from "../../../use_cases/cancelSubscription";
import getSubscriptionByExternalId from "../../../use_cases/getSubscriptionByExternalId";
import {
  isCompletableStatus as isCompletableTransactionStatus,
  isCancelableStatus as isCancelableTransactionStatus,
} from "../../../pagarme_integration/pagarmeTransactionStatus";
import {
  isCompletableStatus as isCompletableSubscriptionStatus,
  isCancelableStatus as isCancelableSubscriptionStatus,
} from "../../../pagarme_integration/pagarmeSubscriptionStatus";
import runRequestWithDIContainer from "../../../middlewares/diContainerMiddleware";
import { PrismaClient } from "@prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await runRequestWithDIContainer(req, res, runProcessPostback);
  } else {
    res.statusCode = 405;
    res.send("");
  }
};

async function runProcessPostback(req: NextApiRequest, res: NextApiResponse) {
  const signature = getFirstHeader(req, "x-hub-signature");

  const validPostBack = await validatePagarmePostback({
    requestBodyText: stringify(req.body),
    requestSignatureHeader: signature ?? "",
  });

  if (validPostBack) {
    const prismaClient: PrismaClient = req.scope.resolve("dbClient");
    const postbackObjectType = req.body["object"];
    if (postbackObjectType === "transaction") {
      const referenceKey = req.body["transaction[reference_key]"];
      const referenceId = referenceKey.split(":")[1];
      await runProcessTransactionPostback(req, res, +referenceId, prismaClient);
    } else if (postbackObjectType === "subscription") {
      const referenceKey =
        req.body["subscription[current_transaction][reference_key]"]; // can be an empty string
      let referenceId = 0;
      if (referenceKey) {
        referenceId = +referenceKey.split(":")[1];
      }

      await runProcessSubscriptionPostback(req, res, referenceId, prismaClient);
    }
  } else {
    res.statusCode = 400;
    res.send("Invalid postback signature");
  }
}

async function runProcessTransactionPostback(
  req: NextApiRequest,
  res: NextApiResponse,
  contributionId: number,
  dbClient: PrismaClient
) {
  res.statusCode = 200;

  // we only care for events that represent a change in the status of a Pagarme transaction
  const event = getFirstHeader(req, "x-pagarme-event") ?? "";

  if (event != "transaction_status_changed") {
    res.send("");
  }

  const newPagarmeStatus = req.body["current_status"];
  const pagarmeId = req.body["transaction[id]"];
  if (await isCompletableTransactionStatus(newPagarmeStatus)) {
    const result = await completeContribution({
      dbClient: dbClient,
      contributionId: contributionId,
      externalId: `pagarme:${pagarmeId}`,
    });
    res.json(result);
  } else if (await isCancelableTransactionStatus(newPagarmeStatus)) {
    const result = await cancelContribution({
      dbClient: dbClient,
      contributionId: contributionId,
    });
    res.json(result);
  } else {
    // do nothing
    res.send("");
  }
}

async function runProcessSubscriptionPostback(
  req: NextApiRequest,
  res: NextApiResponse,
  subscriptionId: number,
  dbClient: PrismaClient
) {
  res.statusCode = 200;

  const event = getFirstHeader(req, "x-pagarme-event") ?? "";
  const pagarmeId = req.body["subscription[id]"];
  const pagarmeTransactionId =
    req.body["subscription[current_transaction][id]"];
  const externalPagarmeSubscriptionId = `pagarme:${pagarmeId}`;
  const externalPagarmeContributionId = `pagarme:${pagarmeTransactionId}`;

  // sometimes the reference key is empty
  // in these cases, we receive "subscriptionId" as 0
  // we can try to retrieve the subscription id if we have the corresponding external id already in our database
  if (subscriptionId === 0) {
    const subscription = await getSubscriptionByExternalId({
      dbClient: dbClient,
      externalId: externalPagarmeSubscriptionId,
    });

    if (subscription) {
      subscriptionId = subscription!.id;
    }
    // even with we couldn't find a corresponding subscription we will not throw an error right now, because we might find out that this specific postback is not relevant
  }

  if (event === "subscription_status_changed") {
    const newPagarmeStatus = req.body["current_status"];
    if (await isCompletableSubscriptionStatus(newPagarmeStatus)) {
      const result = await completeSubscription({
        dbClient: dbClient,
        subscriptionId: subscriptionId,
        externalId: externalPagarmeSubscriptionId,
        externalContributionId: externalPagarmeContributionId,
      });
      res.json(result);
    } else if (await isCancelableSubscriptionStatus(newPagarmeStatus)) {
      const result = await cancelSubscription({
        dbClient: dbClient,
        subscriptionId: subscriptionId,
      });
      res.json(result);
    } else {
      // do nothing
      res.send("");
    }
  } else if (event === "transaction_created") {
    const result = await createContribution({
      dbClient: dbClient,
      amountInCents: +req.body["subscription[current_transaction][amount]"],
      subscriptionId: subscriptionId,
      externalContributionId: externalPagarmeContributionId,
    });
    res.json(result);
  } else {
    res.send("");
  }
}

const getFirstHeader = (
  req: NextApiRequest,
  key: string
): string | undefined => {
  const headers = req.headers[key];
  if (Array.isArray(headers)) return headers[0];
  return headers;
};
