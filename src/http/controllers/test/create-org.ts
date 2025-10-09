import { FastifyInstance } from 'fastify'
import request from 'supertest'


export async function createOrg(app: FastifyInstance) {
  const response = await request(app.server).post('/orgs').send({
    name: 'Atila Org',
    phone: '11999999999',
    password: '123456789',
    city: 'Curitiba',
  })

  const org = response.body

  return { org }
}
