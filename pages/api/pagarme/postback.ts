import { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "qs";
import validatePagarmePostback from "../../../use_cases/validatePagarmePostback";
import createContribution from "../../../use_cases/createContribution";
import completeContribution from "../../../use_cases/completeContribution";
import cancelContribution from "../../../use_cases/cancelContribution";
import completeSubscription from "../../../use_cases/completeSubscription";
import cancelSubscription from "../../../use_cases/cancelSubscription";
import {
  isCompletableStatus as isCompletableTransactionStatus,
  isCancelableStatus as isCancelableTransactionStatus,
} from "../../../pagarme_integration/pagarmeTransactionStatus";
import {
  isCompletableStatus as isCompletableSubscriptionStatus,
  isCancelableStatus as isCancelableSubscriptionStatus,
} from "../../../pagarme_integration/pagarmeSubscriptionStatus";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const signature = getFirstHeader(req, "x-hub-signature");

    const validPostBack = await validatePagarmePostback({
      requestBodyText: stringify(req.body),
      requestSignatureHeader: signature ?? "",
    });

    if (validPostBack) {
      const referenceKey = req.body["transaction[reference_key]"];
      const [referenceType, referenceId] = referenceKey.split(":");

      if (referenceType === "contribution") {
        await runProcessTransactionPostback(req, res, +referenceId);
      } else if (referenceType === "subscription") {
        await runProcessSubscriptionPostback(req, res, +referenceId);
      }
    } else {
      res.statusCode = 400;
      res.send("Invalid postback signature");
    }
  } else {
    res.statusCode = 405;
    res.send("");
  }
};

async function runProcessTransactionPostback(
  req: NextApiRequest,
  res: NextApiResponse,
  contributionId: number
) {
  res.statusCode = 200;

  // we only care for events that represent a change in the status of a Pagarme transaction
  const event = getFirstHeader(req, "x-pagarme-event") ?? "";

  if (event != "transaction_status_changed") {
    res.send("");
  }

  const newPagarmeStatus = req.body["current_status"];
  if (await isCompletableTransactionStatus(newPagarmeStatus)) {
    const result = await completeContribution({
      contributionId: contributionId,
    });
    res.json(result);
  } else if (await isCancelableTransactionStatus(newPagarmeStatus)) {
    const result = await cancelContribution({ contributionId: contributionId });
    res.json(result);
  } else {
    // do nothing
    res.send("");
  }
}

async function runProcessSubscriptionPostback(
  req: NextApiRequest,
  res: NextApiResponse,
  subscriptionId: number
) {
  res.statusCode = 200;

  const event = getFirstHeader(req, "x-pagarme-event") ?? "";

  if (event === "subscription_status_changed") {
    const newPagarmeStatus = req.body["current_status"];
    if (await isCompletableSubscriptionStatus(newPagarmeStatus)) {
      const result = await completeSubscription({
        subscriptionId: subscriptionId,
      });
      res.json(result);
    } else if (await isCancelableSubscriptionStatus(newPagarmeStatus)) {
      const result = await cancelSubscription({
        subscriptionId: subscriptionId,
      });
      res.json(result);
    } else {
      // do nothing
      res.send("");
    }
  } else if (event === "transaction_created") {
    const result = await createContribution({
      amountInCents: +req.body["subscription[current_transaction][amount]"],
      subscriptionId: subscriptionId,
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
