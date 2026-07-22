import { Router } from "express";
import { LoginController } from "@/controllers/login-controller.js";

const loginRoutes = Router()
const loginController = new LoginController()

loginRoutes.post('/', loginController.create)

export { loginRoutes }
