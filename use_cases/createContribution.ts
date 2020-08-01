import { Contribution, PrismaClient } from "@prisma/client";

interface CreateContributionArgs {
  email?: string;
  amountInCents: number;
  subscriptionId?: number;
}

const createContribution = async (
  args: CreateContributionArgs
): Promise<Contribution> => {
  if (args.amountInCents <= 0) throw new Error("Invalid amount");
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

  const prisma = new PrismaClient();

  if (args.subscriptionId) {
    const subscription = await prisma.contributionSubscription.findOne({
      where: {
        id: args.subscriptionId,
      },
    });

    if (subscription == null)
      throw new Error(`Subscription Id ${args.subscriptionId} not found`);

    return await prisma.contribution.create({
      data: {
        email: subscription.email,
        amountInCents: args.amountInCents,
        state: "completed",
        subscription: {
          connect: {
            id: args.subscriptionId,
          },
        },
      },
    });
  } else {
    return await prisma.contribution.create({
      data: {
        email: args.email!,
        amountInCents: args.amountInCents,
        state: "pending",
      },
    });
  }
};

export default createContribution;
