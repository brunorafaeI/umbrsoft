import { Controller, Delete, Get, Post, Put } from "@/common/decorators/route"
import { type FindOneOptions, type FindManyOptions } from "typeorm"
import { AppLogger } from "@/common/libs/log4js"
import { type Profiles } from "@/persistences/typeorm/models/access"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequestBody } from "@/app/contracts/request-interface"
import type { BookingSpecialDays } from "@/persistences/typeorm/models/widgets"
import { RequestUtil } from "@/common/utils/request"
import { BookingSpecialDayService } from "./booking-special-day-service"

@Controller("/booking-special-day")
export class BookingSpecialDayController {
  constructor(
    @Inject(BookingSpecialDayService)
    private readonly _bookingSpecialDayService: IService<BookingSpecialDays>
  ) {}

  @Get("/")
  @Post("/")
  async bookingSpecialDayIndex(
    req: IRequestBody<FindManyOptions<BookingSpecialDays>>,
    res
  ): Promise<BookingSpecialDays[]> {
    const { body } = req
    const { take, skip, page } = RequestUtil.parseQueryPagination(req.query)

    try {
      const [bookingSpecialDays, total] =
        await this._bookingSpecialDayService.findAndCount({
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
        data: bookingSpecialDays,
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Get("/:id")
  @Post("/:id")
  async bookingSpecialDayFindOne(
    req: IRequestBody<FindOneOptions<BookingSpecialDays>>,
    res
  ): Promise<Profiles[]> {
    const { body } = req
    const { id } = req.params

    try {
      const bodyWhere = { ...body, where: { ...body?.where, id } }

      return res.status(200).send({
        data: await this._bookingSpecialDayService.findOne(bodyWhere),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Put("/:id")
  async bookingSpecialDayUpdate(
    req: IRequestBody<Profiles>,
    res
  ): Promise<Profiles> {
    const { body } = req
    const { id } = req.params

    try {
      return res.status(200).send({
        data: await this._bookingSpecialDayService.save(id, body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Delete("/:id")
  async bookingSpecialDayDelete(req, res): Promise<Profiles> {
    const { id } = req.params

    try {
      return res.status(200).send({
        data: await this._bookingSpecialDayService.remove(id as string),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }
}
