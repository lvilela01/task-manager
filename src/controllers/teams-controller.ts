import { Request, Response } from "express";
import { z } from 'zod'
import { prisma } from '@/database/prisma.js'

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

  async index(req: Request, res: Response){
    const teams = await prisma.team.findMany({
      include: {
        members: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    return res.json(teams)
  }

  async update(req: Request, res: Response){
    const paramsSchema = z.object({
      team_id: z.uuid()
    })

    const bodySchema = z.object({
      status_team: z.enum(['active', 'disabled'])
    })

    const { team_id } = paramsSchema.parse(req.params)
    const { status_team } = bodySchema.parse(req.body)

    await prisma.team.update({
      data: {
        status: status_team
      },
      where: {
        id: team_id
      }
    })

    return res.json(200).json({message: 'Team updated successfully'})
  }
}
