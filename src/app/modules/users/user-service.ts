import { Repository } from "typeorm"
import type { FindManyOptions } from "typeorm"
import { entityManager } from "@/persistences/typeorm"
import { Users } from "@/persistences/typeorm/models/access/Users"
import { AppError } from "@/common/helpers/http"

import crypto from "node:crypto"
import { ProfileService } from "./profiles/profile-service"
import { Inject, Injectable } from "@/common/decorators/injectable"
import type { IService } from "@/app/contracts/service-interface"
import { IJwtService } from "@/app/contracts"
import { JwtToken } from "@/app/externals/jwt-service"

@Injectable()
export class UserService implements IService {
  constructor(
    @Inject(JwtToken.name)
    private readonly _jwtToken: IJwtService,
    private readonly _userRepository: Repository<Users> = entityManager.getRepository(
      Users
    )
  ) {}

  async find(options?: FindManyOptions<Users>): Promise<Users[]> {
    return await this._userRepository.find(options)
  }

  async save(userId: string, data: Partial<Users>): Promise<Users | null> {
    const userFound = await this._userRepository.findOne({
      where: { id: userId },
      relations: ["profiles"],
    })

    if (!userFound) {
      throw new AppError("User not found", 404)
    }

    if (!data.username) {
      throw new AppError("Username is required", 400)
    }

    if (data.password) {
      data.password = crypto
        .createHash("sha256")
        .update(data.password)
        .digest("hex")
    }

    const newUser = await this._userRepository.save(data)

    await ProfileService.save({
      email: newUser.username,
      name: "User Account",
      user: newUser,
    })

    return await this._userRepository.findOne({
      where: { id: newUser.id },
      relations: ["profiles"],
    })
  }

  async findOrSave(data: Partial<Users>): Promise<Users> {
    const { username } = data

    if (!username) {
      throw new AppError("Username is required", 400)
    }

    const user = await this._userRepository.findOne({
      where: { username },
      relations: ["profiles"],
    })

    if (!user) {
      const accessToken = await this._jwtToken.sign({ username })
      return await this._userRepository.save({ username, accessToken })
    }

    return user
  }
}
