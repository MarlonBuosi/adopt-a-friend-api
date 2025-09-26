import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { AuthenticationUseCase } from "./authenticate"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticationUseCase

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticationUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {

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

    await expect(() =>
      sut.execute({
        name: 'Nonexistent Org',
        password: 'password123'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {

    await orgsRepository.create({
      name: 'Test Org',
      password_hash: await hash('password123', 6),
      phone: '1234567890'
    })

    await expect(() =>
      sut.execute({
        name: 'Nonexistent Org',
        password: 'batman123'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
