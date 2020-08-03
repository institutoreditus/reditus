import { Contribution, PrismaClient } from "@prisma/client";

interface CreateContributionArgs {
  email: string;
  amountInCents: number;
}

const createContribution = async (
  args: CreateContributionArgs
): Promise<Contribution> => {
  if (args.amountInCents <= 0) throw new Error("Invalid amount");
  if (args.email.indexOf("@") < 0) throw new Error("Invalid email");

  const prisma = new PrismaClient();

  return await prisma.contribution.create({
    data: {
      ...args,
      state: "pending",
    },
  });
};

export default createContribution;
