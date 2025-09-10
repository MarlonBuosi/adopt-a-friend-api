import { Prisma, Pet } from "@prisma/client";
import { IPetsRepository } from "./pets-repository";

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = [];

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: 'pet-id',
      name: data.name,
      species: data.species,
      color: data.color,
      weight: data.weight ?? null,
      height: data.height ?? null,
      age: data.age ?? null,
      city: data.city,
      org_id: data.org.connect?.id ?? '',
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(pet);

    return pet;
  }
}
