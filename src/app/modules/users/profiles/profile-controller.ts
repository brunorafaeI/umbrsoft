import { Controller, Delete, Get, Post, Put } from "@/common/decorators/route"
import { type FindManyOptions } from "typeorm"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequest } from "@/app/contracts/request-interface"
import { type Users } from "@/persistences/typeorm/models/access/Users"
import { ProfileService } from "./profile-service"
import { UserService } from "../user-service"

@Controller("/profiles")
export class ProfileController {
  constructor(
    @Inject(ProfileService)
    private readonly _profileService: IService<Profiles>,

    @Inject(UserService)
    private readonly _userService: IService<Users>
  ) {}

  @Get("/")
  @Post("/")
  async profileIndex(req, res): Promise<Profiles[]> {
    const { body } = req

    try {
      return res.status(200).send({
        profiles: await this._profileService.find({
          ...(body as FindManyOptions<Profiles>),
        }),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Get("/:id")
  @Post("/:id")
  async profileFindOne(req, res): Promise<Profiles[]> {
    const { body } = req
    const { id } = req.params

    try {
      const bodyWhere = { where: body?.where, id }

      return res.status(200).send({
        profiles: await this._profileService.find(
          bodyWhere as FindManyOptions<Profiles>
        ),
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
        user: await this._profileService.save(id as string, body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Delete("/:id")
  async profileDelete(req, res): Promise<Profiles> {
    const { id } = req.params

    try {
      return res.status(200).send({
        user: await this._profileService.remove(id as string),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }
}
