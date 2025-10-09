import { FastifyInstance } from 'fastify'
import request from 'supertest'


export async function createPet({app, token, orgId}: {app: FastifyInstance, token: string, orgId: string}) {
    const response = await request(app.server).post('/pets').set({
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

    const pet = response.body
    const { statusCode } = response

  return { pet, statusCode }
}
