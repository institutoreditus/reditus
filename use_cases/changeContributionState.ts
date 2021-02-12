import { Contribution, ContributionState, PrismaClient } from "@prisma/client";

interface ChangeContributionStateArgs {
  dbClient: PrismaClient;
  contributionId: number;
  state: ContributionState;
  externalId?: string;
}

const changeContributionState = async (
  args: ChangeContributionStateArgs
): Promise<Contribution> => {
  if (args.contributionId <= 0) throw new Error("Invalid id");

  const contribution = await args.dbClient.contribution.findUnique({
    where: {
      id: args.contributionId,
    },
  });

  if (contribution == null)
    throw new Error(`Id ${args.contributionId} not found`);

  if (args.externalId) {
    return await args.dbClient.contribution.update({
      where: {
        id: args.contributionId,
      },
      data: {
        state: args.state,
        externalId: args.externalId,
      },
    });
  } else {
    return await args.dbClient.contribution.update({
      where: {
        id: args.contributionId,
      },
      data: {
        state: args.state,
      },
    });
  }
};

export default changeContributionState;
