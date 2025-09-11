import { beforeEach, describe, expect, it } from "vitest";
import { PetUseCase } from "./pet";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: PetUseCase;

describe('Pet Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    sut = new PetUseCase(inMemoryPetsRepository);
  })

  it('should create a new pet', async () => {

    const { pet } = await sut.execute({
      age: 3,
      city: 'New York',
      color: 'Brown',
      height: 50,
      name: 'Buddy',
      species: 'Dog',
      weight: 20,
      orgId: 'org-123'
    })

    expect(pet.id).toEqual(expect.any(String));
  })
})
