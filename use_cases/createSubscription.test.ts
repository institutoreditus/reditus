import createSubscription from "./createSubscription";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

beforeAll(() => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.disconnect();
});

test("creates a subscription in the database and returns it", async () => {
  const result = await createSubscription({
    email: "email@examplesub.com",
    amountInCents: 100,
  });

  expect(result.id).not.toBeNull();
  expect(result.state).toEqual("pending");
  expect(
    await prisma.contributionSubscription.findOne({
      where: {
        id: result.id,
      },
    })
  ).toEqual(result);
});

test("throws error if amount is invalid", async () => {
  await expect(
    createSubscription({ email: "email@examplesub.com", amountInCents: -1 })
  ).rejects.toThrow("Invalid amount");
});

test("throws error if email is invalid", async () => {
  await expect(
    createSubscription({ email: "not-an-email", amountInCents: 1000 })
  ).rejects.toThrow("Invalid email");
});

export {};
