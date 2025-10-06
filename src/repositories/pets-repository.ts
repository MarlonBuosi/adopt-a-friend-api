import { Pet, Prisma } from '@prisma/client';


export type TSearchPets = {
  city: string;
  name?: string;
  species?: string;
  color?: string;
  weight?: number;
  height?: number;
  age?: number;
}

export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  searchMany(searchParams: TSearchPets): Promise<Pet[] | null>
  fetchMany(): Promise<Pet[] | null>
  filterByCharacteristics(characteristics: TSearchPets): Promise<Pet[] | null>
}

