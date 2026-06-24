import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { loginRoutes } from "./logins-routes";
import { teamsRoutes } from "./teams-routes";

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/logins', loginRoutes)
routes.use('/teams', teamsRoutes)

export { routes }
