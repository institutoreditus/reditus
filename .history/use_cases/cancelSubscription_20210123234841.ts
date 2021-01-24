import { ContributionSubscription, PrismaClient } from "@prisma/client";
import getMessage from "../middlewares/messageMiddleware";
import * as Messages from "../strings/pt/messages.json";

interface CancelSubscriptionArgs {
  dbClient: PrismaClient;
  subscriptionId: number;
}

const cancelSubscription = async (
  args: CancelSubscriptionArgs
): Promise<ContributionSubscription> => {
  if (args.subscriptionId <= 0) throw new Error(getMessage(Messages.invalid_id));

  const prisma = args.dbClient;

  const subscription = await prisma.contributionSubscription.findOne({
    where: {
      id: args.subscriptionId,
    },
  });

  if (subscription == null)
    throw new Error(getMessage(Messages.subscription_id_not_found));

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
