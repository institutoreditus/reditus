import { NextApiRequest, NextApiResponse } from "next";
import runRequestWithDIContainer from "../../../../../../middlewares/diContainerMiddleware";
import { PrismaClient } from "@prisma/client";
import { DIContainerNextApiRequest } from "../../../../../../dependency_injection/DIContainerNextApiRequest";
import { RANKING_INITIAL_DATA } from "../../../contants";
import { GetClassData } from "../../../types";

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
    const rankingData = await getData(
      prismaClient,
      req.query.degree as string,
      req.query.class as string
    );
    res.statusCode = 200;
    res.json(rankingData);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    return;
  }
}

async function getData(
  prisma: PrismaClient,
  degree: string,
  year: string
): Promise<GetClassData> {
  const minYear = Math.floor(Number(year) / 5) * 5;
  const maxYear = minYear + 5;

  const result: {
    id: number;
    first_name: string;
    last_name: number;
    url: string;
    amount: number;
    year: number;
  }[] = await prisma.$queryRaw`
    SELECT 
        u."id",
        u."first_name",
        u."last_name",
        u."url",
        SUM(c."amount_in_cents")/100 AS "amount",
        u."admission_year" AS "year"
    FROM "users" u
    LEFT JOIN "contributions" c ON u."id" = c."userId"
    WHERE 
        u."degree" = ${degree}
        AND u."admission_year" >= ${minYear}
        AND u."admission_year" < ${maxYear}
        AND c."state" = 'completed'
        AND c."createdAt" > ${RANKING_INITIAL_DATA}
    GROUP BY u."id"
    `;

  const amount = result.reduce((acc, row) => acc + row.amount, 0);
  const numberOfDonors = result.length;
  const donors: GetClassData["donors"] = result.map((row, index) => {
    return {
      name: `${row.first_name} ${row.last_name}`,
      url: row.url,
      year: row.year,
    };
  });

  return {
    amount,
    numberOfDonors,
    donors,
  };
}
