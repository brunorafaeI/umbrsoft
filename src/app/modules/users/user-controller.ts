import { Controller, Put, Post, Get } from "@/common/decorators/route"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Users } from "@/persistences/typeorm/models/access/Users"
import { type FindManyOptions } from "typeorm"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { UserService } from "./user-service"
import { IRequest } from "@/app/contracts/request-interface"

@Controller("/users")
export class UserController {
  constructor(
    @Inject(UserService.name)
    private readonly _userService: IService
  ) {}

  @Post("/")
  @Get("/")
  async userIndex(req, res): Promise<Users[]> {
    const { body } = req

    try {
      return res.status(200).send({
        users: await this._userService.find({
          ...(body as FindManyOptions<Users>),
        }),
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
      body.where = { ...body?.where, id }

      return res.status(200).send({
        users: await this._userService.find({
          ...(body as FindManyOptions<Users>),
        }),
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
      return res.status(200).send({
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
    const { id: userId } = req.params

    try {
      return res.status(200).send({
        user: await this._userService.save(userId, body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }
}
