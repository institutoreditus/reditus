import { Contribution } from "@prisma/client";
import changeContributionState from "./changeContributionState";

interface CompleteContributionArgs {
  contributionId: number;
}

const completeContribution = async (
  args: CompleteContributionArgs
): Promise<Contribution> => {
  return await changeContributionState({
    contributionId: args.contributionId,
    state: "completed",
  });
};

export default completeContribution;
