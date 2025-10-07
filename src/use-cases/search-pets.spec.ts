import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { SearchPetsUseCase } from "./search-pets";

let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    sut = new SearchPetsUseCase(inMemoryPetsRepository);
  })

  it('should fetch pets', async () => {
    await inMemoryPetsRepository.create({
      age: 3,
      color: 'Brown',
      height: 50,
      name: 'Buddy',
      species: 'Dog',
      weight: 20, 
      org_id: 'org-123'
    })

    await inMemoryPetsRepository.create({
      age: 3,
      color: 'Brown',
      height: 50,
      name: 'Buddy',
      species: 'Dog',
      weight: 20, 
      org_id: 'org-123'
    })

    const { pets }  = await sut.execute({ searchParams: { city: 'Curitiba', name: 'Buddy' } });

    expect(pets).toHaveLength(2);
  })
})
