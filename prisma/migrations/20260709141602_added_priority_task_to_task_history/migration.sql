-- AlterTable
ALTER TABLE "TaskHistory" ADD COLUMN     "new_priority" "priorityTask",
ADD COLUMN     "old_priority" "priorityTask",
ALTER COLUMN "old_status" DROP NOT NULL,
ALTER COLUMN "new_status" DROP NOT NULL;
