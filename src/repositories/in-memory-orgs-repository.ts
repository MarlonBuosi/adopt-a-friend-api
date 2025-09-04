import { Prisma, Org } from "@prisma/client";
import { IOrgsRepository } from "./orgs-repository";

export class InMemoryOrgsRepository implements IOrgsRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: 'test-id',
      name: data.name,
      phone: data.phone,
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(org);

    return org;
  }

  async findByName(name: string) {
    const org = this.items.find(item => item.name === name);

    if (!org) {
      return null;
    }

    return org;
  }

  async findById(id: string) {
    const org = this.items.find(item => item.id === id);

    if (!org) {
      return null;
    }

    return org;
  }
}
