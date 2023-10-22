import { Prisma, User } from '@prisma/client'
import { entityManager } from '@infra/databases/prisma'
import { IReadRepository } from "@domain/interfaces";

export class UserReadRepository implements IReadRepository<User> {
  private _userRepository: Prisma.UserDelegate<false>

  constructor() {
    this._userRepository = entityManager.user
  }

  async findById(id: string): Promise<User | null> {
    return await this._userRepository.findUnique({
      where: { id }
    })
  }

  async find(criteria: Prisma.UserFindManyArgs): Promise<User[] | null> {
    return await this._userRepository.findMany(criteria)
  }
}
