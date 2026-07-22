-- CreateEnum
CREATE TYPE "statusTeam" AS ENUM ('active', 'disabled');

-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "status" "statusTeam" NOT NULL DEFAULT 'active';
