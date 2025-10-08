import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../test/create-and-authenticate-user";

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const { profile } = await createAndAuthenticateUser(app)

    expect(profile.statusCode).toEqual(200)
    expect(profile.body.organization).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: 'Atila Org',
      phone: '11999999999',
      city: 'Curitiba',
    }))
  })
})
