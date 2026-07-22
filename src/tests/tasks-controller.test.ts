import request from "supertest";
import { prisma } from "@/database/prisma.js";
import { app } from "@/app.js";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals"
import { sign } from 'jsonwebtoken';
import { authConfig } from '@/services/auth.js'

describe('TaskController', () => {
  let user_id: string
  let team_id: string
  let task_id: string
  let adminToken: string

  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        name: "Test User Task",
        email: "usertask@email.com",
        password: "password123",
        role: "admin"
      }
    })
    user_id = user.id

    const team = await prisma.team.create({
      data: {
        name: "Test Team Task",
        description: "Team for task tests"
      }
    })
    team_id = team.id

    adminToken = sign(
        { role: 'admin' },
        authConfig.jwt.secret,
        {
          subject: user_id,
          expiresIn: authConfig.jwt.expiresIn || '1d'
        }
      )
  })

  afterAll(async () => {
    if(task_id){
      await prisma.task.delete({ where: { id: task_id } })
    }
    else {
      console.warn("afterAll executado, mas 'task_id' estava indefinido!")
    }
    if(team_id){
      await prisma.team.delete({ where: { id: team_id } })
    }
    else {
      console.warn("afterAll executado, mas 'team_id' estava indefinido!")
    }
    if(user_id){
      await prisma.user.delete({ where: { id: user_id } })
    }
    else {
      console.warn("afterAll executado, mas 'user_id' estava indefinido!")
    }
  })

  it('task created successfully', async () => {
    const taskResponse = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      title: "Task Test",
      description: "test task created!",
      priority: "low",
      assigned_to: user_id,
      team_id: team_id,
    })

    task_id = taskResponse.body.task?.id || taskResponse.body.id

    expect(taskResponse.status).toBe(200)
  })
})
