import { NextApiRequest, NextApiResponse } from "next";
import runRequestWithDIContainer from "../../../../../middlewares/diContainerMiddleware";
import { PrismaClient } from "@prisma/client";
import { DIContainerNextApiRequest } from "../../../../../dependency_injection/DIContainerNextApiRequest";
import { RANKING_INITIAL_DATA } from "./../../contants";
import { GetRankingData } from "./../../types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await runRequestWithDIContainer(req, res, run);
  } else {
    res.statusCode = 405;
    res.send("");
  }
};

async function run(req: DIContainerNextApiRequest, res: NextApiResponse) {
  const prismaClient: PrismaClient = req.scope.resolve("dbClient");
  try {
    console.log(req.query);
    const rankingData = await getRankingData(
      prismaClient,
      req.query.degree as string | undefined
    );
    res.statusCode = 200;
    res.json(rankingData);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    return;
  }
}

async function getRankingData(
  prisma: PrismaClient,
  degree: string | undefined
): Promise<GetRankingData> {
  const result: {
    period: number;
    degree: string;
    amount: number;
    donors: number;
  }[] = await prisma.$queryRaw`
    SELECT 
        FLOOR((u."admission_year") / 5) * 5 AS "period",
        u."degree",
        SUM(c."amount_in_cents")/100 AS "amount",
        COUNT(DISTINCT c."userId") AS "donors"
    FROM "users" u
    JOIN "contributions" c ON u."id" = c."userId"
    WHERE 
        c."state" = 'completed'
        AND c."createdAt" > ${RANKING_INITIAL_DATA}
        AND u."degree" = ${degree}
    GROUP BY "period", u."degree"
    ORDER BY "amount" DESC;
    `;

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
