import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { search } from "./search";
import { getPet } from "./get-pet";


export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets/search', search)
  app.post('/pets', { onRequest: [ verifyJwt ] }, create)
  app.get('/pets/:id', getPet)
}
