import { User, PrismaClient } from "@prisma/client";

interface CreateUserArgs {
  dbClient: PrismaClient;
  email: string;
  firstName: string;
  lastName: string;
  university: string;
  degree: string;
  admissionYear: number;
  tutorshipInterest: boolean;
  mentorshipInterest: boolean;
  volunteeringInterest: boolean;
}

const createUser = async (args: CreateUserArgs): Promise<User> => {
  if (args.email.indexOf("@") < 0) throw new Error("Invalid email");
  if (args.admissionYear <= 1900) throw new Error("Invalid admission date");
  if (!args.firstName || !args.lastName || !args.university || !args.degree)
    throw new Error("Empty inputs are not allowed.");

  let user = await args.dbClient.user.findOne({
    where: {
      email: args.email,
    },
  });

  if (user != null) {
    throw new Error(`User with email ${args.email} is already registered.`);
  }

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
      tutorshipInterest: args.tutorshipInterest,
      mentorshipInterest: args.mentorshipInterest,
      volunteeringInterest: args.volunteeringInterest,
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