import { Controller, Delete, Get, Post, Put } from "@/common/decorators/route"
import { type FindOneOptions, type FindManyOptions } from "typeorm"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequest } from "@/app/contracts/request-interface"
import { BookingService } from "./booking-service"
import { type Bookings } from "@/persistences/typeorm/models/widgets/Bookings"

@Controller("/bookings")
export class BookingController {
  constructor(
    @Inject(BookingService)
    private readonly _bookingService: IService<Bookings>
  ) {}

  @Get("/")
  @Post("/")
  async bookingIndex(
    req: IRequest<FindManyOptions<Bookings>>,
    res
  ): Promise<Bookings[]> {
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
  async bookingFindOne(
    req: IRequest<FindOneOptions<Bookings>>,
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
  async bookingUpdate(req: IRequest<Profiles>, res): Promise<Profiles> {
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
  async bookingDelete(req, res): Promise<Profiles> {
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
