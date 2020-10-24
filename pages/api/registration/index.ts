import { NextApiRequest, NextApiResponse } from "next";
import schema, { string } from "computed-types";
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
  admissionYear: string,
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
    const admissionYear: number = +`${args.admissionYear}`;
    if (!admissionYear || admissionYear <= 1900) {
      throw new Error("Invalid admission year.");
    }

    try {
      const user = await createUser({
        dbClient: prismaClient,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        university: args.university,
        degree: args.degree,
        admissionYear: admissionYear,
        tutorshipInterest: args.tutorshipInterest,
        mentorshipInterest: args.mentorshipInterest,
        volunteeringInterest: args.volunteeringInterest,
      });
      if (!user) {
        throw new Error("Could not create user");
      }
      res.statusCode = 201;
      res.json(user);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
        res.statusCode = 400;
        console.log(JSON.stringify(err.response.data.errors));
        res.send({ error: "Invalid Data" });
      } else {
        res.statusCode = 500;
        res.send("");
      }
    }
  } else {
    res.statusCode = 400;
    res.json(err && err.toJSON && err.toJSON());
  }
}
