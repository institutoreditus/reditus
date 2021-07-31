import { NextApiRequest, NextApiResponse } from "next";
import schema, { string } from "computed-types";
import createUser from "../../../use_cases/createUser";
import runRequestWithDIContainer from "../../../middlewares/diContainerMiddleware";
import { PrismaClient } from "@prisma/client";
import { DIContainerNextApiRequest } from "../../../dependency_injection/DIContainerNextApiRequest";
import ValidationError from "../../../use_cases/ValidationError";
import { mailError } from "../../../helpers/mailer";
import messages from "../../../helpers/messages";
import { isValidBirthday } from "../../../helpers/datehelper";

const CreateUserSchema = schema({
  email: string,
  firstName: string,
  lastName: string,
  university: string,
  degree: string,
  admissionYear: string,
  dob: string,
  tutorshipInterest: Boolean,
  mentorshipInterest: Boolean,
  volunteeringInterest: Boolean,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  await delay(1000);

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
      throw new ValidationError(messages.INVALID_ADMISSION_YEAR);
    }

    try {
      let birthday: Date | undefined = new Date(args.dob);
      if (!isValidBirthday(birthday)) {
        birthday = undefined;
      }

      const user = await createUser({
        dbClient: prismaClient,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        university: args.university,
        degree: args.degree,
        admissionYear: admissionYear,
        birthday: birthday,
        tutorshipInterest: args.tutorshipInterest,
        mentorshipInterest: args.mentorshipInterest,
        volunteeringInterest: args.volunteeringInterest,
      });
      if (!user) {
        throw new Error(messages.USER_REGISTRATION_FAILED);
      }
      res.statusCode = 201;
      res.json(user);
    } catch (err) {
      console.log(err);
      if (err instanceof ValidationError) {
        res.statusCode = 400;
        res.send({ message: err.message });
      } else if (err.response && err.response.status === 400) {
        res.statusCode = 400;
        console.log(JSON.stringify(err.response?.data?.errors));
        res.send({ message: "Dados invalidos." });
      } else {
        res.statusCode = 500;
        res.send({ message: "Erro inesperado." });
      }
      mailError(args.email, err);
    }
  } else {
    res.statusCode = 400;
    res.json(err && err.toJSON && err.toJSON());
  }
}
