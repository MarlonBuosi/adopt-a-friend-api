import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FilterPetsUseCase } from "../filter-pets";

export function makeFilterPetsUseCase() {
  const orgsRepository = new PrismaPetsRepository();
  const authenticateUseCase = new FilterPetsUseCase(orgsRepository);

  return authenticateUseCase
}
