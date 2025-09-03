import { IOrgsRepository } from "@/repositories/orgs-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { Org } from "@prisma/client";

interface AuthenticationUseCaseRequest {
  name: string;
  password: string;
}

interface AuthenticationUseCaseResponse {
  org: Org
}

export class AuthenticationUseCase {
  constructor(private orgsRepository: IOrgsRepository) { }

  async execute({ name, password }: AuthenticationUseCaseRequest): Promise<AuthenticationUseCaseResponse> {
    const org = await this.orgsRepository.findByName(name);

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
