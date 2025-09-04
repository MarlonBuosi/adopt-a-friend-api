import { Org, Prisma } from '@prisma/client';


export interface IOrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByName(name: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
}

