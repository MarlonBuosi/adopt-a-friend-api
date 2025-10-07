import { Pet } from "@prisma/client";
import { IPetsRepository } from "@/repositories/pets-repository";

interface IPetUseCase {
  name: string;
  species: string
  color: string;
  weight: number | null
  height: number | null;
  age: number | null;
  orgId: string;
}

interface IPetUseCaseResponse {
  pet: Pet
}

export class PetUseCase {
  constructor(private petsRepository: IPetsRepository) { }

  async execute({ age, color, height, name, species, weight, orgId }: IPetUseCase): Promise<IPetUseCaseResponse> {

    const pet = await this.petsRepository.create({
      name,
      species,
      color,
      weight,
      height,
      age,
      org_id: orgId
    })

    return { pet }
  }
}
