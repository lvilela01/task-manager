import { Router } from "express";
import { TeamMemberController } from "@/controllers/team-member-controller.js";

import { ensureAuthenticated } from "@/services/ensure-authenticated.js";
import { verifyUserAuthorization } from "@/services/verify-user-authorization.js";

const teamMemberRoutes = Router()
const teamMemberController = new TeamMemberController()

teamMemberRoutes.use(ensureAuthenticated, verifyUserAuthorization(['admin']))
teamMemberRoutes.post('/', teamMemberController.create)
teamMemberRoutes.delete('/:team_link', teamMemberController.remove)

export { teamMemberRoutes }
