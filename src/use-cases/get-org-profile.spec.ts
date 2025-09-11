import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { hash } from "bcryptjs"
import { GetOrgProfileUseCase } from "./get-org-profile"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get Org Profile Use Case', () => {

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })

  it('should be able to get an organization', async () => {

    const result = await orgsRepository.create({
      name: 'Test Org',
      password_hash: await hash('password123', 6),
      phone: '1234567890'
    })

    const { org } = await sut.execute({
      orgId: result.id
    })

    expect(org.id).toEqual(result.id)
  })

  it('should not be able to get an organization with wrong id', async () => {

    expect(() =>
      sut.execute({
        orgId: 'nonexistent-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  })
})
