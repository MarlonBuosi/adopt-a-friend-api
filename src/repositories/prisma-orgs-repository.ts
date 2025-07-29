import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaOrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const user = await prisma.org.create({
      data
    });

    return user
  }

  async findByEmail(name: string) {
    const user = await prisma.org.findUnique({
      where: { name }
    });

    return user
  }
}
