import { Controller, Get, Post, Put } from "@/common/decorators/route"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequest } from "@/app/contracts/request-interface"
import { ProfileService } from "../profile-service"
import { BookingService } from "./booking-service"
import { Bookings } from "@/persistences/typeorm/models/widgets/Bookings"
import { FindManyOptions } from "typeorm"

@Controller("/profiles")
export class ProfileBookingController {
  constructor(
    @Inject(ProfileService)
    private readonly _profileService: IService<Profiles>,

    @Inject(BookingService)
    private readonly _bookingService: IService<Bookings>
  ) {}

  @Get("/:id/bookings")
  @Post("/:id/bookings")
  async profileBookingIndex(
    req: IRequest<FindManyOptions<Bookings>>,
    res
  ): Promise<Bookings> {
    const { body } = req
    const { id } = req.params

    try {
      const profile = await this._profileService.findOne({
        where: { id },
      })

      const bodyWhere = { ...body, where: { ...body?.where, profile } }

      return res.status(200).send({
        bookings: await this._bookingService.find(bodyWhere),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id/bookings")
  async profileBookingCreate(req: IRequest<Profiles>, res): Promise<Profiles> {
    const { body } = req
    const { id } = req.params

    try {
      const profile = await this._profileService.findOne({
        where: { id },
      })

      return res.status(201).send({
        booking: await this._bookingService.findOrSave({
          ...body,
          profile,
        }),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }
}
