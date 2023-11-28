import { entityManager } from '@/infra/databases/prisma'
import { type Prisma } from '@prisma/client'

export abstract class UserService {
  static _userRepository: Prisma.usersDelegate<false> = entityManager.users

  public static async findAll (): Promise<any> {
    return await UserService._userRepository.findMany()
  }

  public toString (): string {
    return 'UserService'
  }
}
