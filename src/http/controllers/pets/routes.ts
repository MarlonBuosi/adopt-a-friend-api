import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { search } from "./search";
import { getPet } from "./get-pet";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";


export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets/search', search)
  app.post('/pets', { onRequest: [ verifyJwt, verifyUserRole(["MEMBER", "ADMIN"]) ] }, create)
  app.get('/pets/:id', getPet)
}
