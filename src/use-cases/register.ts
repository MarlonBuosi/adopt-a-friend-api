import { hash } from "bcryptjs";
<<<<<<< Updated upstream
import { prisma } from "@/lib/prisma";
import { PrismaOrgsRepository } from "@/repositories/prisma-orgs-repository";
=======
import { IOrgsRepository } from "@/repositories/orgs-repository";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
>>>>>>> Stashed changes

interface IRegisterUseCase {
  name: string;
  phone: string;
  password: string;
}

export async function registerUseCase({ name, password, phone }: IRegisterUseCase) {
  const password_hash = await hash(password, 6);

  const orgExists = await prisma.org.findUnique({
    where: { name }
  });

<<<<<<< Updated upstream
  if (orgExists) {
    throw new Error('Organization already exists');
=======
    const orgExists = await this.orgsRepository.findByEmail(name);

    if (orgExists) {
      throw new OrgAlreadyExistsError()
    }

    await this.orgsRepository.create({
      name,
      phone,
      password_hash
    })
>>>>>>> Stashed changes
  }

  const prismaUserRepository = new PrismaOrgsRepository();
  await prismaUserRepository.create({
    name,
    phone,
    password_hash
  })
}
