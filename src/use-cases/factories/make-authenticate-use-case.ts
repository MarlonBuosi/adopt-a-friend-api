import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticationUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const authenticateUseCase = new AuthenticationUseCase(orgsRepository);

  return authenticateUseCase
}
