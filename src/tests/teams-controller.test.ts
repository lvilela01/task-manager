import request from 'supertest'
import { prisma } from '@/database/prisma.js'
import { app } from '@/app.js'
import { afterAll, describe, expect, it } from "@jest/globals"
import { sign } from 'jsonwebtoken';
import { authConfig } from '@/services/auth.js'

describe('TeamsController', () => {
  let team_id: string

  afterAll(async () => {
    if(team_id) {
      await prisma.team.delete({ where: { id: team_id } })
    } else {
      console.warn("afterAll executado, mas 'team_id' estava indefinido!")
    }
  })

  it('Team created successfully!', async () => {
    const adminToken = sign(
    { role: 'admin' },
    authConfig.jwt.secret,
    {
      subject: 'id-user-admin-test', // Define o 'sub' (user_id)
      expiresIn: authConfig.jwt.expiresIn || '1d'
    }
  );

    const newTeam = await request(app).post('/teams').set('Authorization', `Bearer ${adminToken}`).send({
      name: "Team Test",
      description: "New team test"
    })

    team_id = newTeam.body.team?.id || newTeam.body.id;

    expect(newTeam.status).toBe(201)
  })
})
