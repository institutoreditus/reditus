import { ContributionSubscription, PrismaClient } from "@prisma/client";

interface CompleteSubscriptionArgs {
  subscriptionId: number;
  externalId: string;
  externalContributionId: string;
}

const completeSubscription = async (
  args: CompleteSubscriptionArgs
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

  const alreadyExistingContribution = await prisma.contribution.count({
    where: {
      subscriptionId: args.subscriptionId,
    },
  });

  if (alreadyExistingContribution === 0) {
    return await prisma.contributionSubscription.update({
      where: {
        id: args.subscriptionId,
      },
      data: {
        state: "active",
        externalId: args.externalId,
        contributions: {
          create: {
            amountInCents: subscription.amountInCents,
            email: subscription.email,
            state: "completed",
            externalId: args.externalContributionId,
          },
        },
      },
    });
  } else {
    return await prisma.contributionSubscription.update({
      where: {
        id: args.subscriptionId,
      },
      data: {
        state: "active",
        externalId: args.externalId,
      },
    });
  }
};

export default completeSubscription;
