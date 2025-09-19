import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { GetOrgProfileUseCase } from "../get-org-profile";

export function makeGetOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const authenticateUseCase = new GetOrgProfileUseCase(orgsRepository);

  return authenticateUseCase
}
