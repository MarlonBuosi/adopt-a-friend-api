import { app } from "@/app";
import { beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { after } from "node:test";

describe('Get pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  after(async () => {
    await app.close()
  })

  it('should be able to get a pet by id', async () => {
    await request(app.server).post(
      '/orgs'
    ).send(
      {
        name: 'Atila Org',
        phone: '11999999999',
        password: '123456789',
        city: 'Curitiba',
      })
    
    const authResponse = await request(app.server).post('/sessions').send({
        name: 'Atila Org',
        password: '123456789'
    })

    const profile = await request(app.server).get('/me').set({
      Authorization: `Bearer ${authResponse.body.token}`
    }).send()
    
    const createdPet = await request(app.server).post('/pets').set({
      Authorization: `Bearer ${authResponse.body.token}`
    }).send({
        name: 'Atila',
        species: 'Pinscher',
        color: 'Pretin',
        age: 8,
        weight: 5,
        height: 30,
        orgId: profile.body.organization.id
    })

    const pet = await request(app.server).get(`/pets/${createdPet.body.pet.id}`).set({
      Authorization: `Bearer ${authResponse.body.token}`
    }).send()

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
