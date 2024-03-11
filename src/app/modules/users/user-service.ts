import type { FindManyOptions, Repository } from 'typeorm'
import { entityManager } from '@/persistences/typeorm'
import { Users } from '@/persistences/typeorm/models/access/Users'
import { AppError } from '@/common/helpers/http'

import crypto from 'node:crypto'

export abstract class UserService {
  static _userRepository: Repository<Users> = entityManager.getRepository(Users)

  static async find (options?: FindManyOptions<Users>): Promise<Users[]> {
    return await UserService._userRepository.find(options)
  }

  static async save (data: Partial<Users>): Promise<Users> {
    if (!data.username) {
      throw new AppError('Username is required', 400)
    }

    if (data.password) {
      data.password = crypto.createHash('sha256').update(data.password).digest('hex')
    }

    return await UserService._userRepository.save(data)
  }

  public toString (): string {
    return 'UserService'
  }
}
