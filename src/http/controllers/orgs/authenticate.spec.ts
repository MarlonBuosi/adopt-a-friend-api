import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { authenticateOrg } from "../test/authenticate-org";
import { createOrg } from "../test/create-org";

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await createOrg(app)
    const { token, statusCode } = await authenticateOrg(app)

    expect(statusCode).toEqual(200)
    expect(token).toEqual(expect.any(String))
  })
})
