import { NextApiRequest, NextApiResponse } from "next";
import schema, { string, number } from "computed-types";
import createContribution from "../../../use_cases/createContribution";

const CreateContributionSchema = schema({
  email: string
    .trim()
    .test((email) => email.indexOf("@") >= 0, "Invalid Email"),
  amountInCents: number.gte(1),
});

async function runCreateContribution(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const validator = CreateContributionSchema.destruct();
  const [err, contributionArgs] = validator(req.body);
  if (!err && contributionArgs) {
    const contribution = await createContribution(contributionArgs);
    res.statusCode = 201;
    res.json(contribution);
  } else {
    res.statusCode = 400;
    res.json(err && err.toJSON && err.toJSON());
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await runCreateContribution(req, res);
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
