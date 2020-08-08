import { ContributionSubscription, PrismaClient } from "@prisma/client";

interface CancelSubscriptionArgs {
  subscriptionId: number;
}

const cancelSubscription = async (
  args: CancelSubscriptionArgs
): Promise<ContributionSubscription> => {
  if (args.subscriptionId <= 0) throw new Error("Invalid id");

  const prisma = new PrismaClient();

  const subscription = await prisma.contributionSubscription.findOne({
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
