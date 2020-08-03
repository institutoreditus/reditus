import createContribution from "./createContribution";
import completeContribution from "./completeContribution";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

beforeAll(() => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.disconnect();
});

test("creates a contribution in the database, completes it and returns it", async () => {
  const resultCreate = await createContribution({
    email: "email2@example.com",
    amountInCents: 200,
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

  const resultComplete = await completeContribution({
    contributionId: resultCreate.id,
  });

  expect(resultComplete.id).not.toBeNull();
  expect(resultComplete.id).toEqual(resultCreate.id);
  expect(resultComplete.email).toEqual(resultCreate.email);
  expect(resultComplete.amountInCents).toEqual(resultCreate.amountInCents);
  expect(resultComplete.state).toEqual("completed");
});

test("throws error if contribution id is invalid", async () => {
  await expect(completeContribution({ contributionId: -1 })).rejects.toThrow(
    "Invalid id"
  );
});

test("throws error if id does not exist", async () => {
  const id = 99999999;
  await expect(completeContribution({ contributionId: id })).rejects.toThrow(
    `Id ${id} not found`
  );
});

export {};
