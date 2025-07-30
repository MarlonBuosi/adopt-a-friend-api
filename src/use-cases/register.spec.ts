import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryOrgsRepository } from "@/repositories/in-memory-orgs-repository";

describe('Register Use Case', () => {
  it('should hash org password upon registration', async () => {
    const inMemoryOrgsRepository = new InMemoryOrgsRepository();
    const registerUseCase = new RegisterUseCase(inMemoryOrgsRepository);

    const { org } = await registerUseCase.execute({
      name: 'Test Org',
      phone: '1234567890',
      password: 'password123'
    })

    const isPasswordCorrectlyHashed = await compare('password123', org.password_hash);
    expect(isPasswordCorrectlyHashed).toBe(true);
  })

  it('should not be able to create org with same name twice', async () => {
    const inMemoryOrgsRepository = new InMemoryOrgsRepository();
    const registerUseCase = new RegisterUseCase(inMemoryOrgsRepository);

    await registerUseCase.execute({
      name: 'Test Org',
      phone: '1234567890',
      password: 'password123'
    })

    await expect(() => {
      return registerUseCase.execute({
        name: 'Test Org',
        phone: '0987654321',
        password: 'newpassword123'
      })
    }).rejects.toThrow('Organization already exists');
  })

  it('should be able to register', async () => {
    const inMemoryOrgsRepository = new InMemoryOrgsRepository();
    const registerUseCase = new RegisterUseCase(inMemoryOrgsRepository);

    const { org } = await registerUseCase.execute({
      name: 'New Org',
      phone: '1234567890',
      password: 'newpassword123'
    });

    expect(org.id).toEqual(expect.any(String));
  })
})
