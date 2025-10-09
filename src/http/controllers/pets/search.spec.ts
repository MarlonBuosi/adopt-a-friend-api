import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { createOrg } from "../test/create-org";
import { authenticateOrg } from "../test/authenticate-org";
import { createPet } from "../test/create-pet";
import { getOrgProfile } from "../test/get-org-profile";

describe('Search (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a pet', async () => {
    await createOrg(app)
    const { token } = await authenticateOrg(app)
    const { profile } = await getOrgProfile({app, token})
    await createPet({ app, token, orgId: profile.organization.id })

    const pets = await request(app.server).post('/pets/search').send({
      searchParams: {
        name: 'Atila',
        species: 'Pinscher',
        city: 'Curitiba'
      }
    })

    expect(pets.statusCode).toEqual(200)
    expect(pets.body.pets).toEqual(expect.arrayContaining([expect.objectContaining({
      id: expect.any(String),
      name: 'Atila',
      species: 'Pinscher',
      color: 'Pretin',
      age: 8,
      weight: 5,
      height: 30,
      org_id: expect.any(String),
    })]))
  })
})
