import { FastifyInstance } from 'fastify'
import request from 'supertest'


export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/orgs').send({
    name: 'Atila Org',
    phone: '11999999999',
    password: '123456789',
    city: 'Curitiba',
  })
    
  const authResponse = await request(app.server).post('/sessions').send({
      name: 'Atila Org',
      password: '123456789'
  })

  const { token } = authResponse.body

  const profile = await request(app.server).get('/me').set({
    Authorization: `Bearer ${token}`
  }).send()

  const { id: orgId } = profile.body.organization

  return { token, orgId , profile}
}
