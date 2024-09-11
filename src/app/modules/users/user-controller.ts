import { Controller, Put, Post, Get, Delete } from "@/common/decorators/route"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Users } from "@/persistences/typeorm/models/access/Users"
import { type FindManyOptions } from "typeorm"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequest } from "@/app/contracts/request-interface"
import { UserService } from "./user-service"
import { Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { ProfileService } from "./profiles/profile-service"

@Controller("/users")
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly _userService: IService<Users>,

    @Inject(ProfileService)
    private readonly _profileService: IService<Profiles>
  ) {}

  @Post("/")
  @Get("/")
  async userIndex(req, res): Promise<Users[]> {
    const { body } = req

    try {
      return res.status(200).send({
        users: await this._userService.find(body as FindManyOptions<Users>),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Post("/:id")
  @Get("/:id")
  async userFindOne(req, res): Promise<Users[]> {
    const { body } = req
    const { id } = req.params

    try {
      const bodyWhere = { where: body?.where, id }

      return res.status(200).send({
        users: await this._userService.find(
          bodyWhere as FindManyOptions<Users>
        ),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/")
  async userCreate(req, res): Promise<Users> {
    const { body } = req

    try {
      return res.status(201).send({
        user: await this._userService.findOrSave(body as Users),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id")
  async userUpdate(req: IRequest<Users>, res): Promise<Users> {
    const { body } = req
    const { id } = req.params

    try {
      return res.status(200).send({
        user: await this._userService.save(id as string, body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Delete("/:id")
  async userDelete(req, res): Promise<Users> {
    const { id } = req.params

    try {
      return res.status(200).send({
        user: await this._userService.remove(id as string),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id/profiles")
  async profileCreate(req: IRequest<Profiles>, res): Promise<Profiles> {
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
