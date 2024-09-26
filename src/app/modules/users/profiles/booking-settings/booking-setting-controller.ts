import { Controller, Delete, Get, Post, Put } from "@/common/decorators/route"
import { type FindOneOptions, type FindManyOptions } from "typeorm"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequest } from "@/app/contracts/request-interface"
import { BookingSettingService } from "./booking-setting-service"
import type { BookingSettings } from "@/persistences/typeorm/models/widgets/BookingSettings"

@Controller("/booking-setting")
export class BookingSettingController {
  constructor(
    @Inject(BookingSettingService)
    private readonly _bookingService: IService<BookingSettings>
  ) {}

  @Get("/")
  @Post("/")
  async bookingSettingIndex(
    req: IRequest<FindManyOptions<BookingSettings>>,
    res
  ): Promise<BookingSettings[]> {
    const { body } = req

    try {
      return res.status(200).send({
        bookings: await this._bookingService.find(body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Get("/:id")
  @Post("/:id")
  async bookingSettingFindOne(
    req: IRequest<FindOneOptions<BookingSettings>>,
    res
  ): Promise<Profiles[]> {
    const { body } = req
    const { id } = req.params

    try {
      const bodyWhere = { ...body, where: { ...body?.where, id } }

      return res.status(200).send({
        booking: await this._bookingService.findOne(bodyWhere),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id")
  async bookingSettingUpdate(req: IRequest<Profiles>, res): Promise<Profiles> {
    const { body } = req
    const { id } = req.params

    try {
      return res.status(200).send({
        booking: await this._bookingService.save(id, body),
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
        booking: await this._bookingService.remove(id as string),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }
}
