-- AlterTable
ALTER TABLE "users" ADD COLUMN     "url" TEXT,
ALTER COLUMN "mentorship_interest" DROP NOT NULL,
ALTER COLUMN "tutorship_interest" DROP NOT NULL,
ALTER COLUMN "volunteering_interest" DROP NOT NULL;

-- RenameIndex
ALTER INDEX "users.email_unique" RENAME TO "users_email_key";
