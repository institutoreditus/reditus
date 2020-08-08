import { ContributionSubscription, PrismaClient } from "@prisma/client";

interface CreateSubscriptionArgs {
  email: string;
  amountInCents: number;
}

const createContribution = async (
  args: CreateSubscriptionArgs
): Promise<ContributionSubscription> => {
  if (args.amountInCents <= 0) throw new Error("Invalid amount");
  if (args.email.indexOf("@") < 0) throw new Error("Invalid email");

  const prisma = new PrismaClient();

  return await prisma.contributionSubscription.create({
    data: {
      ...args,
      state: "pending",
    },
  });
};

export default createContribution;
