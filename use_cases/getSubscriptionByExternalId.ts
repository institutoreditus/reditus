import { ContributionSubscription, PrismaClient } from "@prisma/client";

interface GetSubscriptionByExternalIdArgs {
  dbClient: PrismaClient;
  externalId: string;
}

const getSubscriptionByExternalId = async (
  args: GetSubscriptionByExternalIdArgs
): Promise<ContributionSubscription | null> => {
  const subscription = await args.dbClient.contributionSubscription.findMany({
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
