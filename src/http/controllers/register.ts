import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterUseCase } from "@/use-cases/register";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    phone: z.string(),
    password: z.string().min(6)
  })

  const { name, phone, password } = registerBodySchema.parse(request.body);

  try {
    const orgsRepository = new PrismaOrgsRepository();
    const registerUseCase = new RegisterUseCase(orgsRepository);

    await registerUseCase.execute({ name, phone, password });
  } catch {
    return reply.status(409).send();
  }

  return reply.status(201).send({ message: 'Organization created successfully' });
}
