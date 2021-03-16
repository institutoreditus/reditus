import createContribution from "./createContribution";
import createUser from "./createUser";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import createSubscription from "./createSubscription";
import messages from "../helpers/messages";

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
  Ambassador: "Embaixador",
};

beforeAll(() => {
  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.$disconnect();
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
    ambassador: 'Embaixador',
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

  const contribution2 = await createContribution({
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

  const contribution1After = await prisma.contribution.findUnique({
    where: { id: contribution1.id },
  });
  const contribution2After = await prisma.contribution.findUnique({
    where: { id: contribution2.id },
  });

  expect(contribution1After?.userId).toEqual(user.id);
  expect(contribution2After?.userId).toEqual(user.id);
});

test("creates a new user if no other was previously created, and assign all past subscriptions to that user", async () => {
  const uniqueEmail = `email${uuidv4()}@examplesub.com`;

  const subscription1 = await createSubscription({
    dbClient: prisma,
    email: uniqueEmail,
    amountInCents: 10000,
  });

  const subscription2 = await createSubscription({
    dbClient: prisma,
    email: uniqueEmail,
    amountInCents: 20000,
  });

  expect(subscription1.userId).toBeNull();
  expect(subscription2.userId).toBeNull();

  const user = await createUser({
    ...testData,
    dbClient: prisma,
    email: uniqueEmail,
    ambassador: 'Embaixador'
  });

  const subscription1After = await prisma.contributionSubscription.findUnique({
    where: { id: subscription1.id },
  });
  const subscription2After = await prisma.contributionSubscription.findUnique({
    where: { id: subscription2.id },
  });

  expect(subscription1After?.userId).toEqual(user.id);
  expect(subscription2After?.userId).toEqual(user.id);
});

test("throws error if email is invalid", async () => {
  await expect(
    createUser({
      ...testData,
      dbClient: prisma,
      email: "not-an-email",
      ambassador: "Embaixador"
    })
  ).rejects.toThrow(messages.INVALID_EMAIL);
});

test("throws error if admission date is invalid", async () => {
  await expect(
    createUser({
      ...testData,
      dbClient: prisma,
      email: `email${uuidv4()}@examplesub.com`, // unique email per user.
      admissionYear: 0,
      ambassador: "Embaixador"
    })
  ).rejects.toThrow(messages.INVALID_ADMISSION_YEAR);
});

test("throws error if user already exists", async () => {
  const uniqueEmail = `email${uuidv4()}@examplesub.com`;

  await createUser({
    ...testData,
    dbClient: prisma,
    email: uniqueEmail, // unique email per user.
  });

  await expect(
    createUser({
      ...testData,
      dbClient: prisma,
      email: uniqueEmail, // unique email per user.
    })
  ).rejects.toThrow(`Usuário com email ${uniqueEmail} já está cadastado.`);
});

test("throws error if empty data was passed", async () => {
  await expect(
    createUser({
      ...testData,
      dbClient: prisma,
      firstName: "",
    })
  ).rejects.toThrow(messages.REQUIRED_FIELDS);

  await expect(
    createUser({
      ...testData,
      dbClient: prisma,
      lastName: "",
    })
  ).rejects.toThrow(messages.REQUIRED_FIELDS);

  await expect(
    createUser({
      ...testData,
      dbClient: prisma,
      university: "",
    })
  ).rejects.toThrow(messages.REQUIRED_FIELDS);

  await expect(
    createUser({
      ...testData,
      dbClient: prisma,
      degree: "",
    })
  ).rejects.toThrow(messages.REQUIRED_FIELDS);
});
