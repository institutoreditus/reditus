import { PrismaClient } from "@prisma/client";
import { getRankingList } from "./getRankingList";
import createContribution from "./createContribution";
import completeContribution from "./completeContribution";
import createUser from "./createUser";

let prisma: PrismaClient;

beforeAll(async () => {
  prisma = new PrismaClient();

  await prisma.contribution.deleteMany();
  await prisma.user.deleteMany();

  // Create users and contributions
  const users = [
    {
      email: "user0@example.com",
      degree: "Computer Science",
      admissionYear: 2020,
      amount: 0,
    },
    {
      email: "user1@example.com",
      degree: "Computer Science",
      admissionYear: 2020,
      amount: 200_00,
    },
    {
      email: "user2@example.com",
      degree: "Computer Science",
      admissionYear: 2021,
      amount: 300_00,
    },
    {
      email: "user3@example.com",
      degree: "Industrial Engineering",
      admissionYear: 2020,
      amount: 500_00,
    },
  ];

  for (const user of users) {
    await createUser({
      dbClient: prisma,
      email: user.email,
      firstName: "Test",
      lastName: "User",
      university: "UFRJ",
      degree: user.degree,
      admissionYear: user.admissionYear,
      url: `http://example.com/${user.email}`,
      birthday: new Date("1990-01-01"),
      tutorshipInterest: false,
      mentorshipInterest: false,
      volunteeringInterest: false,
    });

    if (user.amount > 0) {
      const contribution = await createContribution({
        dbClient: prisma,
        amountInCents: user.amount,
        email: user.email,
      });

      await completeContribution({
        dbClient: prisma,
        contributionId: contribution.id,
        externalId: "test123",
      });
    }
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("getRankingList", () => {
  const initialDate = new Date("2023-01-01");

  it("should return correct ranking data without degree filter", async () => {
    const result = await getRankingList({
      dbClient: prisma,
      initialDate,
    });

    expect(result).toEqual({
      amount: 1000,
      numberOfDonors: 3,
      ranking: [
        {
          position: 1,
          degree: "Computer Science",
          initialYear: 2020,
          finalYear: 2024,
          amount: 500,
          numberOfDonors: 2,
        },
        {
          position: 2,
          degree: "Industrial Engineering",
          initialYear: 2020,
          finalYear: 2024,
          amount: 500,
          numberOfDonors: 1,
        },
      ],
    });
  });

  it("should return correct ranking data with degree filter", async () => {
    const result = await getRankingList({
      dbClient: prisma,
      initialDate,
      degree: "Computer Science",
    });

    expect(result).toEqual({
      amount: 500,
      numberOfDonors: 2,
      ranking: [
        {
          position: 1,
          degree: "Computer Science",
          initialYear: 2020,
          finalYear: 2024,
          amount: 500,
          numberOfDonors: 2,
        },
      ],
    });
  });
});
