import { app } from "@/app";
import { beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { after } from "node:test";

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  after(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post(
      '/orgs'
    ).send(
      {
        name: 'Atila Org',
        phone: '11999999999',
        password: '123456789'
      }
    )

    expect(response.statusCode).toEqual(201)
  })
})
