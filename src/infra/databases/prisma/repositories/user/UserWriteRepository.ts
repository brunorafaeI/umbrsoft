import { Prisma, Role, User } from '@prisma/client'
import { entityManager } from '@infra/databases/prisma'
import { IWriteRepository } from "@domain/interfaces";
import { UserCreateModel } from '@domain/usecases/user/models/UserCreate';

export class UserWriteRepository implements IWriteRepository<User> {
  private _userRepository: Prisma.UserDelegate<false>

  constructor() {
    this._userRepository = entityManager.user
  }

  async save(data: UserCreateModel): Promise<User | void> {
    // const userFind = await this._userRepository.findFirst({
    //   where: { email: data.email }
    // })

    // if (userFind) {
    //   return await this._userRepository.update({
    //     where: { email: data.email },
    //     data: data
    //   })
    // }

    // return await this._userRepository.create({
    //   data: {
    //     name: data.name,
    //     email: data.email,
    //     token: data.token!,
    //     picture: data.picture,
    //   }
    // })
  }
}
