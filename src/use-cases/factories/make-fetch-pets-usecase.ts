import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FetchPetsUseCase } from "../fetch-pets";

export function makeFetchPetsUseCase() {
  const orgsRepository = new PrismaPetsRepository();
  const authenticateUseCase = new FetchPetsUseCase(orgsRepository);

  return authenticateUseCase
}
