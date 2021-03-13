import { ContributionSubscription, PrismaClient } from "@prisma/client";

interface CancelSubscriptionArgs {
  dbClient: PrismaClient;
  subscriptionId: number;
}

const cancelSubscription = async (
  args: CancelSubscriptionArgs
): Promise<ContributionSubscription> => {
  if (args.subscriptionId <= 0) throw new Error("Invalid id");

  const prisma = args.dbClient;

  const subscription = await prisma.contributionSubscription.findUnique({
    where: {
      id: args.subscriptionId,
    },
  });

  if (subscription == null)
    throw new Error(`Id ${args.subscriptionId} not found`);

  return await prisma.contributionSubscription.update({
    where: {
      id: args.subscriptionId,
    },
    data: {
      state: "cancelled",
    },
  });
};

export default cancelSubscription;
