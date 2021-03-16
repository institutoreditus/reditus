/*
  Warnings:

  - You are about to drop the column `userId` on the `contribution_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `contributions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "contribution_subscriptions" DROP CONSTRAINT "contribution_subscriptions_userId_fkey";

-- DropForeignKey
ALTER TABLE "contributions" DROP CONSTRAINT "contributions_userId_fkey";

-- AlterTable
ALTER TABLE "contribution_subscriptions" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "contributions" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_ContributionSubscriptionToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContributionToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContributionSubscriptionToUser_AB_unique" ON "_ContributionSubscriptionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ContributionSubscriptionToUser_B_index" ON "_ContributionSubscriptionToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContributionToUser_AB_unique" ON "_ContributionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ContributionToUser_B_index" ON "_ContributionToUser"("B");

-- AddForeignKey
ALTER TABLE "_ContributionSubscriptionToUser" ADD FOREIGN KEY ("A") REFERENCES "contribution_subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContributionSubscriptionToUser" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContributionToUser" ADD FOREIGN KEY ("A") REFERENCES "contributions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContributionToUser" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
