import { PrismaClient } from "@prisma/client";
import { getDegreeClassData } from "./getDegreeClassData";
import createContribution from "./createContribution";
import completeContribution from "./completeContribution";
import createUser from "./createUser";

let prisma: PrismaClient;

beforeAll(async () => {
  prisma = new PrismaClient();

  await prisma.contribution.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await createUser({
    dbClient: prisma,
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    university: "UFRJ",
    degree: "Industrial Engineering",
    admissionYear: 2020,
    url: "http://example.com/john",
    birthday: new Date("1990-01-01"),
    tutorshipInterest: false,
    mentorshipInterest: false,
    volunteeringInterest: false,
  });

  const contribution1 = await createContribution({
    dbClient: prisma,
    amountInCents: 50_00,
    email: user1.email,
  });

  await completeContribution({
    dbClient: prisma,
    contributionId: contribution1.id,
    externalId: "123456",
  });

  const user2 = await createUser({
    dbClient: prisma,
    email: "jane@example.com",
    firstName: "Jane",
    lastName: "Smith",
    university: "UFRJ",
    degree: "Industrial Engineering",
    admissionYear: 2021,
    url: "http://example.com/jane",
    birthday: new Date("1990-01-01"),
    tutorshipInterest: false,
    mentorshipInterest: false,
    volunteeringInterest: false,
  });

  const contribution2 = await createContribution({
    dbClient: prisma,
    amountInCents: 30_00,
    email: user2.email,
  });

  await completeContribution({
    dbClient: prisma,
    contributionId: contribution2.id,
    externalId: "123456",
  });

  const user3 = await createUser({
    dbClient: prisma,
    email: "steve@example.com",
    firstName: "Steve",
    lastName: "Jobs",
    university: "UFRJ",
    degree: "Industrial Engineering",
    admissionYear: 2015,
    url: "http://example.com/steve",
    birthday: new Date("1955-02-24"),
    tutorshipInterest: false,
    mentorshipInterest: false,
    volunteeringInterest: false,
  });

  const contribution3 = await createContribution({
    dbClient: prisma,
    amountInCents: 20_00,
    email: user3.email,
  });

  await completeContribution({
    dbClient: prisma,
    contributionId: contribution3.id,
    externalId: "123456",
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("getDegreeClassData", () => {
  it("should return the correct data for a given degree and year (5y window)", async () => {
    const initialDate = new Date("2023-01-01");
    const result = await getDegreeClassData({
      dbClient: prisma,
      year: "2020",
      degree: "Industrial Engineering",
      initialDate,
    });

    expect(result).toEqual({
      amount: 80,
      numberOfDonors: 2,
      donors: [
        {
          name: "John Doe",
          year: 2020,
          url: "http://example.com/john",
        },
        {
          name: "Jane Smith",
          year: 2021,
          url: "http://example.com/jane",
        },
      ],
    });
  });
});
