import request from "supertest";
import { prisma } from "@/database/prisma.js";
import { app } from "@/app.js";
import { afterAll, describe, expect, it } from "@jest/globals"


describe("LoginController", () => {
  let user_id: string

  afterAll(async () => {
    if(user_id){
      await prisma.user.delete({ where: { id: user_id } })
    } else {
      console.warn("afterAll executado, mas 'user_id' estava indefinido!")
    }
  })

  it('should authenticated a and get access token', async () => {
    const userResponse = await request(app).post('/users').send({
      name: "Auth Test User",
      email: "authtestuser@example.com",
      password: "password123",
    })

    user_id = userResponse.body.user?.id

    const loginResponse = await request(app).post('/logins').send({
      email: "authtestuser@example.com",
      password: "password123",
    })

    expect(loginResponse.status).toBe(200)
    expect(loginResponse.body.token).toEqual(expect.any(String))
  })
})
