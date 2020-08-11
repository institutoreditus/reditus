import createSubscription from "./createSubscription";
import completeSubscription from "./completeSubscription";
import getSubscriptionByExternalId from "./getSubscriptionByExternalId";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

let prisma: PrismaClient;

beforeAll(() => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.disconnect();
});

test("searches for a subscription by external id", async () => {
  const resultCreated = await createSubscription({
    email: "email@examplesub.com",
    amountInCents: 100,
  });

  expect(resultCreated.state).toEqual("pending");

  const subscriptionExternalId = uuidv4();
  const contributionExternalId = uuidv4();

  const resultCompleted = await completeSubscription({
    subscriptionId: resultCreated.id,
    externalId: subscriptionExternalId,
    externalContributionId: contributionExternalId,
  });

  expect(resultCompleted.id).toEqual(resultCreated.id);
  expect(resultCompleted.state).toEqual("active");

  const resultSearch = await getSubscriptionByExternalId({
    externalId: subscriptionExternalId,
  });

  expect(resultSearch).not.toBeNull();
  expect(resultSearch).toEqual(resultCompleted);

  expect(
    await prisma.contributionSubscription.findOne({
      where: {
        id: resultSearch!.id,
      },
    })
  ).toEqual(resultSearch);
});

export {};
