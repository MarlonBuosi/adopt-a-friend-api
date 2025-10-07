import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {

  const searchPetQuerySchema = z.object({
    searchParams: z.object({
      city: z.string(),
      name: z.string().optional(),
      species: z.string().optional(),
      color: z.string().optional(),
      weight: z.number().optional(),
      height: z.number().optional(),
      age: z.number().optional(),
  })});

  const { searchParams } = searchPetQuerySchema.parse(request.body);

  try {
    const searchPetsUseCase = makeSearchPetsUseCase();

    const { pets } = await searchPetsUseCase.execute({ searchParams });

    return reply.status(200).send({
      pets
    });

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal Server Error' });
  }
}
