import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { PrismaOrgsRepository } from "@/repositories/prisma-orgs-repository";

interface IRegisterUseCase {
  name: string;
  phone: string;
  password: string;
}

export async function registerUseCase({name, password, phone}:IRegisterUseCase){
    const password_hash = await hash(password, 6);
  
    const orgExists = await prisma.org.findUnique({
      where: { name }
    });
  
    if (orgExists) {
      throw new Error('Organization already exists');
    }
  
    const prismaUserRepository = new PrismaOrgsRepository();
    await prismaUserRepository.create({
      name,
      phone,
      password_hash
    })
}
