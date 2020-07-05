import createContribution from "./createContribution";
import cancelContribution from "./cancelContribution";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

beforeEach(() => {
  prisma = new PrismaClient();
});

afterEach(async () => {
  await prisma.disconnect();
});

test("creates a contribution in the database, cancels it and returns it", async () => {
  const resultCreate = await createContribution({
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
    contributionId: resultCreate.id,
  });

  expect(resultCancel.id).not.toBeNull();
  expect(resultCancel.id).toEqual(resultCreate.id);
  expect(resultCancel.email).toEqual(resultCreate.email);
  expect(resultCancel.amountInCents).toEqual(resultCreate.amountInCents);
  expect(resultCancel.state).toEqual("cancelled");
});

test("throws error if contribution id is invalid", async () => {
  await expect(cancelContribution({ contributionId: -1 })).rejects.toThrow(
    "Invalid id"
  );
});

test("throws error if id does not exist", async () => {
  const id = 99999999;
  await expect(cancelContribution({ contributionId: id })).rejects.toThrow(
    `Id ${id} not found`
  );
});

export {};
