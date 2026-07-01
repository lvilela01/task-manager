import { Router } from "express";
import { TaskHistoryController } from "@/controllers/task-history-controller";
import { ensureAuthenticated } from "@/services/ensure-authenticated";

const taskHistoryRoutes = Router()
const taskHistoryController = new TaskHistoryController()

taskHistoryRoutes.use(ensureAuthenticated)
taskHistoryRoutes.post('/', taskHistoryController.create)
taskHistoryRoutes.get('/:task_id/show', taskHistoryController.show)

export { taskHistoryRoutes }
