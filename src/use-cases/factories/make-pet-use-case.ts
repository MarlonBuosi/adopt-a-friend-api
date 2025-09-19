import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PetUseCase } from "../pet";

export function makePetUseCase() {
  const orgsRepository = new PrismaPetsRepository();
  const authenticateUseCase = new PetUseCase(orgsRepository);

  return authenticateUseCase
}
