import { Controller, Put, Post, Get, Delete } from "@/common/decorators/route"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Users } from "@/persistences/typeorm/models/access/Users"
import { type FindOneOptions, type FindManyOptions } from "typeorm"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequestBody } from "@/app/contracts/request-interface"
import { UserService } from "./user-service"
import { RequestUtil } from "@/common/utils/request"

@Controller("/users")
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly _userService: IService<Users>
  ) {}

  @Post("/")
  @Get("/")
  async userIndex(
    req: IRequestBody<FindManyOptions<Users>>,
    res
  ): Promise<Users[]> {
    const { body } = req
    const { take, skip, page } = RequestUtil.parseQueryPagination(req.query)

    try {
      const [users, total] = await this._userService.findAndCount({
        ...body,
        skip,
        take,
      })

      const totalPages = Math.ceil(total / take)

      return res.status(200).send({
        totalPages,
        currentPage: page,
        itemsPerPage: take,
        totalItems: total,
        data: users,
      })
    } catch (err) {
      console.log(err)
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Post("/:id")
  @Get("/:id")
  async userFindOne(
    req: IRequestBody<FindOneOptions<Users>>,
    res
  ): Promise<Users[]> {
    const { body } = req
    const { id } = req.params

    try {
      const bodyWhere = { ...body, where: { ...body?.where, id } }

      return res.status(200).send({
        data: await this._userService.findOne(bodyWhere),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/")
  async userCreate(req: IRequestBody<Users>, res): Promise<Users> {
    const { body } = req

    try {
      return res.status(201).send({
        data: await this._userService.findOrSave(body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id")
  async userUpdate(req: IRequestBody<Users>, res): Promise<Users> {
    const { body } = req
    const { id } = req.params

    try {
      return res.status(200).send({
        data: await this._userService.save(id, body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Delete("/:id")
  async userDelete(req: IRequestBody<{ id: string }>, res): Promise<Users> {
    const { id } = req.params

    try {
      return res.status(200).send({
        data: await this._userService.remove(id),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }
}
