import { Repository } from "typeorm"
import type { FindManyOptions, FindOneOptions } from "typeorm"
import { entityManager } from "@/persistences/typeorm"
import { Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { AppError } from "@/common/helpers/http"
import { type IService } from "@/app/contracts"
import { Injectable } from "@/common/decorators/injectable"

@Injectable()
export class ProfileService implements IService<Profiles> {
  constructor(
    private readonly _userRepository: Repository<Profiles> = entityManager.getRepository(
      Profiles
    )
  ) {}

  async find(options?: FindManyOptions<Profiles>): Promise<Profiles[] | null> {
    return await this._userRepository.find(options)
  }

  async findOne(options: FindOneOptions<Profiles>): Promise<Profiles | null> {
    if (!options) {
      throw new AppError("Options are required", 400)
    }
    return await this._userRepository.findOne(options)
  }

  async save(
    profileId: string,
    data: Partial<Profiles>
  ): Promise<Profiles | null> {
    const profileFound = await this._userRepository.findOne({
      where: { id: profileId },
    })

    if (!profileFound) {
      throw new AppError("Profile not found", 404)
    }

    if (!data.name) {
      throw new AppError("Name is required", 400)
    }

    if (!data.email) {
      throw new AppError("Email is required", 400)
    }

    const profileUpdated = await this._userRepository.save(data)
    return await this._userRepository.findOne({
      where: { id: profileUpdated?.id },
    })
  }

  async findOrSave(data: Partial<Profiles>): Promise<Profiles> {
    const { name, user } = data

    if (!name) {
      throw new AppError("Name is required", 400)
    }

    if (!user) {
      throw new AppError("User is required", 400)
    }

    if (!data?.email) {
      data.email = data?.user?.username
    }

    const profile = await this._userRepository.findOne({
      where: { name, email: data?.email, user },
    })

    if (!profile) {
      return await this._userRepository.save(data)
    }

    return profile
  }
}
