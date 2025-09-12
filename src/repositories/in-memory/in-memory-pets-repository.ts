import { Prisma, Pet } from "@prisma/client";
import { IPetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = [];
  
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      species: data.species,
      color: data.color,
      weight: data.weight ?? null,
      height: data.height ?? null,
      age: data.age ?? null,
      city: data.city,
      org_id: data.org_id,
      created_at: new Date(),
      updated_at: new Date(),
    }
    
    this.items.push(pet);
    
    return pet;
  }

  async findById(id: string) {
    const pet = this.items.find(item => item.id === id)

    if(!pet) {
      return  null;
    }

    return pet;
  }

  async searchManyByCity(city: string) {
    const pets = this.items.filter(pet => pet.city.toLocaleLowerCase() === city.toLocaleLowerCase());

    return pets
  }

  async searchMany() {
    const pets = this.items;

    return pets
  }
}
