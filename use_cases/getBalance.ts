import { ContributionState, PrismaClient, Prisma } from "@prisma/client";

export enum BalanceGrouping {
  week = "week",
  month = "month",
  year = "year",
}

interface GetBalanceArgs {
  dbClient: PrismaClient;
  fromDate?: Date;
  toDate?: Date;
  groupBy?: BalanceGrouping;
}

interface Balance {
  referenceDate: Date;
  balance: number;
}

export default async function getBalance(
  args: GetBalanceArgs
): Promise<Balance[]> {
  const fromDateCondition = args.fromDate ?? new Date("0000-01-01");
  const toDateCondition = args.toDate ?? new Date("9999-12-30");

  // we want to check the balance considering contributions made until the "toDate" (inclusive)
  // however, the "createdAt" column also stores the time, and we want to filter only by the date portion
  // workaround: add 1 day to the "toDate" and use the "lower than" operator instead of "lower than or equal"
  // plus, the contributions are stored with UTC time in database, but for practical purposes we may assume that every request will come from
  // GMT-3 time zone (Brazil). Therefore, add 3 hours to the "toDate"

  const toDatePlusOneDayAndThreeHours: Date = new Date(
    toDateCondition.getTime() + 1000 * 60 * 60 * (24 + 3)
  );

  if (args.groupBy) {
    return await getBalanceWithGrouping(
      args.groupBy,
      fromDateCondition,
      toDatePlusOneDayAndThreeHours,
      args.dbClient
    );
  } else {
    return await getBalanceWithoutGrouping(
      toDatePlusOneDayAndThreeHours,
      args.toDate,
      args.dbClient
    );
  }
}

async function getBalanceWithoutGrouping(
  toDate: Date,
  originalToDate: Date | undefined,
  dbClient: PrismaClient
) {
  const sum = await dbClient.contribution.aggregate({
    _sum: {
      amountInCents: true,
    },
    where: {
      AND: [
        {
          createdAt: {
            lt: toDate,
          },
        },
        {
          state: {
            equals: ContributionState.completed,
          },
        },
      ],
    },
  });
  const response: Balance[] = [
    {
      referenceDate:
        originalToDate ?? new Date(new Date().setUTCHours(0, 0, 0, 0)),
      balance: sum["_sum"]["amountInCents"] ?? 0,
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
  const query: Prisma.Sql = Prisma.sql`select * from (select distinct date_trunc(${BalanceGrouping[groupBy]},"createdAt") as "referenceDate",  sum(amount_in_cents) over(order by date_trunc(${BalanceGrouping[groupBy]},"createdAt")) as "balance" from contributions where state = ${ContributionState.completed} and "createdAt" < ${toDate} ) t where "referenceDate" >= ${fromDate} order by 1;`;
  const result: Array<any> = await dbClient.$queryRaw(query);

  // convert to date to keep the same format as the getBalanceWithoutGrouping method
  result.forEach((element: any) => {
    element["referenceDate"] = new Date(element["referenceDate"]);
  });

  return result;
}
