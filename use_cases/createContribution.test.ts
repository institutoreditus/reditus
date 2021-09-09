import createContribution from "./createContribution";
import createSubscription from "./createSubscription";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import createUser from "./createUser";

let prisma: PrismaClient;

beforeAll(() => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.$disconnect();
});

test("creates a contribution in the database and returns it", async () => {
  const result = await createContribution({
    dbClient: prisma,
    email: "email@example.com",
    amountInCents: 100,
    experimentId: "1|2|3",
    birthday: new Date("2010-12-25"),
  });

  expect(result.id).not.toBeNull();
  expect(result.state).toEqual("pending");
  expect(result.experimentId).toEqual("1|2|3");
  expect(result.birthday).toEqual(new Date("2010-12-25"));
  expect(
    await prisma.contribution.findUnique({
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
    dbClient: prisma,
    amountInCents: 123,
    email: "email2@example.com",
    experimentId: "1|2|3",
  });

  const contribution = await createContribution({
    dbClient: prisma,
    amountInCents: 123,
    subscriptionId: subscription.id,
    externalContributionId: uuidv4(),
    birthday: new Date("2010-12-25"),
  });

  expect(contribution.id).not.toBeNull();
  expect(contribution.state).toEqual("completed");
  expect(contribution.experimentId).toEqual("1|2|3");
  expect(contribution.birthday).toEqual(new Date("2010-12-25"));
  expect(
    await prisma.contribution.findUnique({
      where: {
        id: contribution.id,
      },
    })
  ).toEqual(contribution);

  expect(contribution.subscriptionId).toEqual(subscription.id);
  expect(contribution.email).toEqual(subscription.email);
  expect(contribution.createdAt).not.toBeNull();
});

test("creates a contribution that failed for a existing subscription in the database and returns it", async () => {
  const subscription = await createSubscription({
    dbClient: prisma,
    amountInCents: 123,
    email: "email2@example.com",
    birthday: new Date("2010-12-25"),
    experimentId: "1|2|3",
  });

  const contribution = await createContribution({
    dbClient: prisma,
    amountInCents: 123,
    subscriptionId: subscription.id,
    externalContributionId: uuidv4(),
    failed: true,
  });

  expect(contribution.id).not.toBeNull();
  expect(contribution.state).toEqual("cancelled");
  expect(contribution.experimentId).toEqual("1|2|3");
  expect(contribution.birthday).toEqual(new Date("2010-12-25"));
  expect(
    await prisma.contribution.findUnique({
      where: {
        id: contribution.id,
      },
    })
  ).toEqual(contribution);

  expect(contribution.subscriptionId).toEqual(subscription.id);
  expect(contribution.email).toEqual(subscription.email);
  expect(contribution.createdAt).not.toBeNull();
});

test("creates a contribution with an existing user in the database and connects them", async () => {
  const uniqueEmail = `uniqueemail${uuidv4()}@example.com`;

  const user = await createUser({
    dbClient: prisma,
    email: uniqueEmail,
    firstName: "first_name",
    lastName: "last_name",
    university: "UFRJ",
    degree: "Engenharia de Computação",
    admissionYear: 2011,
    birthday: new Date("2010-12-25"),
    tutorshipInterest: true,
    mentorshipInterest: true,
    volunteeringInterest: true,
  });

  const contribution = await createContribution({
    dbClient: prisma,
    amountInCents: 123,
    externalContributionId: uuidv4(),
    email: uniqueEmail,
  });

  expect(contribution.userId).toEqual(user.id);
});

test("does not insert invalid date of birth", async () => {
  const result = await createContribution({
    dbClient: prisma,
    email: "email@example.com",
    amountInCents: 100,
    experimentId: "1|2|3",
    birthday: new Date("1800-12-25"),
  });

  expect(result.id).not.toBeNull();
  expect(result.birthday).toBeNull();
});

test("throws error if amount is invalid", async () => {
  await expect(
    createContribution({
      dbClient: prisma,
      email: "email@example.com",
      amountInCents: -1,
    })
  ).rejects.toThrow("Invalid amount");
});

test("throws error if email is invalid", async () => {
  await expect(
    createContribution({
      dbClient: prisma,
      email: "not-an-email",
      amountInCents: 1000,
    })
  ).rejects.toThrow("Invalid email");
});

test("throws error if informing email and subscription", async () => {
  await expect(
    createContribution({
      dbClient: prisma,
      email: "email@example.com",
      amountInCents: 100,
      subscriptionId: 123,
    })
  ).rejects.toThrow("Must not inform email when subscription id is informed");
});

test("throws error if email and subscription both null", async () => {
  await expect(
    createContribution({
      dbClient: prisma,
      amountInCents: 100,
    })
  ).rejects.toThrow("Empty email");
});

test("throws error if subscription not null and external contribution id null", async () => {
  await expect(
    createContribution({
      dbClient: prisma,
      amountInCents: 100,
      subscriptionId: 1,
    })
  ).rejects.toThrow(
    "Must inform external contribution id when subscription id is informed"
  );
});

export {};
