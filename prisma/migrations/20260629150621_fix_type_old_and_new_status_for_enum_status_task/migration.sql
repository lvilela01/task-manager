/*
  Warnings:

  - Changed the type of `old_status` on the `TaskHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `new_status` on the `TaskHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TaskHistory" DROP COLUMN "old_status",
ADD COLUMN     "old_status" "statusTask" NOT NULL,
DROP COLUMN "new_status",
ADD COLUMN     "new_status" "statusTask" NOT NULL;
