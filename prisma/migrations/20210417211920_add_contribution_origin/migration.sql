-- CreateEnum
CREATE TYPE "contribution_origin" AS ENUM ('online', 'pgc');

-- AlterTable
ALTER TABLE "contributions" ADD COLUMN     "origin" "contribution_origin" NOT NULL DEFAULT E'online';
