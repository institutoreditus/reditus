import { ContributionSubscription, PrismaClient } from "@prisma/client";
import getMessage from "../middlewares/messageMiddleware";
import * as Messages from "../strings/pt/messages.json";

interface CreateSubscriptionArgs {
  dbClient: PrismaClient;
  email: string;
  amountInCents: number;
  experimentId?: string;
}

const createSubscription = async (
  args: CreateSubscriptionArgs
): Promise<ContributionSubscription> => {
  if (args.amountInCents <= 0) throw new Error(getMessage(Messages.invalid_amount));
  if (args.email.indexOf("@") < 0) throw new Error(getMessage(Messages.invalid_email));

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
