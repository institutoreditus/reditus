import { PrismaClient } from "@prisma/client";
import { GetRankingData } from "../pages/api/ranking/types";

type GetRankingListArgs = {
  dbClient: PrismaClient;
  initialDate: Date;
  degree?: string;
};

export async function getRankingList(
  args: GetRankingListArgs
): Promise<GetRankingData> {
  // TODO(estevam): use pagination
  // Could not use the same query for both because of the way Prisma handles $queryRaw
  const result = args.degree
    ? await getDegreeRankingListQuery(args)
    : await getRankingListQuery(args);

  const amount = result.reduce((acc, row) => acc + row.amount, 0);
  const numberOfDonors = result.reduce((acc, row) => acc + row.donors, 0);
  const ranking: GetRankingData["ranking"] = result.map((row, index) => {
    return {
      position: index + 1,
      degree: row.degree,
      initialYear: row.period,
      finalYear: row.period + 4,
      amount: row.amount,
      numberOfDonors: row.donors,
    };
  });

  return {
    amount,
    numberOfDonors,
    ranking,
  };
}

async function getRankingListQuery(
  args: GetRankingListArgs
): Promise<
  {
    period: number;
    degree: string;
    amount: number;
    donors: number;
  }[]
> {
  return args.dbClient.$queryRaw`
    SELECT 
        FLOOR((u."admission_year") / 5) * 5 AS "period",
        u."degree",
        SUM(c."amount_in_cents")/100 AS "amount",
        COUNT(DISTINCT c."userId") AS "donors"
    FROM "users" u
    JOIN "contributions" c ON u."id" = c."userId"
    WHERE 
        c."state" = 'completed'
        AND c."createdAt" > ${args.initialDate}
    GROUP BY "period", u."degree"
    ORDER BY "amount" DESC;
  `;
}

async function getDegreeRankingListQuery(
  args: GetRankingListArgs
): Promise<
  {
    period: number;
    degree: string;
    amount: number;
    donors: number;
  }[]
> {
  return args.dbClient.$queryRaw`
    SELECT 
        FLOOR((u."admission_year") / 5) * 5 AS "period",
        u."degree",
        SUM(c."amount_in_cents")/100 AS "amount",
        COUNT(DISTINCT c."userId") AS "donors"
    FROM "users" u
    JOIN "contributions" c ON u."id" = c."userId"
    WHERE 
        c."state" = 'completed'
        AND c."createdAt" > ${args.initialDate}
        AND u."degree" = ${args.degree}
    GROUP BY "period", u."degree"
    ORDER BY "amount" DESC;
  `;
}
