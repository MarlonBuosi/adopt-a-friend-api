import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { createAndAuthenticateUser } from "@/http/controllers/test/create-and-authenticate-user";

describe('Get pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet by id', async () => {
    const { token, orgId } = await createAndAuthenticateUser(app)
    
    const createdPet = await request(app.server).post('/pets').set({
      Authorization: `Bearer ${token}`
    }).send({
        name: 'Atila',
        species: 'Pinscher',
        color: 'Pretin',
        age: 8,
        weight: 5,
        height: 30,
        orgId,
    })

    const pet = await request(app.server).get(`/pets/${createdPet.body.pet.id}`).send()

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
