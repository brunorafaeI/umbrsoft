import { Controller, Get, Post, Put } from "@/common/decorators/route"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequestBody } from "@/app/contracts/request-interface"
import { ProfileService } from "../profile-service"
import { BookingService } from "./booking-service"
import { type Bookings } from "@/persistences/typeorm/models/widgets/Bookings"
import { type FindManyOptions } from "typeorm"
import { RequestUtil } from "@/common/utils/request"

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
    req: IRequestBody<FindManyOptions<Bookings>>,
    res
  ): Promise<Bookings> {
    const { body } = req
    const { id } = req.params
    const { take, skip, page } = RequestUtil.parseQueryPagination(req.query)

    try {
      const profile = await this._profileService.findOne({
        select: ["id"],
        where: { id },
      })

      const bodyWhere = { ...body, where: { ...body?.where, profile } }

      const [bookings, total] = await this._bookingService.findAndCount({
        ...bodyWhere,
        skip,
        take,
      })

      const totalPages = Math.ceil(total / take)

      return res.status(200).send({
        totalPages,
        currentPage: page,
        itemsPerPage: take,
        totalItems: total,
        data: bookings,
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id/bookings")
  async profileBookingCreate(
    req: IRequestBody<Profiles>,
    res
  ): Promise<Profiles> {
    const { body } = req
    const { id } = req.params

    try {
      const profile = await this._profileService.findOne({
        select: ["id"],
        where: { id },
      })

      return res.status(201).send({
        data: await this._bookingService.findOrSave({
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
