import { hash } from "bcryptjs";
import { IOrgsRepository } from "@/repositories/orgs-repository";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { Org } from "@prisma/client";

interface IRegisterUseCase {
  name: string;
  phone: string;
  password: string;
  city: string
}

interface IRegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: IOrgsRepository) { }

  async execute({ name, password, phone, city }: IRegisterUseCase): Promise<IRegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const orgExists = await this.orgsRepository.findByName(name);

    if (orgExists) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      phone,
      password_hash,
      city,
    })

    return { org }
  }
}
