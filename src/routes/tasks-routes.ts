import { Router } from "express";
import { TasksController } from "@/controllers/tasks-controller.js";

import { ensureAuthenticated } from "@/services/ensure-authenticated.js";
import { verifyUserAuthorization } from "@/services/verify-user-authorization.js";

const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.use(ensureAuthenticated, verifyUserAuthorization(['admin']))
tasksRoutes.post('/', tasksController.create)
tasksRoutes.get('/', tasksController.index)
tasksRoutes.patch('/:id/status', tasksController.update)
tasksRoutes.get('/filter', tasksController.filter)

export { tasksRoutes }
