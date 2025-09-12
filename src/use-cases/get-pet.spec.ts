import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { GetPetUseCase } from "./get-pet";

let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: GetPetUseCase;

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    sut = new GetPetUseCase(inMemoryPetsRepository);
  })

  it('should find a pet with a pet id', async () => {
    const pet = await inMemoryPetsRepository.create({
      age: 3,
      city: 'New York',
      color: 'Brown',
      height: 50,
      name: 'Buddy',
      species: 'Dog',
      weight: 20, 
      org_id: 'org-123'
    })

    const { pet: petFound }  = await sut.execute({
      petId: pet.id
    })

    expect(pet.id).toEqual(petFound.id);
  })
})
