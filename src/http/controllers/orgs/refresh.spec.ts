import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { authenticateOrg } from "../test/authenticate-org";
import { createOrg } from "../test/create-org";
import request from 'supertest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await createOrg(app)
    const { token, statusCode, cookies } = await authenticateOrg(app)
    const response = await request(app.server).patch('/token/refresh').set('Cookie', cookies ?? []).send()

    expect(statusCode).toEqual(200)
    expect(token).toEqual(expect.any(String))
    expect(response.get('Set-Cookie')).toEqual(expect.arrayContaining([expect.stringContaining('refreshToken=')]))
  })
})
