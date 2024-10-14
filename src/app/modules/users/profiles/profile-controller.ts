import { Controller, Delete, Get, Post, Put } from "@/common/decorators/route"
import type { FindOneOptions, FindManyOptions } from "typeorm"
import { AppLogger } from "@/common/libs/log4js"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService, IRequestBody } from "@/app/contracts"
import { ProfileService } from "./profile-service"
import { RequestUtil } from "@/common/utils/request"

@Controller("/profiles")
export class ProfileController {
  constructor(
    @Inject(ProfileService)
    private readonly _profileService: IService<Profiles>
  ) {}

  @Get("/")
  @Post("/")
  async profileIndex(
    req: IRequestBody<FindManyOptions<Profiles>>,
    res
  ): Promise<Profiles[]> {
    const { body } = req
    const { take, skip, page } = RequestUtil.parseQueryPagination(req.query)

    try {
      const [profiles, total] = await this._profileService.findAndCount({
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
        data: profiles,
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Get("/:id")
  @Post("/:id")
  async profileFindOne(
    req: IRequestBody<FindOneOptions<Profiles>>,
    res
  ): Promise<Profiles[]> {
    const { body } = req
    const { id } = req.params

    try {
      return res.status(200).send({
        data: await this._profileService.findOne({
          ...body,
          where: { ...body?.where, id },
        }),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Put("/:id")
  async profileUpdate(req: IRequestBody<Profiles>, res): Promise<Profiles> {
    const { body } = req
    const { id } = req.params

    try {
      return res.status(200).send({
        data: await this._profileService.save(id, body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Delete("/:id")
  async profileDelete(
    req: IRequestBody<{ id: string }>,
    res
  ): Promise<Profiles> {
    const { id } = req.params

    try {
      return res.status(200).send({
        data: await this._profileService.remove(id),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }
}
