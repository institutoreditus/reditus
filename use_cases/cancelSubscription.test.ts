import createSubscription from "./createSubscription";
import cancelSubscription from "./cancelSubscription";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

beforeAll(() => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.disconnect();
});

test("creates a subscription in the database, cancels it and returns it", async () => {
  const resultCreate = await createSubscription({
    email: "emailSubCanc@example.com",
    amountInCents: 601,
  });

  const contributionCountBefore = await prisma.contribution.count();

  expect(resultCreate.id).not.toBeNull();
  expect(resultCreate.state).toEqual("pending");
  expect(
    await prisma.contributionSubscription.findOne({
      where: {
        id: resultCreate.id,
      },
    })
  ).toEqual(resultCreate);

  const resultCancel = await cancelSubscription({
    subscriptionId: resultCreate.id,
  });

  const contributionCountAfter = await prisma.contribution.count();

  expect(resultCancel.id).not.toBeNull();
  expect(resultCancel.id).toEqual(resultCreate.id);
  expect(resultCancel.email).toEqual(resultCreate.email);
  expect(resultCancel.amountInCents).toEqual(resultCreate.amountInCents);
  expect(resultCancel.state).toEqual("cancelled");
  expect(contributionCountBefore).toEqual(contributionCountAfter);
});

test("throws error if contribution id is invalid (cancel)", async () => {
  await expect(cancelSubscription({ subscriptionId: -1 })).rejects.toThrow(
    "Invalid id"
  );
});

test("throws error if id does not exist (cancel)", async () => {
  const id = 99999999;
  await expect(cancelSubscription({ subscriptionId: id })).rejects.toThrow(
    `Id ${id} not found`
  );
});

export {};
