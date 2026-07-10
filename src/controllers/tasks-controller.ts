import { Request, Response } from "express";
import { z } from 'zod'
import { prisma } from "@/database/prisma";
import { AppError } from "@/services/AppError";

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

  async update(req: Request, res: Response){
    const paramsSchema = z.object({
      id: z.uuid()
    })

    const bodySchema = z.object({
      priority_task: z.enum(['low', 'medium', 'high']).optional(),
      team_id: z.uuid().optional(),
      assigned_to: z.uuid().optional()
    })

    const { id } = paramsSchema.parse(req.params)
    const { priority_task, team_id, assigned_to } = bodySchema.parse(req.body)

    const currentTask = await prisma.task.findUnique({
      where: { id }
    })

    if(!currentTask) {
      throw new AppError('Task not found!')
    }

    const data: {
      priority?: 'low' | 'medium' | 'high'
      teamId?: string
      assignedTo?: string
    } = {}

    if(priority_task) data.priority = priority_task
    if(team_id) data.teamId = team_id
    if(assigned_to) data.assignedTo = assigned_to

    const updatedTask = await prisma.$transaction(async (tx) => {
      const task = await tx.task.update({
        where: { id },
        data
      })

      const changedBy = req.user?.id

      if(!changedBy){
        throw new AppError('User not found!')
      }

      await tx.taskHistory.create({
        data: {
          taskId: id,
          changedBy,
          oldStatus: currentTask.status,
          newStatus: currentTask.status,
          oldPriority: currentTask.priority,
          newPriority: priority_task || currentTask.priority
        }
      })

      return task
    })

    return res.json(updatedTask)
  }

  async updateStatusByAssignee(req: Request, res: Response){
    const paramsSchema = z.object({
      id: z.uuid()
    })

    const bodySchema = z.object({
      new_status: z.enum(['in_progress', 'completed'])
    })

    const { id } = paramsSchema.parse(req.params)
    const { new_status } = bodySchema.parse(req.body)

    const currentTask = await prisma.task.findUnique({
      where: { id }
    })

    if(!currentTask){
      throw new AppError('Task not found!')
    }

    const userId = req.user?.id

    if(currentTask.assignedTo !== userId){
      throw new AppError("You are not responsible for this task!", 403)
    }

    const updatedTask = await prisma.$transaction(async (tx) => {
      const task = await tx.task.update({
        where: { id },
        data: { status: new_status }
      })

      await tx.taskHistory.create({
        data: {
          taskId: id,
          changedBy: userId,
          oldStatus: currentTask.status,
          newStatus: new_status
        }
      })

      return task
    })

    return res.json(updatedTask)
  }
}
