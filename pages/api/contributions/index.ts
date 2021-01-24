import { NextApiRequest, NextApiResponse } from "next";
import schema, { string, number } from "computed-types";
import createContribution from "../../../use_cases/createContribution";
import axios from "axios";
import url from "url";
import runRequestWithDIContainer from "../../../middlewares/diContainerMiddleware";
import { PrismaClient } from "@prisma/client";
import { DIContainerNextApiRequest } from "../../../dependency_injection/DIContainerNextApiRequest";
import mail, { mailError } from "../../../helpers/mailer";

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

const CreateContributionSchema = schema({
  amount: number.gte(1),
  card_hash: string,
  payment_method: schema.enum(PaymentMethod, "Invalid payment method"),
  customer: CustomerData,
  ssr: string,
});

async function runCreateContribution(
  req: DIContainerNextApiRequest,
  res: NextApiResponse
) {
  const prismaClient: PrismaClient = req.scope.resolve("dbClient");
  const validator = CreateContributionSchema.destruct();
  const [err, args] = validator(req.body);
  if (!err && args) {
    const contribution = await createContribution({
      dbClient: prismaClient,
      email: args.customer.email,
      amountInCents: args.amount,
      experimentId: args.ssr,
    });

    try {
      const pagarmeData = {
        api_key: process.env.PAGARME_API_KEY,
        payment_method: args.payment_method,
        amount: args.amount,
        card_hash: args.card_hash,
        customer: {
          type:
            args.customer.document_number.length > 11
              ? "company"
              : "individual",
          external_id: args.customer.email,
          name: args.customer.name,
          email: args.customer.email,
          country: "br",
          phone_numbers: [
            `+55${args.customer.phone.ddd}${args.customer.phone.number}`,
          ],
          documents: [
            {
              type: args.customer.document_number.length > 11 ? "cnpj" : "cpf",
              number: args.customer.document_number,
            },
          ],
        },
        billing: {
          name: args.customer.name,
          address: {
            street: args.customer.address.street,
            street_number: args.customer.address.street_number,
            zipcode: args.customer.address.zipcode,
            country: "br",
            state: args.customer.address.state,
            city: args.customer.address.city,
          },
        },
        items: [
          {
            id: contribution.id.toString(),
            title: "Contribuição " + contribution.id.toString(),
            unit_price: args.amount,
            quantity: 1,
            tangible: false,
          },
        ],
        reference_key: `${herokuAppName}:contribution:${contribution.id}`,
        postback_url: postbackUrl,
      };

      await axios.post("https://api.pagar.me/1/transactions", pagarmeData);

      // TODO(rrozendo): we could update the external id right after this API call

      res.statusCode = 201;
      res.json(contribution);
      mail(args.customer.email, args.customer.name);
    } catch (err) {
      if (err.response.status === 400) {
        res.statusCode = 400;
        console.log(JSON.stringify(err.response.data.errors));
        res.send({ error: "Invalid Data" });
      } else {
        res.statusCode = 500;
        res.send("");
      }
      mailError(args.customer.email, err);
    }
  } else {
    res.statusCode = 400;
    res.json(err && err.toJSON && err.toJSON());
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await runRequestWithDIContainer(req, res, runCreateContribution);
  } else {
    res.statusCode = 405;
    res.send("");
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
