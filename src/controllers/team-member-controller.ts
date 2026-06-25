import { Request, Response } from "express";
import { z } from 'zod'
import { prisma } from "@/database/prisma";

export class TeamMemberController{
  async create(req: Request, res: Response){
    const bodySchema = z.object({
      user_id: z.uuid(),
      team_id: z.uuid()
    })

    const { user_id, team_id } = bodySchema.parse(req.body)

    const member = await prisma.teamMember.create({
      data: {
        userId: user_id,
        teamId: team_id
      }
    })

    return res.status(201).json(member)
  }
}
