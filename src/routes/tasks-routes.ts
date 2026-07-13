import { Router } from "express";
import { TasksController } from "@/controllers/tasks-controller";

import { ensureAuthenticated } from "@/services/ensure-authenticated";
import { verifyUserAuthorization } from "@/services/verify-user-authorization";

const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.use(ensureAuthenticated, verifyUserAuthorization(['admin']))
tasksRoutes.post('/', tasksController.create)
tasksRoutes.get('/', tasksController.index)
tasksRoutes.patch('/:id/status', tasksController.update)
tasksRoutes.get('/filter', tasksController.filter)

export { tasksRoutes }
