import { Request, Response } from "express";
import { z } from 'zod'
import { prisma } from "@/database/prisma.js";
import { AppError } from "@/services/AppError.js";

export class TaskHistoryController{
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
