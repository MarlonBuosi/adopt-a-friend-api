import { hash } from "bcryptjs";
import { IOrgsRepository } from "@/repositories/orgs-repository";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

interface IRegisterUseCase {
  name: string;
  phone: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private orgsRepository: IOrgsRepository) { }

  async execute({ name, password, phone }: IRegisterUseCase) {
    const password_hash = await hash(password, 6);

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
}
