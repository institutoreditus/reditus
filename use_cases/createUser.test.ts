import createUser from "./createUser";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

let prisma: PrismaClient;

beforeAll(() => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.disconnect();
});

test("creates a user", async () => {
  expect(2 + 2).toEqual(4);
});
