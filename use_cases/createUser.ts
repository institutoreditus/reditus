import { User, PrismaClient } from "@prisma/client";
import messages from "../helpers/messages";
import ValidationError from "./ValidationError";

interface CreateUserArgs {
  dbClient: PrismaClient;
  email: string;
  firstName: string;
  lastName: string;
  university: string;
  degree: string;
  admissionYear: number;
  birthday: Date | undefined;
  tutorshipInterest: boolean;
  mentorshipInterest: boolean;
  volunteeringInterest: boolean;
  url?: string;
}

const createUser = async (args: CreateUserArgs): Promise<User> => {
  if (args.email.indexOf("@") < 0)
    throw new ValidationError(messages.INVALID_EMAIL);
  if (args.admissionYear <= 1900)
    throw new ValidationError(messages.INVALID_ADMISSION_YEAR);
  if (!args.firstName || !args.lastName || !args.university || !args.degree)
    throw new ValidationError(messages.REQUIRED_FIELDS);
  if (!args.birthday || args.birthday.getFullYear() < 1900)
    throw new ValidationError(messages.INVALID_DATE_OF_BIRTH);

  let user = await args.dbClient.user.findUnique({
    where: {
      email: args.email,
    },
  });

  if (user != null)
    throw new ValidationError(
      `Usuário com email ${args.email} já está cadastado.`
    );

  const existingContributionsForUser = await args.dbClient.contribution.findMany(
    {
      where: {
        email: args.email,
      },
    }
  );

  const existingSubscriptionsForUser = await args.dbClient.contributionSubscription.findMany(
    {
      where: {
        email: args.email,
      },
    }
  );

  user = await args.dbClient.user.create({
    data: {
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      university: args.university,
      degree: args.degree,
      admissionYear: args.admissionYear,
      birthday: args.birthday,
      tutorshipInterest: args.tutorshipInterest,
      mentorshipInterest: args.mentorshipInterest,
      volunteeringInterest: args.volunteeringInterest,
      url: args.url,
      contributions: {
        connect: existingContributionsForUser.map((c) => ({ id: c.id })),
      },
      subscriptions: {
        connect: existingSubscriptionsForUser.map((s) => ({ id: s.id })),
      },
    },
  });

  if (user == null) {
    throw new Error("Unexpected error while creating user.");
  }

  return user;
};

export default createUser;
