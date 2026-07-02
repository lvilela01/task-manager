import { Request, Response } from "express";
import { z } from 'zod'
import { prisma } from "@/database/prisma";

export class TasksController{
  async create(req: Request, res: Response){
    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      priority: z.enum(['low', 'high', 'medium']),
      assigned_to: z.uuid(),
      team_id: z.uuid()
    })

    const { title, description, priority, assigned_to, team_id } = bodySchema.parse(req.body)

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        assignedTo: assigned_to,
        teamId: team_id
      }
    })

    return res.json(task)
  }

  async index(req: Request, res: Response){
    const task = await prisma.task.findMany({
      select: {
        title: true,
        description: true,
        status: true,
        priority: true,
        responsible: {
          select: {
            name: true
          }
        },
        team: {
          select: {
            name: true, description: true,
            members: {
              select: {
                user: {
                  select: {
                    name: true
                  }
                }
              }
            }
          },
        },
      }
    })

    return res.json(task)
  }
}
