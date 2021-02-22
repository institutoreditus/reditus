-- CreateEnum
CREATE TYPE "contribution_state" AS ENUM ('pending', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "subscription_state" AS ENUM ('pending', 'active', 'cancelled');

-- CreateTable
CREATE TABLE "contribution_subscriptions" (
    "amount_in_cents" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "state" "subscription_state" NOT NULL,
    "external_id" TEXT,
    "experiment_id" TEXT,
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contributions" (
    "amount_in_cents" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "state" "contribution_state" NOT NULL,
    "subscription_id" INTEGER,
    "external_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "experiment_id" TEXT,
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "admission_year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "degree" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "last_name" TEXT NOT NULL,
    "mentorship_interest" BOOLEAN NOT NULL,
    "tutorship_interest" BOOLEAN NOT NULL,
    "university" TEXT NOT NULL,
    "volunteering_interest" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- AddForeignKey
ALTER TABLE "contribution_subscriptions" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contributions" ADD FOREIGN KEY ("subscription_id") REFERENCES "contribution_subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contributions" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
