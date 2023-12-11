import { type IWriteRepository } from '@/domain/interfaces'
import { User } from '@/infra/databases/typeorm/entities/User'
import { entityManager } from '@/databases/typeorm'
import { type DeepPartial, type Repository } from 'typeorm'

export class UserWriteRepository implements IWriteRepository<User> {
  private readonly _userRepository: Repository<User>

  constructor () {
    this._userRepository = entityManager.getRepository(User)
  }

  async save (user: DeepPartial<User>): Promise<User> {
    const userFind = await this._userRepository.findOneBy({ email: user.email })

    if (userFind !== null) {
      return await this._userRepository.save({
        ...user,
        id: userFind.id,
        updatedAt: new Date()
      })
    }

    return await this._userRepository.save(user)
  }
}
