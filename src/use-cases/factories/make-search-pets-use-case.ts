import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SearchPetsUseCase } from "../search-pets";

export function makeSearchPetsUseCase() {
  const orgsRepository = new PrismaPetsRepository();
  const authenticateUseCase = new SearchPetsUseCase(orgsRepository);

  return authenticateUseCase
}
