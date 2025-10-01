import { app } from "@/app";
import { beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { after } from "node:test";

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  after(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server).post(
      '/orgs'
    ).send(
      {
        name: 'Atila Org',
        phone: '11999999999',
        password: '123456789'
      })
    
    
    const authResponse = await request(app.server).post('/sessions').send({
        name: 'Atila Org',
        password: '123456789'
    })


    const profile = await request(app.server).get('/me').set({
      Authorization: `Bearer ${authResponse.body.token}`
    }).send()

    expect(profile.statusCode).toEqual(200)
    expect(profile.body.orgWithoutPasswordHash).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: 'Atila Org',
      phone: '11999999999',
    }))
  })
})
