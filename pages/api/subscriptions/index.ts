import { NextApiRequest, NextApiResponse } from "next";
import schema, { number, string } from "computed-types";
import createSubscription from "../../../use_cases/createSubscription";
import pagarme from "pagarme";
import url from "url";

const herokuAppName = process.env.HEROKU_APP_NAME || `reditus-staging`;
const publicUrl =
  process.env.PUBLIC_URL || `https://${herokuAppName}.herokuapp.com/`;
const postbackUrl = url.resolve(publicUrl, "/api/pagarme/postback");

const CustomerData = schema({
  document_number: string,
  name: string,
  email: string,
});

const CreateSubscriptionSchema = schema({
  amount: number.gte(1),
  card_hash: string,
  customer: CustomerData,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await runCreateSubscription(req, res);
  } else {
    res.statusCode = 405;
    res.send("");
  }
};

async function runCreateSubscription(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const validator = CreateSubscriptionSchema.destruct();
  const [err, args] = validator(req.body);
  if (!err && args) {
    const subscription = await createSubscription({
      email: args.customer.email,
      amountInCents: args.amount,
    });

    const pagarmeClient = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
    });
    const pagarmePlan = await pagarmeClient.plans.create({
      amount: args.amount,
      days: +process.env.SUBSCRIPTION_BILLING_PERIOD,
      name: `Plano de contribuição mensal - ${args.customer.email}`,
      payment_methods: ["credit_card"],
    });

    await pagarmeClient.subscriptions.create({
      reference_key: `subscription:${subscription.id}`,
      plan_id: pagarmePlan.id,
      card_hash: args.card_hash,
      payment_method: "credit_card",
      postback_url: postbackUrl,
      customer: {
        name: args.customer.name,
        document_number: args.customer.document_number,
        email: args.customer.email,
      },
    });

    res.statusCode = 201;
    res.json(subscription);
  } else {
    res.statusCode = 400;
    res.send({ error: "Invalid Data" });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
