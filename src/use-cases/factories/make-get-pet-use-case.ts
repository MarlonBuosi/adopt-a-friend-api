import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetUseCase } from "../get-pet";

export function makeGetPetUseCase() {
  const orgsRepository = new PrismaPetsRepository();
  const authenticateUseCase = new GetPetUseCase(orgsRepository);

  return authenticateUseCase
}
