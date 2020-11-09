import { ContributionSubscription, PrismaClient } from "@prisma/client";

interface CreateSubscriptionArgs {
  dbClient: PrismaClient;
  email: string;
  amountInCents: number;
  experimentId?: string;
}

const createSubscription = async (
  args: CreateSubscriptionArgs
): Promise<ContributionSubscription> => {
  if (args.amountInCents <= 0) throw new Error("Invalid amount");
  if (args.email.indexOf("@") < 0) throw new Error("Invalid email");

  return await args.dbClient.contributionSubscription.create({
    data: {
      email: args.email,
      amountInCents: args.amountInCents,
      state: "pending",
      experimentId: args.experimentId,
    },
  });
};

export default createSubscription;
