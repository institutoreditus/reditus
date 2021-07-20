-- AlterTable
ALTER TABLE "contribution_subscriptions" ADD COLUMN     "date_of_birth" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "contributions" ADD COLUMN     "date_of_birth" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "date_of_birth" TIMESTAMP(3);
