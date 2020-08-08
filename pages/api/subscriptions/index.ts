import { NextApiRequest, NextApiResponse } from "next";
import schema, { number, string } from "computed-types";
import createSubscription from "../../../use_cases/createSubscription";
import completeSubscription from "../../../use_cases/completeSubscription";
import cancelSubscription from "../../../use_cases/cancelSubscription";
import {
  isCompletableStatus,
  isCancelableStatus,
} from "../../../pagarme_integration/pagarmeSubscriptionStatus";
import pagarme from "pagarme";
import url from "url";

const herokuAppName = process.env.HEROKU_APP_NAME || `reditus-staging`;
const publicUrl =
  process.env.PUBLIC_URL || `https://${herokuAppName}.herokuapp.com/`;
const postbackUrl = url.resolve(publicUrl, "/api/pagarme/postback");

// This follows the schema defined by pagar.me checkout
enum PaymentMethod {
  creditCard = "credit_card",
}

const Phone = schema({
  ddd: string,
  number: string,
});

const Address = schema({
  city: string,
  complementary: string,
  neighborhood: string,
  state: string,
  street: string,
  street_number: string,
  zipcode: string,
});

const CustomerData = schema({
  document_number: string,
  email: string,
  name: string,
  phone: Phone,
  address: Address,
});

const CreateSubscriptionSchema = schema({
  amount: number.gte(1),
  card_hash: string,
  payment_method: schema.enum(PaymentMethod, "Invalid payment method"),
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
    let subscription = await createSubscription({
      email: args.customer.email,
      amountInCents: args.amount,
    });

    const billingPeriodString = process.env.SUBSCRIPTION_BILLING_PERIOD || "30";
    const billingPeriod = +billingPeriodString;

    const pagarmeClient = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
    });
    const pagarmePlan = await pagarmeClient.plans.create({
      amount: args.amount,
      days: billingPeriod,
      name: `Plano de contribuição mensal - ${subscription.id}`,
      payment_methods: ["credit_card"],
    });

    const pagarmeSubscription = await pagarmeClient.subscriptions.create({
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

    if (isCompletableStatus(pagarmeSubscription.status)) {
      subscription = await completeSubscription({
        subscriptionId: subscription.id,
        externalId: `pagarme:${pagarmeSubscription.id}`,
        externalContributionId: `pagarme:${pagarmeSubscription.current_transaction.id}`,
      });
    } else if (isCancelableStatus(pagarmeSubscription.status)) {
      subscription = await cancelSubscription({
        subscriptionId: subscription.id,
      });
    }

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
