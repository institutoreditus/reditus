import createContribution from "./createContribution";
import completeContribution from "./completeContribution";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

beforeAll(() => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.$disconnect();
});

test("creates a contribution in the database, completes it and returns it", async () => {
  const resultCreate = await createContribution({
    dbClient: prisma,
    email: "email2@example.com",
    amountInCents: 200,
  });

  expect(resultCreate.id).not.toBeNull();
  expect(resultCreate.state).toEqual("pending");
  expect(
    await prisma.contribution.findUnique({
      where: {
        id: resultCreate.id,
      },
    })
  ).toEqual(resultCreate);
  expect(resultCreate.externalId).toBeNull();

  const resultComplete = await completeContribution({
    dbClient: prisma,
    contributionId: resultCreate.id,
    externalId: "123",
  });

  expect(resultComplete.id).not.toBeNull();
  expect(resultComplete.id).toEqual(resultCreate.id);
  expect(resultComplete.email).toEqual(resultCreate.email);
  expect(resultComplete.amountInCents).toEqual(resultCreate.amountInCents);
  expect(resultComplete.state).toEqual("completed");
  expect(resultComplete.externalId).toEqual("123");
});

test("throws error if contribution id is invalid", async () => {
  await expect(
    completeContribution({
      dbClient: prisma,
      contributionId: -1,
      externalId: "123",
    })
  ).rejects.toThrow("Invalid id");
});

test("throws error if id does not exist", async () => {
  const id = 99999999;
  await expect(
    completeContribution({
      dbClient: prisma,
      contributionId: id,
      externalId: "123",
    })
  ).rejects.toThrow(`Id ${id} not found`);
});

export {};
