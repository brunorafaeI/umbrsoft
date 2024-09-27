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
    private readonly _profileRepository: Repository<Profiles> = entityManager.getRepository(
      Profiles
    )
  ) {}

  async create(data: Partial<Profiles>): Promise<Profiles | null> {
    const { user, name, email } = data

    if (!user) {
      throw new AppError("User is required", 400)
    }

    if (!name) {
      throw new AppError("Name is required", 400)
    }

    if (!email) {
      throw new AppError("Email is required", 400)
    }

    return await this._profileRepository.save(data)
  }

  async save(
    profileId: string,
    data: Partial<Profiles>
  ): Promise<Profiles | null> {
    const profileFound = await this._profileRepository.findOne({
      where: { id: profileId },
    })

    if (!profileFound) {
      throw new AppError("Profile not found", 404)
    }

    return await this._profileRepository.save({
      ...profileFound,
      ...data,
    })
  }

  async find(options?: FindManyOptions<Profiles>): Promise<Profiles[]> {
    return await this._profileRepository.find(options)
  }

  async findOne(options: FindOneOptions<Profiles>): Promise<Profiles> {
    if (!options) {
      throw new AppError("Options are required", 400)
    }

    const profileFound = await this._profileRepository.findOne(options)

    if (!profileFound) {
      throw new AppError("Profile not found", 404)
    }

    return profileFound
  }

  async findOrSave(data: Partial<Profiles>): Promise<Profiles> {
    const { user } = data

    if (!user) {
      throw new AppError("User is required", 400)
    }

    if (!data?.email) {
      data.email = data?.user?.username
    }

    const profile = await this._profileRepository.findOne({
      where: { email: data?.email, user },
    })

    if (!profile) {
      return await this._profileRepository.save(data)
    }

    return profile
  }

  async findAndCount(
    options?: FindManyOptions<Profiles>
  ): Promise<[Profiles[], number]> {
    return await this._profileRepository.findAndCount(options)
  }

  async remove(profileId: string): Promise<Profiles | null> {
    const profileFound = await this._profileRepository.findOne({
      where: { id: profileId },
    })

    if (!profileFound) {
      throw new AppError("Profile not found", 404)
    }

    return await this._profileRepository.remove(profileFound)
  }
}
