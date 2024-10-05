import { Controller, Put, Post, Get } from "@/common/decorators/route"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Users } from "@/persistences/typeorm/models/access/Users"
import { Inject } from "@/common/decorators/injectable"
import { IService, IRequestBody } from "@/app/contracts"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { UserService } from "../user-service"
import { ProfileService } from "./profile-service"
import type { FindManyOptions } from "typeorm"

@Controller("/users")
export class UserProfileController {
  constructor(
    @Inject(UserService)
    private readonly _userService: IService<Users>,

    @Inject(ProfileService)
    private readonly _profileService: IService<Profiles>
  ) {}

  @Get("/:id/profiles")
  @Post("/:id/profiles")
  async userProfileIndex(
    req: IRequestBody<FindManyOptions<Profiles>>,
    res
  ): Promise<Profiles> {
    const { body } = req
    const { id } = req.params

    try {
      const user = await this._userService.findOne({
        select: ["id"],
        where: { id },
      })

      const bodyWhere = { ...body, where: { ...body?.where, user } }

      return res.status(200).send({
        data: await this._profileService.find(bodyWhere),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id/profiles")
  async userProfileCreate(req: IRequestBody<Profiles>, res): Promise<Profiles> {
    const { body } = req
    const { id } = req.params

    try {
      const user = await this._userService.findOne({
        select: ["id"],
        where: { id },
      })

      return res.status(201).send({
        data: await this._profileService.findOrSave({
          ...body,
          user,
        }),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }
}
