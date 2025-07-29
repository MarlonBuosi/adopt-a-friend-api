import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { IOrgsRepository } from "@/repositories/orgs-repository";

interface IRegisterUseCase {
  name: string;
  phone: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private orgsRepository: IOrgsRepository) { }

  async execute({ name, password, phone }: IRegisterUseCase) {
    const password_hash = await hash(password, 6);

    const orgExists = await prisma.org.findUnique({
      where: { name }
    });

    if (orgExists) {
      throw new Error('Organization already exists');
    }

    await this.orgsRepository.create({
      name,
      phone,
      password_hash
    })
  }

}


