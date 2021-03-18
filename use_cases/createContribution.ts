import { Contribution, PrismaClient } from "@prisma/client";
import getMessage from "../middlewares/messageMiddleware";
import * as Messages from "../strings/pt/messages.json";

interface CreateContributionArgs {
  dbClient: PrismaClient;
  email?: string;
  amountInCents: number;
  subscriptionId?: number;
  externalContributionId?: string;
  experimentId?: string;
}

const createContribution = async (
  args: CreateContributionArgs
): Promise<Contribution> => {
  if (args.amountInCents <= 0)
    throw new Error(getMessage(Messages.invalid_amount));
  if (args.email) {
    if (args.subscriptionId) {
      throw new Error(getMessage(Messages.id_and_email_informed));
    }
    if (args.email.indexOf("@") < 0) {
      throw new Error(getMessage(Messages.invalid_email));
    }
  } else {
    if (args.subscriptionId == null) {
      throw new Error(getMessage(Messages.empty_email));
    }
  }
  if (args.subscriptionId && args.externalContributionId == null) {
    throw new Error(getMessage(Messages.missing_external_contribution_id));
  }

  if (args.subscriptionId) {
    const existingContribution = await args.dbClient.contribution.findMany({
      where: {
        externalId: args.externalContributionId,
      },
    });

    if (existingContribution.length > 0) {
      return existingContribution[0];
    }

    const subscription = await args.dbClient.contributionSubscription.findOne({
      where: {
        id: args.subscriptionId,
      },
    });

    if (subscription == null)
      throw new Error(getMessage(Messages.subscription_id_not_found));

    return await args.dbClient.contribution.create({
      data: {
        email: subscription.email,
        amountInCents: args.amountInCents,
        state: "completed",
        externalId: args.externalContributionId,
        subscription: {
          connect: {
            id: args.subscriptionId,
          },
        },
        experimentId: subscription.experimentId,
      },
    });
  } else {
    return await args.dbClient.contribution.create({
      data: {
        email: args.email!,
        amountInCents: args.amountInCents,
        state: "pending",
        experimentId: args.experimentId,
      },
    });
  }
};

export default createContribution;
