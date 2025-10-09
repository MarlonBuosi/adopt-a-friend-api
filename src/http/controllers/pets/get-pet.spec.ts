import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { authenticateOrg } from "../test/authenticate-org";
import { createPet } from "../test/create-pet";
import { createOrg } from "../test/create-org";
import { getOrgProfile } from "../test/get-org-profile";

describe('Get pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet by id', async () => {
    await createOrg(app)
    const { token } = await authenticateOrg(app)
    const { profile } = await getOrgProfile({app, token})
    const { pet: createdPet } = await createPet({app, token, orgId: profile.organization.id})

    const pet = await request(app.server).get(`/pets/${createdPet.pet.id}`).send()

    expect(pet.statusCode).toEqual(200)
    expect(pet.body.pet).toEqual(expect.objectContaining({
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
