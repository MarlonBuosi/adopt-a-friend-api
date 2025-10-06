import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { IPetsRepository, TSearchPets } from "@/repositories/pets-repository";


interface FilterPetsUseCaseRequest {
  characteristics: TSearchPets;
}

interface FilterPetsUseCaseResponse {
  pets: Pet[]
}

export class FilterPetsUseCase {
  constructor(private petsRepository: IPetsRepository) { }

  async execute({ characteristics }: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.filterByCharacteristics(characteristics);

    if (pets === null) {
      throw new ResourceNotFoundError()
    }

    return { pets }
  }
}
