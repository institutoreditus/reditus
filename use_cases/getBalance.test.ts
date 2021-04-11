import getBalance from "./getBalance";
import createContribution from "./createContribution";
import completeContribution from "./completeContribution";
import { PrismaClient } from "@prisma/client";
import { BalanceGrouping } from "./getBalance";

let prisma: PrismaClient;

beforeAll(async () => {
  prisma = new PrismaClient();

  // create contributions
  const contrib1 = await createContribution({
    dbClient: prisma,
    amountInCents: 1000,
    email: "email@email.com",
  });

  const contrib2 = await createContribution({
    dbClient: prisma,
    amountInCents: 1000,
    email: "email@email.com",
  });

  const contrib3 = await createContribution({
    dbClient: prisma,
    amountInCents: 1000,
    email: "email@email.com",
  });

  const contrib4 = await createContribution({
    dbClient: prisma,
    amountInCents: 1000,
    email: "email@email.com",
  });

  const contrib5 = await createContribution({
    dbClient: prisma,
    amountInCents: 1000,
    email: "email@email.com",
  });

  // complete contributions
  await completeContribution({
    dbClient: prisma,
    contributionId: contrib1.id,
    externalId: "",
  });

  await completeContribution({
    dbClient: prisma,
    contributionId: contrib2.id,
    externalId: "",
  });

  await completeContribution({
    dbClient: prisma,
    contributionId: contrib3.id,
    externalId: "",
  });

  await completeContribution({
    dbClient: prisma,
    contributionId: contrib4.id,
    externalId: "",
  });

  await completeContribution({
    dbClient: prisma,
    contributionId: contrib5.id,
    externalId: "",
  });

  // setup contribution dates
  await prisma.contribution.update({
    where: {
      id: contrib1.id,
    },
    data: {
      createdAt: new Date("2021-01-01"), // this week starts in "2020-12-28"
    },
  });

  await prisma.contribution.update({
    where: {
      id: contrib2.id,
    },
    data: {
      createdAt: new Date("2021-02-01"), // this week starts in "2021-02-01"
    },
  });

  await prisma.contribution.update({
    where: {
      id: contrib3.id,
    },
    data: {
      createdAt: new Date("2021-02-02"), // this week starts in "2021-02-01"
    },
  });

  await prisma.contribution.update({
    where: {
      id: contrib4.id,
    },
    data: {
      createdAt: new Date("2021-03-01"), // this week starts in "2021-03-01"
    },
  });

  await prisma.contribution.update({
    where: {
      id: contrib5.id,
    },
    data: {
      createdAt: new Date("2021-03-10"), // this week starts in "2021-03-08"
    },
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

test("get balance grouping by week", async () => {
  const balance1 = await getBalance({
    dbClient: prisma,
    groupBy: BalanceGrouping.week,
  });

  expect(balance1).toHaveLength(4);

  expect(balance1[0].referenceDate).toEqual(new Date("2020-12-28"));
  expect(balance1[0].balance).toEqual(1000);

  expect(balance1[1].referenceDate).toEqual(new Date("2021-02-01"));
  expect(balance1[1].balance).toEqual(3000);

  expect(balance1[2].referenceDate).toEqual(new Date("2021-03-01"));
  expect(balance1[2].balance).toEqual(4000);

  expect(balance1[3].referenceDate).toEqual(new Date("2021-03-08"));
  expect(balance1[3].balance).toEqual(5000);

  const balance2 = await getBalance({
    dbClient: prisma,
    groupBy: BalanceGrouping.week,
    fromDate: new Date("2021-01-01"),
  });

  expect(balance2).toHaveLength(3);

  expect(balance2[0].referenceDate).toEqual(new Date("2021-02-01"));
  expect(balance2[0].balance).toEqual(3000);

  expect(balance2[1].referenceDate).toEqual(new Date("2021-03-01"));
  expect(balance2[1].balance).toEqual(4000);

  expect(balance2[2].referenceDate).toEqual(new Date("2021-03-08"));
  expect(balance2[2].balance).toEqual(5000);

  const balance3 = await getBalance({
    dbClient: prisma,
    groupBy: BalanceGrouping.week,
    toDate: new Date("2021-03-01"),
  });

  expect(balance3).toHaveLength(3);

  expect(balance3[0].referenceDate).toEqual(new Date("2020-12-28"));
  expect(balance3[0].balance).toEqual(1000);

  expect(balance3[1].referenceDate).toEqual(new Date("2021-02-01"));
  expect(balance3[1].balance).toEqual(3000);

  expect(balance3[2].referenceDate).toEqual(new Date("2021-03-01"));
  expect(balance3[2].balance).toEqual(4000);

  const balance4 = await getBalance({
    dbClient: prisma,
    groupBy: BalanceGrouping.week,
    fromDate: new Date("2021-01-01"),
    toDate: new Date("2021-03-01"),
  });

  expect(balance4).toHaveLength(2);

  expect(balance4[0].referenceDate).toEqual(new Date("2021-02-01"));
  expect(balance4[0].balance).toEqual(3000);

  expect(balance4[1].referenceDate).toEqual(new Date("2021-03-01"));
  expect(balance4[1].balance).toEqual(4000);
});

test("get balance grouping by month", async () => {
  const balance1 = await getBalance({
    dbClient: prisma,
    groupBy: BalanceGrouping.month,
  });

  expect(balance1).toHaveLength(3);

  expect(balance1[0].referenceDate).toEqual(new Date("2021-01-01"));
  expect(balance1[0].balance).toEqual(1000);

  expect(balance1[1].referenceDate).toEqual(new Date("2021-02-01"));
  expect(balance1[1].balance).toEqual(3000);

  expect(balance1[2].referenceDate).toEqual(new Date("2021-03-01"));
  expect(balance1[2].balance).toEqual(5000);

  const balance2 = await getBalance({
    dbClient: prisma,
    groupBy: BalanceGrouping.month,
    fromDate: new Date("2021-02-01"),
  });

  expect(balance2).toHaveLength(2);

  expect(balance2[0].referenceDate).toEqual(new Date("2021-02-01"));
  expect(balance2[0].balance).toEqual(3000);

  expect(balance2[1].referenceDate).toEqual(new Date("2021-03-01"));
  expect(balance2[1].balance).toEqual(5000);

  const balance3 = await getBalance({
    dbClient: prisma,
    groupBy: BalanceGrouping.month,
    toDate: new Date("2021-02-25"),
  });

  expect(balance3).toHaveLength(2);

  expect(balance3[0].referenceDate).toEqual(new Date("2021-01-01"));
  expect(balance3[0].balance).toEqual(1000);

  expect(balance3[1].referenceDate).toEqual(new Date("2021-02-01"));
  expect(balance3[1].balance).toEqual(3000);

  const balance4 = await getBalance({
    dbClient: prisma,
    groupBy: BalanceGrouping.month,
    toDate: new Date("2021-03-01"),
  });

  expect(balance4).toHaveLength(3);

  expect(balance4[0].referenceDate).toEqual(new Date("2021-01-01"));
  expect(balance4[0].balance).toEqual(1000);

  expect(balance4[1].referenceDate).toEqual(new Date("2021-02-01"));
  expect(balance4[1].balance).toEqual(3000);

  expect(balance4[2].referenceDate).toEqual(new Date("2021-03-01"));
  expect(balance4[2].balance).toEqual(4000);

  const balance5 = await getBalance({
    dbClient: prisma,
    groupBy: BalanceGrouping.month,
    toDate: new Date("2021-03-21"),
  });

  expect(balance5).toHaveLength(3);

  expect(balance5[0].referenceDate).toEqual(new Date("2021-01-01"));
  expect(balance5[0].balance).toEqual(1000);

  expect(balance5[1].referenceDate).toEqual(new Date("2021-02-01"));
  expect(balance5[1].balance).toEqual(3000);

  expect(balance5[2].referenceDate).toEqual(new Date("2021-03-01"));
  expect(balance5[2].balance).toEqual(5000);

  const balance6 = await getBalance({
    dbClient: prisma,
    groupBy: BalanceGrouping.month,
    fromDate: new Date("2021-02-01"),
    toDate: new Date("2021-03-01"),
  });

  expect(balance6).toHaveLength(2);

  expect(balance6[0].referenceDate).toEqual(new Date("2021-02-01"));
  expect(balance6[0].balance).toEqual(3000);

  expect(balance6[1].referenceDate).toEqual(new Date("2021-03-01"));
  expect(balance6[1].balance).toEqual(4000);
});

test("get balance without grouping", async () => {
  const balance1 = await getBalance({
    dbClient: prisma,
  });

  expect(balance1).toHaveLength(1);

  expect(balance1[0].referenceDate).toEqual(
    new Date(new Date().setUTCHours(0, 0, 0, 0))
  );
  expect(balance1[0].balance).toEqual(5000);

  const balance2 = await getBalance({
    dbClient: prisma,
    fromDate: new Date("2021-07-01"), // this argument should not have any effect on the result
  });

  expect(balance2).toHaveLength(1);

  expect(balance2[0].referenceDate).toEqual(
    new Date(new Date().setUTCHours(0, 0, 0, 0))
  );
  expect(balance2[0].balance).toEqual(5000);

  const balance3 = await getBalance({
    dbClient: prisma,
    toDate: new Date("2021-02-20"),
  });

  expect(balance3).toHaveLength(1);

  expect(balance3[0].referenceDate).toEqual(new Date("2021-02-20"));
  expect(balance3[0].balance).toEqual(3000);
});
