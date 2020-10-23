import { NextApiRequest, NextApiResponse } from "next";
import schema, { number, string } from "computed-types";
import createUser from "../../../use_cases/createUser";
import runRequestWithDIContainer from "../../../middlewares/diContainerMiddleware";
import { PrismaClient } from "@prisma/client";
import { DIContainerNextApiRequest } from "../../../dependency_injection/DIContainerNextApiRequest";

const CreateUserSchema = schema({
  email: string,
  firstName: string,
  lastName: string,
  university: string,
  degree: string,
  admissionYear: number.gte(1900),
  tutorshipInterest: Boolean,
  mentorshipInterest: Boolean,
  volunteeringInterest: Boolean,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await runRequestWithDIContainer(req, res, runCreateUser);
  } else {
    res.statusCode = 405;
    res.send("");
  }
};

async function runCreateUser(
  req: DIContainerNextApiRequest,
  res: NextApiResponse
) {
  const validator = CreateUserSchema.destruct();
  const [err, args] = validator(req.body);

  if (!err && args) {
    const prismaClient: PrismaClient = req.scope.resolve("dbClient");

    const user = await createUser({
      dbClient: prismaClient,
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      university: args.university,
      degree: args.degree,
      admissionYear: args.admissionYear,
      tutorshipInterest: args.tutorshipInterest,
      mentorshipInterest: args.mentorshipInterest,
      volunteeringInterest: args.volunteeringInterest,
    });
  }
}
