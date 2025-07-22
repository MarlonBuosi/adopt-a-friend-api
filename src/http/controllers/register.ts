import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

export async function register (request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(), 
    phone: z.string(),
    password: z.string().min(6)
  })

  const {name, phone, password} = registerBodySchema.parse(request.body);

  await prisma.org.create({
    data: { name, phone, password_hash: password }
  });
  
  return reply.status(201).send({ message: 'Organization created successfully' });
}
