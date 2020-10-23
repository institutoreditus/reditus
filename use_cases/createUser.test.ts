import createContribution from "./createContribution";
import createUser from "./createUser";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import contributions from "../pages/api/contributions";

let prisma: PrismaClient;
const testData = {
  email: "test@example.com",
  firstName: "first_name",
  lastName: "last_name",
  university: "UFRJ",
  degree: "Engenharia de Computação",
  admissionYear: 2011,
  tutorshipInterest: true,
  mentorshipInterest: true,
  volunteeringInterest: true,
};

beforeAll(() => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.disconnect();
});

test("creates a new user", async () => {
  const uniqueEmail = `email${uuidv4()}@examplesub.com`;

  const user = await createUser({
    dbClient: prisma,
    email: uniqueEmail, // unique email per user.
    firstName: "first_name",
    lastName: "last_name",
    university: "UFRJ",
    degree: "Engenharia de Computação",
    admissionYear: 2011,
    tutorshipInterest: true,
    mentorshipInterest: true,
    volunteeringInterest: true,
  });

  expect(user.id).not.toBeNull();
  expect(user.email).toEqual(uniqueEmail);
  expect(user.firstName).toEqual("first_name");
  expect(user.lastName).toEqual("last_name");
  expect(user.university).toEqual("UFRJ");
  expect(user.degree).toEqual("Engenharia de Computação");
  expect(user.admissionYear).toEqual(2011);
  expect(user.tutorshipInterest).toEqual(true);
  expect(user.mentorshipInterest).toEqual(true);
  expect(user.volunteeringInterest).toEqual(true);
});

test("creates a new user if no other was previously created, and assign all past contributions to that user", async () => {
  const uniqueEmail = `email${uuidv4()}@examplesub.com`;

  const contribution1 = await createContribution({
    dbClient: prisma,
    email: uniqueEmail,
    amountInCents: 10000,
  });

  let contribution2 = await createContribution({
    dbClient: prisma,
    email: uniqueEmail,
    amountInCents: 20000,
  });

  expect(contribution1.userId).toBeNull();
  expect(contribution2.userId).toBeNull();

  const user = await createUser({
    ...testData,
    dbClient: prisma,
    email: uniqueEmail,
  });

  let contribution1After = await prisma.contribution.findOne({where: {id: contribution1.id}});
  let contribution2After = await prisma.contribution.findOne({where: {id: contribution2.id}});
  
  expect(contribution1After?.userId).toEqual(user.id);
  expect(contribution2After?.userId).toEqual(user.id);
});

test("throws error if email is invalid", async () => {
  await expect(
    createUser({
      ...testData,
      dbClient: prisma,
      email: "not-an-email",
    })
  ).rejects.toThrow("Invalid email");
});

test("throws error if admission date is invalid", async () => {
  await expect(
    createUser({
      ...testData,
      dbClient: prisma,
      email: `email${uuidv4()}@examplesub.com`, // unique email per user.
      admissionYear: 0,
    })
  ).rejects.toThrow("Invalid admission date");
});

test("throws error if empty data was passed", async () => {
  const msg = "Empty inputs are not allowed.";

  await expect(
    createUser({
      ...testData,
      dbClient: prisma,
      firstName: "",
    })
  ).rejects.toThrow(msg);

  await expect(
    createUser({
      ...testData,
      dbClient: prisma,
      lastName: "",
    })
  ).rejects.toThrow(msg);

  await expect(
    createUser({
      ...testData,
      dbClient: prisma,
      university: "",
    })
  ).rejects.toThrow(msg);

  await expect(
    createUser({
      ...testData,
      dbClient: prisma,
      degree: "",
    })
  ).rejects.toThrow(msg);
});
