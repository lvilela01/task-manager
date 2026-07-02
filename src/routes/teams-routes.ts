import { Router } from "express";
import { TeamsController } from "@/controllers/teams-controller";

import { ensureAuthenticated } from "@/services/ensure-authenticated";
import { verifyUserAuthorization } from "@/services/verify-user-authorization";

const teamsRoutes = Router()
const teamsController = new TeamsController()

teamsRoutes.use(ensureAuthenticated, verifyUserAuthorization(['admin']))
teamsRoutes.post('/', teamsController.create)
teamsRoutes.get('/', teamsController.index)
teamsRoutes.patch('/:team_id', teamsController.update)

export { teamsRoutes }
