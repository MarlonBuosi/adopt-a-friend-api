import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { IPetsRepository } from "@/repositories/pets-repository";

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: IPetsRepository) { }

  async execute(): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.fetchMany();

    if (pets === null) {
      throw new ResourceNotFoundError()
    }

    return { pets }
  }
}
