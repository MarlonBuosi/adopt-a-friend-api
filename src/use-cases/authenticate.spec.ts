import { InMemoryOrgsRepository } from "@/repositories/in-memory-orgs-repository"
import { describe, expect, it } from "vitest"
import { AuthenticationUseCase } from "./authenticate"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticationUseCase(orgsRepository)

    await orgsRepository.create({
      name: 'Test Org',
      password_hash: await hash('password123', 6),
      phone: '1234567890'
    })

    const { org } = await sut.execute({
      name: 'Test Org',
      password: 'password123'
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong name', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticationUseCase(orgsRepository)

    expect(() =>
      sut.execute({
        name: 'Nonexistent Org',
        password: 'password123'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticationUseCase(orgsRepository)

    await orgsRepository.create({
      name: 'Test Org',
      password_hash: await hash('password123', 6),
      phone: '1234567890'
    })

    expect(() =>
      sut.execute({
        name: 'Nonexistent Org',
        password: 'batman123'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
