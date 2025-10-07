import { Prisma } from "@prisma/client";
import { IPetsRepository, TSearchPets } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements IPetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput)  {
    const pet = await prisma.pet.create({
      data
    });

    return pet
  }

  async findById(id: string)  {
    const pet = await prisma.pet.findUnique({
      where: { id }
    })

    return pet
  }

  async searchMany(searchParams: TSearchPets)  {
    const pets = await prisma.pet.findMany({
      where: { 
        org:{
          city: {
            contains: searchParams.city, mode: 'insensitive'
          },
        },
        ...searchParams
      }
    })

    return pets
  }

  async fetchMany()  {
    const pets = await prisma.pet.findMany()

    return pets
  }

  async filterByCharacteristics(characteristics: TSearchPets)  {
    const pets = await prisma.pet.findMany({
      where: { ...characteristics }
    })
    return pets
  }
}
