import { Router } from "express";
import { TasksController } from "@/controllers/tasks-controller.js";
import { ensureAuthenticated } from "@/services/ensure-authenticated.js";

const assigneeTasksRoutes = Router()
const assigneeTasksController = new TasksController()

assigneeTasksRoutes.use(ensureAuthenticated)
assigneeTasksRoutes.patch('/:id/update-status', ensureAuthenticated, assigneeTasksController.updateStatusByAssignee)

export { assigneeTasksRoutes }
