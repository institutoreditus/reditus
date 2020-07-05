import { Contribution, ContributionState, PrismaClient } from "@prisma/client";

interface ChangeContributionStateArgs {
  contributionId: number;
  state: ContributionState;
}

const changeContributionState = async (
  args: ChangeContributionStateArgs
): Promise<Contribution> => {
  if (args.contributionId <= 0) throw new Error("Invalid id");

  const prisma = new PrismaClient();

  const contribution = await prisma.contribution.findOne({
    where: {
      id: args.contributionId,
    },
  });

  if (contribution == null)
    throw new Error(`Id ${args.contributionId} not found`);

  return await prisma.contribution.update({
    where: {
      id: args.contributionId,
    },
    data: {
      state: args.state,
    },
  });
};

export default changeContributionState;
