import { ContributionSubscription, PrismaClient } from "@prisma/client";

interface GetSubscriptionByExternalIdArgs {
  externalId: string;
}

const getSubscriptionByExternalId = async (
  args: GetSubscriptionByExternalIdArgs
): Promise<ContributionSubscription | null> => {
  const prisma = new PrismaClient();

  const subscription = await prisma.contributionSubscription.findMany({
    where: {
      externalId: args.externalId,
    },
  });

  if (subscription.length === 0) {
    return null;
  } else {
    return subscription[0];
  }
};

export default getSubscriptionByExternalId;
