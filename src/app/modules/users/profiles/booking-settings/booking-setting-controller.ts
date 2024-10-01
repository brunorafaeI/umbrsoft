import { Controller, Delete, Get, Post, Put } from "@/common/decorators/route"
import { type FindOneOptions, type FindManyOptions } from "typeorm"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequestBody } from "@/app/contracts/request-interface"
import { BookingSettingService } from "./booking-setting-service"
import type { BookingSettings } from "@/persistences/typeorm/models/widgets/BookingSettings"
import { RequestUtil } from "@/common/utils/request"

@Controller("/booking-setting")
export class BookingSettingController {
  constructor(
    @Inject(BookingSettingService)
    private readonly _bookingSettingService: IService<BookingSettings>
  ) {}

  @Get("/")
  @Post("/")
  async bookingSettingIndex(
    req: IRequestBody<FindManyOptions<BookingSettings>>,
    res
  ): Promise<BookingSettings[]> {
    const { body } = req
    const { take, skip, page } = RequestUtil.parseQueryPagination(req.query)

    try {
      const [bookingSettings, total] =
        await this._bookingSettingService.findAndCount({
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
        data: bookingSettings,
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Get("/:id")
  @Post("/:id")
  async bookingSettingFindOne(
    req: IRequestBody<FindOneOptions<BookingSettings>>,
    res
  ): Promise<Profiles[]> {
    const { body } = req
    const { id } = req.params

    try {
      const bodyWhere = { ...body, where: { ...body?.where, id } }

      return res.status(200).send({
        data: await this._bookingSettingService.findOne(bodyWhere),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id")
  async bookingSettingUpdate(
    req: IRequestBody<Profiles>,
    res
  ): Promise<Profiles> {
    const { body } = req
    const { id } = req.params

    try {
      return res.status(200).send({
        data: await this._bookingSettingService.save(id, body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Delete("/:id")
  async bookingSettingDelete(req, res): Promise<Profiles> {
    const { id } = req.params

    try {
      return res.status(200).send({
        data: await this._bookingSettingService.remove(id as string),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }
}
