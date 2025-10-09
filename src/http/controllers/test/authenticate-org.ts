import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function authenticateOrg(app: FastifyInstance) {
    
  const authResponse = await request(app.server).post('/sessions').send({
      name: 'Atila Org',
      password: '123456789'
  })

  const { token } = authResponse.body
  const { statusCode } = authResponse
  const cookies  = authResponse.get('Set-Cookie')

  return { token, statusCode, cookies }
}
