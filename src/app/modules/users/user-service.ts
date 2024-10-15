import { Repository } from "typeorm"
import type { FindManyOptions, FindOneOptions } from "typeorm"
import { entityManager } from "@/persistences/typeorm"
import { Users } from "@/persistences/typeorm/models/access/Users"
import { AppError } from "@/common/helpers/http"

import crypto from "node:crypto"
import { Injectable } from "@/common/decorators/injectable"
import type { IService } from "@/app/contracts/service-interface"

@Injectable()
export class UserService implements IService<Users> {
  constructor(
    private readonly _userRepository: Repository<Users> = entityManager.getRepository(
      Users
    )
  ) {}

  async create(data: Partial<Users>): Promise<Users | null> {
    const userFound = await this._userRepository.findOne({
      where: { username: data.username },
    })

    if (userFound) {
      throw new AppError("User already exists", 400)
    }

    const userCreated = await this._userRepository.save(data)

    delete userCreated.password
    return userCreated
  }

  async save(userId: string, data: Partial<Users>): Promise<Users | null> {
    const userFound = await this._userRepository.findOne({
      where: { id: userId },
    })

    if (!userFound) {
      throw new AppError("User not found", 404)
    }

    const userSaved = await this._userRepository.save({
      ...userFound,
      ...data,
    })

    delete userSaved.password
    return userSaved
  }

  async find(options?: FindManyOptions<Users>): Promise<Users[]> {
    return await this._userRepository.find(options)
  }

  async findOne(options: FindOneOptions<Users>): Promise<Users | null> {
    if (!options) {
      throw new AppError("Options are required", 400)
    }

    return await this._userRepository.findOne(options)
  }

  async findOrSave(data: Partial<Users>): Promise<Users> {
    const { username, password } = data

    if (!username) {
      throw new AppError("Username is required", 400)
    }

    const user = await this._userRepository.findOne({
      where: { username },
      relations: ["profiles"],
    })

    if (user) {
      return user
    }

    if (password) {
      data.password = crypto.createHash("sha256").update(password).digest("hex")
    }

    const userSaved = await this._userRepository.save(data)

    delete userSaved.password
    return userSaved
  }

  async findAndCount(
    options?: FindManyOptions<Users>
  ): Promise<[Users[], number]> {
    return await this._userRepository.findAndCount(options)
  }

  async remove(id: string): Promise<Users | null> {
    const userFound = await this._userRepository.findOne({
      where: { id },
    })

    if (!userFound) {
      throw new AppError("User not found", 404)
    }

    return await this._userRepository.remove(userFound)
  }
}
