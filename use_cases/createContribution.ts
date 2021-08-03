import {
  Contribution,
  ContributionSubscription,
  PrismaClient,
} from "@prisma/client";
import { isValidBirthday } from "../helpers/datehelper";

interface CreateContributionArgs {
  dbClient: PrismaClient;
  email?: string;
  amountInCents: number;
  subscriptionId?: number;
  externalContributionId?: string;
  experimentId?: string;
  birthday?: Date;
  failed?: boolean;
}

const createContribution = async (
  args: CreateContributionArgs
): Promise<Contribution> => {
  if (args.amountInCents <= 0) throw new Error("Invalid amount");

  // only trust the "email" argument in the case of single contributions
  // in the case of subscriptions, we will retrieve the email from the subscription itself
  if (args.email) {
    if (args.subscriptionId) {
      throw new Error("Must not inform email when subscription id is informed");
    }
    if (args.email.indexOf("@") < 0) {
      throw new Error("Invalid email");
    }
  } else {
    if (args.subscriptionId == null) {
      throw new Error("Empty email");
    }
  }

  let dob = isValidBirthday(args.birthday) ? args.birthday : undefined;

  // for subscriptions postbacks, it is possible that we actually create the contribution in the database but we don't respond Pagarme successfully (maybe some sort of network error or any other unexpected error)
  // in those cases, Pagarme will try to contact us again
  // therefore, we must implement idempotency. To do this, we need the Pagarme ID (external ID)
  if (args.subscriptionId && args.externalContributionId == null) {
    throw new Error(
      "Must inform external contribution id when subscription id is informed"
    );
  }

  let email = args.email;
  let subscription: ContributionSubscription | null = null;

  if (args.subscriptionId) {
    const existingContribution = await args.dbClient.contribution.findMany({
      where: {
        externalId: args.externalContributionId,
      },
    });

    // idempotency check
    if (existingContribution.length > 0) {
      return existingContribution[0];
    }

    subscription = await args.dbClient.contributionSubscription.findUnique({
      where: {
        id: args.subscriptionId,
      },
    });

    if (subscription == null)
      throw new Error(`Subscription Id ${args.subscriptionId} not found`);

    email = subscription.email;
    if (!dob) {
      dob = subscription.birthday ?? undefined;
    }
  }

  const user = await args.dbClient.user.findUnique({
    where: {
      email: email,
    },
  });
  let connectUser = {};
  if (user != null) {
    connectUser = { connect: { id: user.id } };
  }

  if (args.subscriptionId) {
    return await args.dbClient.contribution.create({
      data: {
        email: email!,
        amountInCents: args.amountInCents,
        state: args.failed ? "cancelled" : "completed",
        externalId: args.externalContributionId,
        subscription: {
          connect: {
            id: args.subscriptionId,
          },
        },
        User: connectUser,
        experimentId: subscription!.experimentId,
        birthday: dob,
      },
    });
  } else {
    return await args.dbClient.contribution.create({
      data: {
        email: email!,
        amountInCents: args.amountInCents,
        state: "pending",
        experimentId: args.experimentId,
        User: connectUser,
        birthday: dob,
      },
    });
  }
};

export default createContribution;
