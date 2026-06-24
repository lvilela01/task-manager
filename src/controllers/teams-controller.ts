import { Request, Response } from "express";
import { z } from 'zod'
import { prisma } from '@/database/prisma'

export class TeamsController{
  async create(req: Request, res: Response){

    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
    })

    const { name, description} = bodySchema.parse(req.body)

    const team = await prisma.team.create({
      data: {
        name, description
      }
    })

    return res.status(201).json({
      message: 'Team created successfully!',
      team
    })
  }
}
