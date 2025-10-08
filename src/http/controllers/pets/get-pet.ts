import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeGetPetUseCase } from "@/use-cases/factories/make-get-pet-use-case";

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    id: z.string(),
  })

  const { id } = createBodySchema.parse(request.params);

  try {
    const getPetUseCase = makeGetPetUseCase();

    const { pet } = await getPetUseCase.execute({ petId: id });

    return reply.status(200).send({
      pet
    });

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal Server Error' });
  }
}
