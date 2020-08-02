import { Contribution } from "@prisma/client";
import changeContributionState from "./changeContributionState";

interface CompleteContributionArgs {
  contributionId: number;
  externalId: string;
}

const completeContribution = async (
  args: CompleteContributionArgs
): Promise<Contribution> => {
  return await changeContributionState({
    contributionId: args.contributionId,
    externalId: args.externalId,
    state: "completed",
  });
};

export default completeContribution;
