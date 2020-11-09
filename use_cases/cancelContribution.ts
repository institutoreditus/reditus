import { Contribution, PrismaClient } from "@prisma/client";
import changeContributionState from "./changeContributionState";

interface CancelContributionArgs {
  dbClient: PrismaClient;
  contributionId: number;
}

const cancelContribution = async (
  args: CancelContributionArgs
): Promise<Contribution> => {
  return await changeContributionState({
    dbClient: args.dbClient,
    contributionId: args.contributionId,
    state: "cancelled",
  });
};

export default cancelContribution;
