import createSubscription from "./createSubscription";
import completeSubscription from "./completeSubscription";
import cancelSubscription from "./cancelSubscription";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

beforeAll(() => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.$disconnect();
});

test("creates a subscription in the database, completes it and returns it", async () => {
  const resultCreate = await createSubscription({
    dbClient: prisma,
    email: "emailSub@example.com",
    amountInCents: 100,
    experimentId: "1|2|3",
  });

  const contributionCountBefore = await prisma.contribution.count();

  expect(resultCreate.id).not.toBeNull();
  expect(resultCreate.state).toEqual("pending");
  expect(resultCreate.experimentId).toEqual("1|2|3");
  expect(
    await prisma.contributionSubscription.findUnique({
      where: {
        id: resultCreate.id,
      },
    })
  ).toEqual(resultCreate);

  expect(resultCreate.externalId).toBeNull();

  const resultComplete = await completeSubscription({
    dbClient: prisma,
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
  expect(
    await prisma.contributionSubscription.findUnique({
      where: {
        id: resultComplete.id,
      },
    })
  ).toEqual(resultComplete);

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
  expect(contributionCreated[0].experimentId).toEqual("1|2|3");

  // if we complete the subscription again, we must not create another contribution
  const resultCancel = await cancelSubscription({
    dbClient: prisma,
    subscriptionId: resultComplete.id,
  });
  expect(resultCancel.state).toEqual("cancelled");
  expect(
    await prisma.contributionSubscription.findUnique({
      where: {
        id: resultCancel.id,
      },
    })
  ).toEqual(resultCancel);
  expect(resultCancel.id).toEqual(resultComplete.id);

  const resultCompleteAgain = await completeSubscription({
    dbClient: prisma,
    subscriptionId: resultCancel.id,
    externalId: "123",
    externalContributionId: "456",
  });
  expect(resultCompleteAgain.state).toEqual("active");
  expect(
    await prisma.contributionSubscription.findUnique({
      where: {
        id: resultCompleteAgain.id,
      },
    })
  ).toEqual(resultCompleteAgain);
  expect(resultCompleteAgain).toEqual(resultComplete);

  const contributionCountAfterSecondCompletion = await prisma.contribution.count();
  expect(contributionCountAfter).toEqual(
    contributionCountAfterSecondCompletion
  );

  const contributionCreatedAfterSecondCompletion = await prisma.contribution.findMany(
    {
      where: {
        subscriptionId: resultCompleteAgain.id,
      },
    }
  );
  expect(contributionCreatedAfterSecondCompletion).toHaveLength(1);
  expect(contributionCreatedAfterSecondCompletion[0]).toEqual(
    contributionCreated[0]
  );
});

test("throws error if subscription id is invalid", async () => {
  await expect(
    completeSubscription({
      dbClient: prisma,
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
      dbClient: prisma,
      subscriptionId: id,
      externalId: "123",
      externalContributionId: "456",
    })
  ).rejects.toThrow(`Id ${id} not found`);
});

export {};
