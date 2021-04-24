/*
  Warnings:

  - The migration will remove the values [pgc] on the enum `contribution_origin`. If these variants are still used in the database, the migration will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "contribution_origin_new" AS ENUM ('online', 'manual', 'old_site');
ALTER TABLE "public"."contributions" ALTER COLUMN "origin" TYPE "contribution_origin_new" USING ("origin"::text::"contribution_origin_new");
ALTER TYPE "contribution_origin" RENAME TO "contribution_origin_old";
ALTER TYPE "contribution_origin_new" RENAME TO "contribution_origin";
DROP TYPE "contribution_origin_old";
COMMIT;

-- AlterTable
ALTER TABLE "contributions" ALTER COLUMN "origin" SET DEFAULT E'online';
