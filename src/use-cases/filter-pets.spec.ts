import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { FilterPetsUseCase } from "./filter-pets";

let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: FilterPetsUseCase;

describe('Filters Pets Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    sut = new FilterPetsUseCase(inMemoryPetsRepository);
  })

  it('should fetch pets', async () => {
    await inMemoryPetsRepository.create({
      age: 3,
      city: 'New York',
      color: 'Brown',
      height: 50,
      name: 'Buddy',
      species: 'Dog',
      weight: 20, 
      org_id: 'org-123'
    })

    await inMemoryPetsRepository.create({
      age: 7,
      city: 'Curitiba',
      color: 'Black',
      height: 40,
      name: 'Átila',
      species: 'Pinscher',
      weight: 4, 
      org_id: 'org-123'
    })

    const { pets }  = await sut.execute({ characteristics: { name: 'Átila' } })

    expect(pets).toHaveLength(1);
  })
})
