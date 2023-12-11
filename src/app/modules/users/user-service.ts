import type { FindManyOptions, Repository } from 'typeorm'
import { entityManager } from '@/persistences/typeorm'
import { Users } from '@/persistences/typeorm/models/access/Users'

export abstract class UserService {
  static _userRepository: Repository<Users> = entityManager.getRepository(Users)

  static async find (options?: FindManyOptions<Users>): Promise<Users[] | null> {
    return await UserService._userRepository.find(options)
  }

  static async save (data: any): Promise<Users | null> {
    return await UserService._userRepository.save(data)
  }

  public toString (): string {
    return 'UserService'
  }
}
