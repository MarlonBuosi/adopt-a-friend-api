import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createOrg } from "../test/create-org";
import { authenticateOrg } from "../test/authenticate-org";
import { createPet } from "../test/create-pet";
import { getOrgProfile } from "../test/get-org-profile";

describe('Create (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {

    await createOrg(app)
    const { token } = await authenticateOrg(app)
    const { profile } = await getOrgProfile({app, token})

    const { pet, statusCode } = await createPet({ app, token, orgId: profile.organization.id })
    
    expect(statusCode).toEqual(201)
    expect(pet.pet).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: 'Atila',
      species: 'Pinscher',
      color: 'Pretin',
      age: 8,
      weight: 5,
      height: 30,
      org_id: expect.any(String),
    }))
  })
})
