import { hash } from "bcryptjs";
import { IOrgsRepository } from "@/repositories/orgs-repository";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

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

  const orgExists = await this.orgsRepository.findByEmail(name);

  if (orgExists) {
    throw new OrgAlreadyExistsError()
  }

  await this.orgsRepository.create({
    name,
    phone,
    password_hash
  })
}

const prismaUserRepository = new PrismaOrgsRepository();
await prismaUserRepository.create({
  name,
  phone,
  password_hash
})
}
