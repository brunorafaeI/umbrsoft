import { Controller, Get, Post, Put } from "@/common/decorators/route"
import { ProfileService } from "./profile-service"
import { type FindManyOptions } from "typeorm"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequest } from "@/app/contracts/request-interface"
import { UserService } from "../user-service"
import { type Users } from "@/persistences/typeorm/models/access/Users"

@Controller("/profiles")
export class ProfileController {
  constructor(
    @Inject(ProfileService.name)
    private readonly _profileService: IService<Profiles>,

    @Inject(UserService.name)
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

  @Put("/:userId")
  async profileCreate(req: IRequest<Profiles>, res): Promise<Profiles> {
    const { body } = req
    const { userId } = req.params

    try {
      const user = await this._userService.findOne({
        where: { id: userId },
      })

      if (user) {
        body.user = user
      }

      return res.status(201).send({
        profile: await this._profileService.findOrSave({
          ...body,
        }),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }
}
