import { PrismaClient } from "@prisma/client";

export enum BalanceGrouping {
  week = "week",
  month = "month",
  year = "year",
}

interface CreateContributionArgs {
  dbClient: PrismaClient;
  fromDate?: Date;
  toDate?: Date;
  groupBy?: BalanceGrouping;
}

export default async function getBalance(args: CreateContributionArgs) {
  const fromDateCondition = args.fromDate ?? new Date("0000-01-01");
  const toDateCondition = args.toDate ?? new Date("9999-12-31");

  // TODO: review the usage of these dates. Maybe they sould be only for "visualization" purposes, but instead they are actively influencing on the computed balance
   
  if (args.groupBy) {
    return await getBalanceWithGrouping(
      args.groupBy,
      fromDateCondition,
      toDateCondition,
      args.dbClient
    );
  } else {
    return await getBalanceWithoutGrouping(
      fromDateCondition,
      toDateCondition,
      args.dbClient
    );
  }
}

async function getBalanceWithoutGrouping(
  fromDate: Date,
  toDate: Date,
  dbClient: PrismaClient
) {
  const sum = await dbClient.contribution.aggregate({
    sum: {
      amountInCents: true,
    },
    where: {
      AND: [
        {
          createdAt: {
            gte: fromDate,
          },
        },
        {
          createdAt: {
            lte: toDate,
          },
        },
      ],
    },
  });
  const response = [
    {
      referenceDate: new Date(),
      balance: sum["sum"]["amountInCents"],
    },
  ];

  return response;
}

async function getBalanceWithGrouping(
  groupBy: BalanceGrouping,
  fromDate: Date,
  toDate: Date,
  dbClient: PrismaClient
) {
  // TODO(rrozendo): I couldn't find how to do a "sum over" with prisma, and I wouldn't like to do the aggregation in memory. That's why I am using a raw query
  const query: string =
    'select distinct date_trunc($1,"createdAt") as "referenceDate",  sum(amount_in_cents) over(order by date_trunc($2,"createdAt")) as "balance" from contributions where "createdAt" >= $3 and "createdAt" <= $4 order by 1;';
  const result: Array<any> = await dbClient.$queryRaw(
    query,
    BalanceGrouping[groupBy],
    BalanceGrouping[groupBy],
    fromDate,
    toDate
  );

  // convert to date to keep the same format as the getBalanceWithoutGrouping method
  result.forEach((element: any) => {
    element["referenceDate"] = new Date(element["referenceDate"]);
  });

  return result;
}
