import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { getOrgProfile } from "../test/get-org-profile";
import { createOrg } from "../test/create-org";
import { authenticateOrg } from "../test/authenticate-org";

describe('Org Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get org profile', async () => {
    await createOrg(app)
    const { token } = await authenticateOrg(app)
    const { profile, statusCode } = await getOrgProfile({app, token})

    expect(statusCode).toEqual(200)
    expect(profile.organization).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: 'Atila Org',
      phone: '11999999999',
      city: 'Curitiba',
    }))
  })
})
