import { describe, expect, it } from "@jest/globals"
import request from "supertest"

import { app } from "@/app.js"

describe("UsersController", () => {
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
      }),
    })
  })
})
