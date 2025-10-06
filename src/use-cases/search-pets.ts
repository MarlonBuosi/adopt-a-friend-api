import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { IPetsRepository, TSearchPets } from "@/repositories/pets-repository";

interface SearchPetsUseCaseRequest {
  searchParams: TSearchPets
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: IPetsRepository) { }

  async execute({ searchParams }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(searchParams);

    if (pets === null) {
      throw new ResourceNotFoundError()
    }

    return { pets }
  }
}
