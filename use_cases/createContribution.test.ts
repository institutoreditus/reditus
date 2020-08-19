import createContribution from "./createContribution";
import createSubscription from "./createSubscription";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

let prisma: PrismaClient;

beforeAll(() => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.disconnect();
});

test("creates a contribution in the database and returns it", async () => {
  const result = await createContribution({
    email: "email@example.com",
    amountInCents: 100,
  });

  expect(result.id).not.toBeNull();
  expect(result.state).toEqual("pending");
  expect(
    await prisma.contribution.findOne({
      where: {
        id: result.id,
      },
    })
  ).toEqual(result);
  expect(result.email).toBeTruthy();

  expect(result.subscriptionId).toBeNull();
  expect(result.createdAt).not.toBeNull();
});

test("creates a contribution for a existing subscription in the database and returns it", async () => {
  const subscription = await createSubscription({
    amountInCents: 123,
    email: "email2@example.com",
  });

  const contribution = await createContribution({
    amountInCents: 123,
    subscriptionId: subscription.id,
    externalContributionId: uuidv4(),
  });

  expect(contribution.id).not.toBeNull();
  expect(contribution.state).toEqual("completed");
  expect(
    await prisma.contribution.findOne({
      where: {
        id: contribution.id,
      },
    })
  ).toEqual(contribution);

  expect(contribution.subscriptionId).toEqual(subscription.id);
  expect(contribution.email).toEqual(subscription.email);
  expect(contribution.createdAt).not.toBeNull();
});

test("throws error if amount is invalid", async () => {
  await expect(
    createContribution({ email: "email@example.com", amountInCents: -1 })
  ).rejects.toThrow("Invalid amount");
});

test("throws error if email is invalid", async () => {
  await expect(
    createContribution({ email: "not-an-email", amountInCents: 1000 })
  ).rejects.toThrow("Invalid email");
});

test("throws error if informing email and subscription", async () => {
  await expect(
    createContribution({
      email: "email@example.com",
      amountInCents: 100,
      subscriptionId: 123,
    })
  ).rejects.toThrow("Must not inform email when subscription id is informed");
});

test("throws error if email and subscription both null", async () => {
  await expect(
    createContribution({
      amountInCents: 100,
    })
  ).rejects.toThrow("Empty email");
});

test("throws error if subscription not null and external contribution id null", async () => {
  await expect(
    createContribution({
      amountInCents: 100,
      subscriptionId: 1,
    })
  ).rejects.toThrow(
    "Must inform external contribution id when subscription id is informed"
  );
});

export {};
