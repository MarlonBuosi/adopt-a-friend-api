import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    phone: z.string(),
    password: z.string().min(6),
    city: z.string(),
  })

  const { name, phone, password, city} = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({ name, phone, password, city });
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send();
    }
    return reply.status(500).send({ message: 'Internal Server Error' });
  }

  return reply.status(201).send({ message: 'Organization created successfully' });
}
