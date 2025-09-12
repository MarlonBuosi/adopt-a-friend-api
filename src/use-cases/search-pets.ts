import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { IPetsRepository } from "@/repositories/pets-repository";

interface SearchPetsUseCaseRequest {
  city: string;
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: IPetsRepository) { }

  async execute({ city }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchManyByCity(city);

    if (pets === null) {
      throw new ResourceNotFoundError()
    }

    return { pets }
  }
}
