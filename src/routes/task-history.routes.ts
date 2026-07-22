import { Router } from "express";
import { TaskHistoryController } from "@/controllers/task-history-controller.js";
import { ensureAuthenticated } from "@/services/ensure-authenticated.js";

const taskHistoryRoutes = Router()
const taskHistoryController = new TaskHistoryController()

taskHistoryRoutes.use(ensureAuthenticated)
taskHistoryRoutes.get('/:task_id/show', taskHistoryController.show)

export { taskHistoryRoutes }
