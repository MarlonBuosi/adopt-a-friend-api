import { Pet } from "@prisma/client";
import { IPetsRepository } from "@/repositories/pets-repository";

interface IPetUseCase {
  name: string;
  species: string
  color: string;
  weight: number;
  height: number;
  age: number;
  city: string;
  orgId: string;
}

interface IPetUseCaseResponse {
  pet: Pet
}

export class PetUseCase {
  constructor(private petsRepository: IPetsRepository) { }

  async execute({ age, city, color, height, name, species, weight, orgId }: IPetUseCase): Promise<IPetUseCaseResponse> {

    const pet = await this.petsRepository.create({
      name,
      species,
      color,
      weight,
      height,
      age,
      city,
      org_id: orgId
    })

    return { pet }
  }
}
