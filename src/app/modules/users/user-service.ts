import { Repository } from "typeorm"
import type { FindManyOptions, FindOneOptions } from "typeorm"
import { entityManager } from "@/persistences/typeorm"
import { Users } from "@/persistences/typeorm/models/access/Users"
import { AppError } from "@/common/helpers/http"

import crypto from "node:crypto"
import { Inject, Injectable } from "@/common/decorators/injectable"
import type { IService } from "@/app/contracts/service-interface"
import { IJwtService } from "@/app/contracts"
import { JwtToken } from "@/app/externals/jwt-service"

@Injectable()
export class UserService implements IService<Users> {
  constructor(
    @Inject(JwtToken)
    private readonly _jwtToken: IJwtService,
    private readonly _userRepository: Repository<Users> = entityManager.getRepository(
      Users
    )
  ) {}

  async find(options?: FindManyOptions<Users>): Promise<Users[]> {
    return await this._userRepository.find(options)
  }

  async findOne(options: FindOneOptions<Users>): Promise<Users> {
    if (!options) {
      throw new AppError("Options are required", 400)
    }

    const userFound = await this._userRepository.findOne(options)

    if (!userFound) {
      throw new AppError("User not found", 404)
    }

    return userFound
  }

  async save(userId: string, data: Partial<Users>): Promise<Users | null> {
    const userFound = await this._userRepository.findOne({
      where: { id: userId },
    })

    if (!userFound) {
      throw new AppError("User not found", 404)
    }

    return await this._userRepository.save({
      ...userFound,
      ...data,
    })
  }

  async create(data: Partial<Users>): Promise<Users | null> {
    const userFound = await this._userRepository.findOne({
      where: { username: data.username },
    })

    if (userFound) {
      throw new AppError("User already exists", 400)
    }

    return await this._userRepository.save(data)
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

    if (!user) {
      const accessToken = await this._jwtToken.sign({ username })

      if (password) {
        data.password = crypto
          .createHash("sha256")
          .update(password)
          .digest("hex")
      }

      return await this._userRepository.save({
        ...data,
        accessToken,
      })
    }

    return user
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
