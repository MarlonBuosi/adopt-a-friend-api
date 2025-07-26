import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaOrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const user = await prisma.org.create({
      data
    });

    return user
  }
}
