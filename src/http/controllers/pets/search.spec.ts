import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { createAndAuthenticateUser } from "@/http/controllers/test/create-and-authenticate-user";

describe('Search (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a pet', async () => {
    const { token, orgId } = await createAndAuthenticateUser(app)
    
    await request(app.server).post('/pets').set({
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
