import type { FindManyOptions, Repository } from 'typeorm'
import { entityManager } from '@/persistences/typeorm'
import { Users } from '@/persistences/typeorm/models/access/Users'
import { AppError } from '@/common/helpers/http'

import crypto from 'node:crypto'
import { ProfileService } from './profiles/profile-service'

export abstract class UserService {
  static _userRepository: Repository<Users> = entityManager.getRepository(Users)

  static async find (options?: FindManyOptions<Users>): Promise<Users[]> {
    return await UserService._userRepository.find(options)
  }

  static async save (data: Partial<Users>): Promise<Users | null> {
    if (!data.username) {
      throw new AppError('Username is required', 400)
    }

    if (data.password) {
      data.password = crypto.createHash('sha256').update(data.password).digest('hex')
    }

    const newUser = await UserService._userRepository.save(data)

    if (!newUser?.id || !newUser?.username) {
      throw new AppError('Internal Server Error', 500)
    }

    await ProfileService.save({
      email: newUser.username,
      name: 'User Account',
      user: newUser
    })

    return await UserService._userRepository.findOne({ where: { id: newUser.id }, relations: ['profiles'] })
  }

  static async getByUsername (username: string): Promise<Users> {
    const user = await UserService._userRepository.findOne({
      where: { username },
      relations: ['profiles']
    })

    if (!user) {
      return await UserService._userRepository.save({ username })
    }

    return user
  }

  public toString (): string {
    return 'UserService'
  }
}
