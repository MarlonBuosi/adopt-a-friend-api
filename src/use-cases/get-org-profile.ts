import { IOrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetOrgProfileUseCaseRequest {
  orgId: string;
}

interface GetOrgProfileUseCasResponse {
  org: Org
}

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: IOrgsRepository) { }

  async execute({ orgId }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCasResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return { org }
  }
}
