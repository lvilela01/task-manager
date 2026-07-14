import { afterAll, describe, expect, it } from "@jest/globals"
import request from "supertest"
import { prisma } from "@/database/prisma.js"

import { app } from "@/app.js"
describe("UsersController", () => {
  let user_id: string

  afterAll(async () => {
    if(user_id){
      await prisma.user.delete({ where: { id: user_id } })
    } else {
      console.warn("afterAll executado, mas 'user_id' estava indefinido!")
    }
  })

  it("should create a new user successfully", async () => {
    const response = await request(app).post('/users').send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: 'User created successfully!',
      user: expect.objectContaining({
        name: "Test User",
        email: "testuser@example.com",
      })
    })

    user_id = response.body.id || response.body.user?.id
  })
})
