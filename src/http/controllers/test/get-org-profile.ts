import { FastifyInstance } from 'fastify'
import request from 'supertest'


export async function getOrgProfile({app, token}: {app: FastifyInstance, token: string}) {

  const response = await request(app.server).get('/me').set({
    Authorization: `Bearer ${token}`
  }).send()

  const profile = response.body
  const { statusCode } = response

  return { profile, statusCode }
}
