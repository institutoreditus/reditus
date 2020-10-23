import { User, PrismaClient } from "@prisma/client";

interface CreateUserArgs {
  dbClient: PrismaClient;
  email: string;
  firstName: string;
  lastName: string;
  university: string;
  degree: string;
  admissionDate: Date;
  tutorshipInterest: boolean;
  mentorshipInterest: boolean;
  volunteeringInterest: boolean;
}

const createUser = async (args: CreateUserArgs): Promise<User> => {
  if (args.email.indexOf("@") < 0) throw new Error("Invalid email");

  let user = await args.dbClient.user.findOne({
    where: {
      email: args.email,
    },
  });

  if (user != null) {
    throw new Error(`User with email ${args.email} is already registered.`);
  }

  user = await args.dbClient.user.create({
    data: {
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      university: args.university,
      degree: args.degree,
      admissionDate: args.admissionDate,
      tutorshipInterest: args.tutorshipInterest,
      mentorshipInterest: args.mentorshipInterest,
      volunteeringInterest: args.volunteeringInterest,
    },
  });

  if (user == null) {
    throw new Error("Unexpected error while creating user.");
  }

  const existingContributionForUser = await args.dbClient.contribution.findMany(
    {
      where: {
        email: user.email,
        user: null,
      },
    }
  );

  for (let index = 0; index < existingContributionForUser.length; index++) {
    const contrib = existingContributionForUser[index];
    await args.dbClient.contribution.update({
      where: { id: contrib.id },
      data: {
        user: {
          connect: {
            id: user!.id,
          },
        },
      },
    });
  }
  
  return user;
};

export default createUser;
