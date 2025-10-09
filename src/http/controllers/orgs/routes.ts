import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  //Authenticated
  app.get('/me', { onRequest: [ verifyJwt ] }, profile)
}
