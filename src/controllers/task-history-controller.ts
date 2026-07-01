import { Request, Response } from "express";
import { z } from 'zod'
import { prisma } from "@/database/prisma";
import { AppError } from "@/services/AppError";

export class TaskHistoryController{
  async create(req: Request, res: Response){
    const bodySchema = z.object({
      task_id: z.uuid(),
      new_status: z.enum(['in_progress', 'completed'])
    })

    const { task_id, new_status } = bodySchema.parse(req.body)

    const task = await prisma.task.findUnique({
      where: { id: task_id }
    })

    if(!task){
      throw new AppError('Task not found!')
    }

    const changed_by = req.user?.id

    if(!changed_by){
      throw new AppError('User not found!')
    }

    const old_status = task.status

    const taskLog = await prisma.taskHistory.create({
      data: {
        taskId: task_id,
        changedBy: changed_by,
        oldStatus: old_status,
        newStatus: new_status
      }
    })

    return res.json(taskLog)
  }

  async show(req: Request, res: Response){
    const paramsSchema = z.object({
      task_id: z.uuid()
    })

    const { task_id } = paramsSchema.parse(req.params)

    const task = await prisma.task.findUnique({
      where: { id: task_id },
      include: {
        history: {
          include: {
            userChanged: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    if(!task){
      return res.status(404).json('Task not found!')
    }

    return res.json(task)
  }
}
