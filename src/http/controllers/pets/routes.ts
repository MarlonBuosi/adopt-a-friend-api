import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";


export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
}
