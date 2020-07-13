import { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "qs";
import validatePagarmePostback from "../../../../use_cases/validatePagarmePostback";
import completeContribution from "../../../../use_cases/completeContribution";
import cancelContribution from "../../../../use_cases/cancelContribution";
import {
  isCompletableStatus,
  isCancelableStatus,
} from "../../../../pagarme_integration/pagarmeTransactionStatus";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  if (req.method === "POST") {
    const signature = getFirstHeader(req, "x-hub-signature");

    const validPostBack = await validatePagarmePostback({
      requestBodyText: stringify(req.body),
      requestSignatureHeader: signature ?? "",
    });

    if (validPostBack) {
      const numberId: number = +id; // convert to number
      await runProcessPostback(req, res, numberId);
    } else {
      res.statusCode = 400;
      res.send("Invalid postback signature");
    }
  } else {
    res.statusCode = 405;
    res.send("");
  }
};

async function runProcessPostback(
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
  if (await isCompletableStatus(newPagarmeStatus)) {
    const result = await completeContribution({
      contributionId: contributionId,
    });
    res.json(result);
  } else if (await isCancelableStatus(newPagarmeStatus)) {
    const result = await cancelContribution({ contributionId: contributionId });
    res.json(result);
  } else {
    // do nothing
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
