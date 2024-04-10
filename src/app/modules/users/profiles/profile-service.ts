import type { FindManyOptions, Repository } from 'typeorm'
import { entityManager } from '@/persistences/typeorm'
import { Profiles } from '@/persistences/typeorm/models/access/Profiles'
import { AppError } from '@/common/helpers/http'

export abstract class ProfileService {
  static _userRepository: Repository<Profiles> = entityManager.getRepository(Profiles)

  static async find (options?: FindManyOptions<Profiles>): Promise<Profiles[] | null> {
    return await ProfileService._userRepository.find(options)
  }

  static async save (data: Partial<Profiles>): Promise<Profiles | null> {
    if (!data.name) {
      throw new AppError('Name is required', 400)
    }

    if (!data.email) {
      throw new AppError('Email is required', 400)
    }

    const profileUpdated = await ProfileService._userRepository.save(data)
    return await ProfileService._userRepository.findOne({ where: { id: profileUpdated?.id } })
  }

  public toString (): string {
    return 'ProfileService'
  }
}
