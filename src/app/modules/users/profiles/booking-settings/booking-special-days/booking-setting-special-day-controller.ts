import { Controller, Get, Post, Put } from "@/common/decorators/route"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequestBody } from "@/app/contracts/request-interface"
import { type FindManyOptions } from "typeorm"
import { BookingSettingService } from "../booking-setting-service"
import type {
  BookingSettings,
  BookingSpecialDays,
} from "@/persistences/typeorm/models/widgets"
import { BookingSpecialDayService } from "./booking-special-day-service"

@Controller("/booking-settings")
export class BookingSettingSpecialDayController {
  constructor(
    @Inject(BookingSettingService)
    private readonly _bookingSettingService: IService<BookingSettings>,

    @Inject(BookingSpecialDayService)
    private readonly _bookingSpecialDayService: IService<BookingSpecialDays>
  ) {}

  @Get("/:id/booking-special-day")
  @Post("/:id/booking-special-day")
  async bookingSettingSpecialDayIndex(
    req: IRequestBody<FindManyOptions<BookingSpecialDays>>,
    res
  ): Promise<BookingSpecialDays> {
    const { body } = req
    const { id } = req.params

    try {
      const bookingSetting = await this._bookingSettingService.findOne({
        select: ["id"],
        where: { id },
      })

      const bodyWhere = { ...body, where: { ...body?.where, bookingSetting } }

      return res.status(200).send({
        data: await this._bookingSpecialDayService.find(bodyWhere),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id/booking-special-day")
  async bookingSettingSpecialDayCreate(
    req: IRequestBody<BookingSpecialDays>,
    res
  ): Promise<BookingSpecialDays> {
    const { body } = req
    const { id } = req.params

    try {
      const bookingSetting = await this._bookingSettingService.findOne({
        select: ["id"],
        where: { id },
      })

      return res.status(201).send({
        data: await this._bookingSpecialDayService.findOrSave({
          ...body,
          bookingSetting,
        }),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }
}
