import createContribution from "./createContribution";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

beforeEach(() => {
  prisma = new PrismaClient();
});

afterEach(async () => {
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
});

test("throws error if amount is invalid", async () => {
  await expect(
    createContribution({ email: "email@example.com", amountInCents: -1 })
  ).rejects.toContain("amount");
});

test("throws error if email is invalid", async () => {
  await expect(
    createContribution({ email: "not-an-email", amountInCents: 1000 })
  ).rejects.toContain("email");
});

export {};
