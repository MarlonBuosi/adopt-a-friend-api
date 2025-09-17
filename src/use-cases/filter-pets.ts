import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { IPetsRepository } from "@/repositories/pets-repository";

type TPet = Partial<Pick<Pet, "name" | "age" | "weight" | "height" | "color" | "species" | "city">>

interface FilterPetsUseCaseRequest {
  characteristics: TPet;
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
