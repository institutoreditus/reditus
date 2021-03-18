import { Contribution, ContributionState, PrismaClient } from "@prisma/client";
import getMessage from "../middlewares/messageMiddleware";
import * as Messages from "../strings/pt/messages.json";

interface ChangeContributionStateArgs {
  dbClient: PrismaClient;
  contributionId: number;
  state: ContributionState;
  externalId?: string;
}

const changeContributionState = async (
  args: ChangeContributionStateArgs
): Promise<Contribution> => {
  if (args.contributionId <= 0)
    throw new Error(getMessage(Messages.invalid_id));

  const contribution = await args.dbClient.contribution.findOne({
    where: {
      id: args.contributionId,
    },
  });

  if (contribution == null)
    throw new Error(getMessage(Messages.subscription_id_not_found));

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
