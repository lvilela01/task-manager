import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { loginRoutes } from "./logins-routes";
import { teamsRoutes } from "./teams-routes";
import { tasksRoutes } from "./tasks-routes";
import { teamMemberRoutes } from "./team-member-routes";

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/logins', loginRoutes)
routes.use('/teams', teamsRoutes)
routes.use('/tasks', tasksRoutes)
routes.use('/members', teamMemberRoutes)

export { routes }
