import createContribution from "./createContribution";
import cancelContribution from "./cancelContribution";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

beforeAll(() => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.disconnect();
});

test("creates a contribution in the database, cancels it and returns it", async () => {
  const resultCreate = await createContribution({
    dbClient: prisma,
    email: "email3@example.com",
    amountInCents: 300,
  });

  expect(resultCreate.id).not.toBeNull();
  expect(resultCreate.state).toEqual("pending");
  expect(
    await prisma.contribution.findOne({
      where: {
        id: resultCreate.id,
      },
    })
  ).toEqual(resultCreate);

  const resultCancel = await cancelContribution({
    dbClient: prisma,
    contributionId: resultCreate.id,
  });

  expect(resultCancel.id).not.toBeNull();
  expect(resultCancel.id).toEqual(resultCreate.id);
  expect(resultCancel.email).toEqual(resultCreate.email);
  expect(resultCancel.amountInCents).toEqual(resultCreate.amountInCents);
  expect(resultCancel.state).toEqual("cancelled");
});

test("throws error if contribution id is invalid", async () => {
  await expect(
    cancelContribution({ dbClient: prisma, contributionId: -1 })
  ).rejects.toThrow("Invalid id");
});

test("throws error if id does not exist", async () => {
  const id = 99999999;
  await expect(
    cancelContribution({ dbClient: prisma, contributionId: id })
  ).rejects.toThrow(`Id ${id} not found`);
});

export {};
