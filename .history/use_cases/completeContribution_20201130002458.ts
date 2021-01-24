import { Contribution, PrismaClient } from "@prisma/client";
import changeContributionState from "./changeContributionState";

interface CompleteContributionArgs {
  dbClient: PrismaClient;
  contributionId: number;
  externalId: string;
}

const completeContribution = async (
  args: CompleteContributionArgs
): Promise<Contribution> => {
  return await changeContributionState({
    dbClient: args.dbClient,
    contributionId: args.contributionId,
    externalId: args.externalId,
    state: "completed",
  });
};

export default completeContribution;
