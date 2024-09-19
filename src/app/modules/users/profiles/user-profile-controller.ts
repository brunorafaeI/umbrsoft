import { Controller, Put, Post, Get } from "@/common/decorators/route"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Users } from "@/persistences/typeorm/models/access/Users"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequest } from "@/app/contracts/request-interface"
import { Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { UserService } from "../user-service"
import { ProfileService } from "./profile-service"

@Controller("/users")
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly _userService: IService<Users>,

    @Inject(ProfileService)
    private readonly _profileService: IService<Profiles>
  ) {}

  @Get("/:id/profiles")
  @Post("/:id/profiles")
  async userProfileIndex(req, res): Promise<Profiles> {
    const { body } = req
    const { id } = req.params

    try {
      const user = await this._userService.findOne({
        where: { id },
      })

      if (!user) {
        throw new AppError("Profile not found", 404)
      }

      const bodyWhere = { where: body?.where, user }

      return res.status(200).send({
        profiles: await this._profileService.find({
          ...body,
          bodyWhere,
        }),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id/profiles")
  async userProfileCreate(req: IRequest<Profiles>, res): Promise<Profiles> {
    const { body } = req
    const { id } = req.params

    try {
      const user = await this._userService.findOne({
        where: { id },
      })

      if (!user) {
        throw new AppError("User not found", 404)
      }

      return res.status(201).send({
        profile: await this._profileService.findOrSave({
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
