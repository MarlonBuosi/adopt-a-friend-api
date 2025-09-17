import { Pet, Prisma } from '@prisma/client';


export type TPet = Partial<Pick<Pet, "name" | "age" | "weight" | "height" | "color" | "species" | "city">>

export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  searchManyByCity(city: string): Promise<Pet[] | null>
  fetchMany(): Promise<Pet[] | null>
  filterByCharacteristics(characteristics: TPet): Promise<Pet[] | null>
}

