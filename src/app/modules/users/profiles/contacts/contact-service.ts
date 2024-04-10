import type { FindManyOptions, Repository } from 'typeorm'
import { entityManager } from '@/persistences/typeorm'
import { Contacts } from '@/persistences/typeorm/models/access/Contacts'
import { AppError } from '@/common/helpers/http'

export abstract class ContactService {
  static _userRepository: Repository<Contacts> = entityManager.getRepository(Contacts)

  static async find (options?: FindManyOptions<Contacts>): Promise<Contacts[] | null> {
    return await ContactService._userRepository.find(options)
  }

  static async save (data: Partial<Contacts>): Promise<Contacts | null> {
    if (!data.name) {
      throw new AppError('Name contact is required', 400)
    }

    if (!data.relationship) {
      throw new AppError('Relationship is required', 400)
    }

    return await ContactService._userRepository.save(data)
  }

  public toString (): string {
    return 'ContactService'
  }
}
