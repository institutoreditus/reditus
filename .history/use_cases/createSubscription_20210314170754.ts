import { ContributionSubscription, PrismaClient } from "@prisma/client";

interface CreateSubscriptionArgs {
  dbClient: PrismaClient;
  email: string;
  amountInCents: number;
  experimentId?: string;
  ambassadorId?: number;
}

const createSubscription = async (
  args: CreateSubscriptionArgs
): Promise<ContributionSubscription> => {
  if (args.amountInCents <= 0) throw new Error("Invalid amount");
  if (args.email.indexOf("@") < 0) throw new Error("Invalid email");
 
  const ambassador = await args.dbClient.ambassador.findUnique(
    {
      where: {
        id: args.ambassadorId,
      },
    }
  );

  if (ambassador == null)
    throw new Error(`Ambassador Id ${args.ambassadorId} not found`);
  let connectUser = {};
  if (args.email) {
    const user = await args.dbClient.user.findUnique({
      where: {
        email: args.email,
      },
    });

    if (user != null) {
      connectUser = { connect: { id: user.id } };
    }
  }

  return await args.dbClient.contributionSubscription.create({
    data: {
      email: args.email,
      amountInCents: args.amountInCents,
      state: "pending",
      experimentId: args.experimentId,
      User: connectUser,
      referencedBy: args.ambassadorId
    },
  });
};

export default createSubscription;
