import { FastifyReply, FastifyRequest } from "fastify"

type Role = 'ADMIN' | 'MEMBER' | 'GUEST'

export function verifyUserRole(roleToVerify: Role[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    const hasRole = roleToVerify.some(r => r === role)
    if (!hasRole) {
      return reply.status(401).send({ message: 'Unauthorized'})
    }
  }
}
