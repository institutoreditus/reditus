import createSubscription from "./createSubscription";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

beforeAll(() => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.$disconnect();
});

test("creates a subscription in the database and returns it", async () => {
  const result = await createSubscription({
    dbClient: prisma,
    email: "email@examplesub.com",
    amountInCents: 100,
    experimentId: "1|2|3",
    dateOfBirth: new Date(2010, 12, 25),
  });

  expect(result.id).not.toBeNull();
  expect(result.state).toEqual("pending");
  expect(result.experimentId).toEqual("1|2|3");
  expect(result.dateOfBirth).toEqual(new Date(2010, 12, 25));
  expect(
    await prisma.contributionSubscription.findUnique({
      where: {
        id: result.id,
      },
    })
  ).toEqual(result);
});

test("throws error if amount is invalid", async () => {
  await expect(
    createSubscription({
      dbClient: prisma,
      email: "email@examplesub.com",
      amountInCents: -1,
    })
  ).rejects.toThrow("Invalid amount");
});

test("throws error if email is invalid", async () => {
  await expect(
    createSubscription({
      dbClient: prisma,
      email: "not-an-email",
      amountInCents: 1000,
    })
  ).rejects.toThrow("Invalid email");
});

export {};
