import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { IOrgsRepository } from "../orgs-repository";

export class PrismaOrgsRepository implements IOrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const user = await prisma.org.create({
      data
    });

    return user
  }
}
