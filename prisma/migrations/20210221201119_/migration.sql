/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[ambassador_id]` on the table `users`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "contribution_subscriptions" ADD COLUMN     "ambassador_id" INTEGER;

-- AlterTable
ALTER TABLE "contributions" ADD COLUMN     "ambassador_id" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "ambassador_id" INTEGER;

-- CreateTable
CREATE TABLE "ambassadors" (
    "id" SERIAL NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "createAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_ambassador_id_unique" ON "users"("ambassador_id");

-- AddForeignKey
ALTER TABLE "contribution_subscriptions" ADD FOREIGN KEY ("ambassador_id") REFERENCES "ambassadors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contributions" ADD FOREIGN KEY ("ambassador_id") REFERENCES "ambassadors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("ambassador_id") REFERENCES "ambassadors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
