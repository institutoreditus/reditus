import { PrismaClient } from "@prisma/client";
import { GetClassData } from "../pages/api/ranking/types";

type GetDegreeClassDataArgs = {
    dbClient: PrismaClient;
    degree: string;
    year: string;
    initialDate: Date;
}

export async function getDegreeClassData(
    args: GetDegreeClassDataArgs
  ): Promise<GetClassData> {
    const minYear = Math.floor(Number(args.year) / 5) * 5;
    const maxYear = minYear + 5;
  
    const result: {
      id: number;
      firstName: string;
      lastName: number;
      url: string;
      amount: number;
      year: number;
    }[] = await args.dbClient.$queryRaw`
      SELECT 
          u."id",
          u."first_name" AS "firstName",
          u."last_name" AS "lastName",
          u."url",
          SUM(c."amount_in_cents")/100 AS "amount",
          u."admission_year" AS "year"
      FROM "users" u
      LEFT JOIN "contributions" c ON u."id" = c."userId"
      WHERE 
          u."degree" = ${args.degree}
          AND u."admission_year" >= ${minYear}
          AND u."admission_year" < ${maxYear}
          AND c."state" = 'completed'
          AND c."createdAt" > ${args.initialDate}
      GROUP BY u."id", u."first_name", u."last_name", u."url", u."admission_year"
      `;
  
    const amount = result.reduce((acc, row) => acc + row.amount, 0);
    const numberOfDonors = result.length;
    const donors: GetClassData["donors"] = result.map((row) => {
      return {
        name: `${row.firstName} ${row.lastName}`,
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
  