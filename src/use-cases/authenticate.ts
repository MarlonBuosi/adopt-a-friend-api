import { IOrgsRepository } from "@/repositories/orgs-repository";
import { InvalidCredentialsErrors } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { Org } from "@prisma/client";

interface AuthenticationUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticationUseCaseResponse {
  org: Org
}

export class AuthenticationUseCase {
  constructor(private orgsRepository: IOrgsRepository) { }

  async execute({ email, password }: AuthenticationUseCaseRequest): Promise<AuthenticationUseCaseResponse> {
    const org = await this.orgsRepository.findByName(email);

    if (!org) {
      throw new InvalidCredentialsErrors()
    }

    const doesPasswordMatches = compare(password, org.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsErrors()
    }

    return { org }
  }
}
