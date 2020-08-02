import createSubscription from "./createSubscription";
import completeSubscription from "./completeSubscription";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

beforeAll(() => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.disconnect();
});

test("creates a subscription in the database, completes it and returns it", async () => {
  const resultCreate = await createSubscription({
    email: "emailSub@example.com",
    amountInCents: 100,
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

  expect(resultCreate.externalId).toBeNull();

  const resultComplete = await completeSubscription({
    subscriptionId: resultCreate.id,
    externalId: "123",
    externalContributionId: "456",
  });

  expect(resultComplete.id).not.toBeNull();
  expect(resultComplete.id).toEqual(resultCreate.id);
  expect(resultComplete.email).toEqual(resultCreate.email);
  expect(resultComplete.amountInCents).toEqual(resultCreate.amountInCents);
  expect(resultComplete.state).toEqual("active");
  expect(resultComplete.externalId).toEqual("123");

  const contributionCountAfter = await prisma.contribution.count();
  expect(contributionCountBefore + 1).toEqual(contributionCountAfter);

  const contributionCreated = await prisma.contribution.findMany({
    where: {
      subscriptionId: resultCreate.id,
    },
  });

  expect(contributionCreated).toHaveLength(1);
  expect(contributionCreated[0].state).toEqual("completed");
  expect(contributionCreated[0].email).toEqual(resultCreate.email);
  expect(contributionCreated[0].externalId).toEqual("456");
});

test("throws error if subscription id is invalid", async () => {
  await expect(
    completeSubscription({
      subscriptionId: -1,
      externalId: "123",
      externalContributionId: "456",
    })
  ).rejects.toThrow("Invalid id");
});

test("throws error if subscription id does not exist", async () => {
  const id = 99999999;
  await expect(
    completeSubscription({
      subscriptionId: id,
      externalId: "123",
      externalContributionId: "456",
    })
  ).rejects.toThrow(`Id ${id} not found`);
});

export {};
