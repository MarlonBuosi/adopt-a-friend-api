import { Pet } from "@prisma/client";
import { IPetsRepository } from "@/repositories/pets-repository";

interface IPetUseCase {
  id: string;
  name: string;
  species: string
  color: string;
  weight: number;
  height: number;
  age: number;
  city: string;
}

interface IPetUseCaseResponse {
  pet: Pet
}

export class PetUseCase {
  constructor(private petsRepository: IPetsRepository) { }

  async execute({ id, age, city, color, height, name, species, weight }: IPetUseCase): Promise<IPetUseCaseResponse> {

    const pet = await this.petsRepository.create({
      name,
      species,
      color,
      weight,
      height,
      age,
      city,
      org: { connect: { id } },
    })

    return { pet }
  }
}
