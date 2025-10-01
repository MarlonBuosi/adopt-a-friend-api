import { makeGetOrgProfileUseCase } from "@/use-cases/factories/make-get-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {

  const getOrgProfile = makeGetOrgProfileUseCase()

    const { org } = await getOrgProfile.execute({
    orgId: request.user.sub,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password_hash: _, ...orgWithoutPasswordHash } = org

  return reply.status(200).send({ orgWithoutPasswordHash });
}
