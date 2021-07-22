-- AlterTable
ALTER TABLE "contribution_subscriptions" ADD COLUMN     "birthday" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "contributions" ADD COLUMN     "birthday" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birthday" TIMESTAMP(3);
