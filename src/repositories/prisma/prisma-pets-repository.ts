import { Prisma } from "@prisma/client";
import { IPetsRepository, TPet } from "../pets-repository";
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

  async searchManyByCity(city: string)  {
    const pets = await prisma.pet.findMany({
      where: { city }
    })

    return pets
  }

  async fetchMany()  {
    const pets = await prisma.pet.findMany()

    return pets
  }

  async filterByCharacteristics(characteristics: TPet)  {
    const pets = await prisma.pet.findMany({
      where: { ...characteristics }
    })
    return pets
  }
}
