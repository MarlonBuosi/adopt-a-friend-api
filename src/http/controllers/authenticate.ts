import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticationUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    name: z.string(),
    password: z.string().min(6)
  })

  const { name, password } = authenticateBodySchema.parse(request.body);

  try {
    const orgsRepository = new PrismaOrgsRepository();
    const authenticationUseCase = new AuthenticationUseCase(orgsRepository);

    await authenticationUseCase.execute({ name, password });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal Server Error' });
  }

  return reply.status(200).send();
}
