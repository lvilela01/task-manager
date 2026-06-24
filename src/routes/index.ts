import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { loginRoutes } from "./logins-routes";

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/logins', loginRoutes)

export { routes }
