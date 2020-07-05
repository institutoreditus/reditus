import { Contribution } from "@prisma/client";
import changeContributionState from "./changeContributionState";

interface CancelContributionArgs {
  contributionId: number;
}

const cancelContribution = async (
  args: CancelContributionArgs
): Promise<Contribution> => {
  return await changeContributionState({
    contributionId: args.contributionId,
    state: "cancelled",
  });
};

export default cancelContribution;
