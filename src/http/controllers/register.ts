import { z } from "zod";
import { registerUseCase } from "@/use-cases/register";
import { FastifyReply, FastifyRequest } from "fastify";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    phone: z.string(),
    password: z.string().min(6)
  })

  const { name, phone, password } = registerBodySchema.parse(request.body);

  try {
    await registerUseCase({ name, phone, password });
  } catch {
    return reply.status(409).send();
  }

  return reply.status(201).send({ message: 'Organization created successfully' });
}
