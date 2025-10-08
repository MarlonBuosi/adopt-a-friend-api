import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post(
      '/orgs'
    ).send(
      {
        name: 'Atila Org',
        phone: '11999999999',
        password: '123456789',
        city: 'Curitiba',
      })
    
    
    const response = await request(app.server).post('/sessions').send({
        name: 'Atila Org',
        password: '123456789'
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})
