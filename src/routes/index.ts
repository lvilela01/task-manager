import { Router } from "express";
import { usersRoutes } from "./users-routes.js";
import { loginRoutes } from "./logins-routes.js";
import { teamsRoutes } from "./teams-routes.js";
import { tasksRoutes } from "./tasks-routes.js";
import { teamMemberRoutes } from "./team-member-routes.js";
import { taskHistoryRoutes } from "./task-history.routes.js";
import { assigneeTasksRoutes } from "./assignee-tasks-routes.js";

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/logins', loginRoutes)
routes.use('/teams', teamsRoutes)
routes.use('/tasks', tasksRoutes)
routes.use('/members', teamMemberRoutes)
routes.use('/logs', taskHistoryRoutes)
routes.use('/my-tasks', assigneeTasksRoutes)

export { routes }
