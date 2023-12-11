import { IReadRepository } from '@domain/interfaces';
import { User } from '@infra/databases/typeorm/entities/User';
import { entityManager } from '@infra/databases/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

export class UserReadRepository implements IReadRepository<User> {
  private _userRepository: Repository<User>

  constructor() {
    this._userRepository = entityManager.getRepository(User)
  }

  async findById(id: string): Promise<User | null> {
    return await this._userRepository.findOneBy({ id })
  }

  async find(criteria: FindManyOptions<User>): Promise<User[] | null> {
    return await this._userRepository.find(criteria)
  }
}