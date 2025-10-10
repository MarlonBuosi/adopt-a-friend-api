import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    name: z.string(),
    password: z.string().min(6)
  })

  const { name, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticationUseCase = makeAuthenticateUseCase();

    const { org } = await authenticationUseCase.execute({ name, password });
    
    const token = await reply.jwtSign({ role: org.role }, { sign: { sub: org.id }})

    const refreshToken = await reply.jwtSign({ role: org.role }, { sign: { sub: org.id, expiresIn: '7d' }})

    return reply.setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      }).status(200).send({
      token
    });

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal Server Error' });
  }
}
