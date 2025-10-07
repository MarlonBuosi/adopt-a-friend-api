import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makePetUseCase } from "@/use-cases/factories/make-pet-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    age: z.number().nullable(),
    color: z.string(),
    height:   z.number().nullable(),
    species: z.string(),
    weight: z.number().nullable(),
    orgId: z.string(),
  })

  const { name,age, color, height, orgId, species, weight } = createBodySchema.parse(request.body);

  try {
    const petUseCase = makePetUseCase();

    const { pet } = await petUseCase.execute({ name, age, color, height, species, weight, orgId });

    return reply.status(201).send({
      pet
    });

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal Server Error' });
  }
}
