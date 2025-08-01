import { Org, Prisma } from '@prisma/client';


export interface IOrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByEmail(name: string): Promise<Org | null>
}

