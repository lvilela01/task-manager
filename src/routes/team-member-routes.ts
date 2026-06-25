import { Router } from "express";
import { TeamMemberController } from "@/controllers/team-member-controller";

import { ensureAuthenticated } from "@/services/ensure-authenticated";
import { verifyUserAuthorization } from "@/services/verify-user-authorization";

const teamMemberRoutes = Router()
const teamMemberController = new TeamMemberController()

teamMemberRoutes.use(ensureAuthenticated, verifyUserAuthorization(['admin']))
teamMemberRoutes.post('/', teamMemberController.create)

export { teamMemberRoutes }
