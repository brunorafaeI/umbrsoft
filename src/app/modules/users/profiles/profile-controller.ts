import { Controller, Delete, Get, Post, Put } from "@/common/decorators/route"
import type { FindOneOptions, FindManyOptions } from "typeorm"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequest } from "@/app/contracts/request-interface"
import { ProfileService } from "./profile-service"

@Controller("/profiles")
export class ProfileController {
  constructor(
    @Inject(ProfileService)
    private readonly _profileService: IService<Profiles>
  ) {}

  @Get("/")
  @Post("/")
  async profileIndex(
    req: IRequest<FindManyOptions<Profiles>>,
    res
  ): Promise<Profiles[]> {
    const { body } = req

    try {
      return res.status(200).send({
        profiles: await this._profileService.find(body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Get("/:id")
  @Post("/:id")
  async profileFindOne(
    req: IRequest<FindOneOptions<Profiles>>,
    res
  ): Promise<Profiles[]> {
    const { body } = req
    const { id } = req.params

    try {
      const bodyWhere = { ...body, where: { ...body?.where, id } }

      return res.status(200).send({
        profile: await this._profileService.findOne(bodyWhere),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id")
  async profileUpdate(req: IRequest<Profiles>, res): Promise<Profiles> {
    const { body } = req
    const { id } = req.params

    try {
      return res.status(200).send({
        profile: await this._profileService.save(id, body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Delete("/:id")
  async profileDelete(req: IRequest<{ id: string }>, res): Promise<Profiles> {
    const { id } = req.params

    try {
      return res.status(200).send({
        profile: await this._profileService.remove(id),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }
}
