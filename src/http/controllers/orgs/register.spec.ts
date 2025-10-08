import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post(
      '/orgs'
    ).send(
      {
        name: 'Atila Org',
        phone: '11999999999',
        password: '123456789',
        city: 'Curitiba',
      }
    )

    expect(response.statusCode).toEqual(201)
  })
})
