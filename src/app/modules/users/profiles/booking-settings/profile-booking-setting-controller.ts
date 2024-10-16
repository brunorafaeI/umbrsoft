import { Controller, Get, Post, Put } from "@/common/decorators/route"
import { AppLogger } from "@/common/libs/log4js"
import { type Profiles } from "@/persistences/typeorm/models/access"
import { Inject } from "@/common/decorators/injectable"
import { IService, IRequestBody } from "@/app/contracts"
import { type FindManyOptions } from "typeorm"
import { ProfileService } from "../profile-service"
import { BookingSettingService } from "./booking-setting-service"
import type { BookingSettings } from "@/persistences/typeorm/models/widgets"

@Controller("/profiles")
export class ProfileBookingSettingController {
  constructor(
    @Inject(ProfileService)
    private readonly _profileService: IService<Profiles>,

    @Inject(BookingSettingService)
    private readonly _bookingSettingService: IService<BookingSettings>
  ) {}

  @Get("/:id/booking-setting")
  @Post("/:id/booking-setting")
  async profileBookingSettingIndex(
    req: IRequestBody<FindManyOptions<BookingSettings>>,
    res
  ): Promise<BookingSettings> {
    const { body } = req
    const { id } = req.params

    try {
      const profile = await this._profileService.findOne({
        select: ["id"],
        where: { id },
      })

      const bodyWhere = { ...body, where: { ...body?.where, profile } }

      return res.status(200).send({
        data: await this._bookingSettingService.find(bodyWhere),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Put("/:id/booking-setting")
  async profileBookingSettingCreate(
    req: IRequestBody<BookingSettings>,
    res
  ): Promise<BookingSettings> {
    const { body } = req
    const { id } = req.params

    try {
      const profile = await this._profileService.findOne({
        select: ["id"],
        where: { id },
      })

      return res.status(201).send({
        data: await this._bookingSettingService.findOrSave({
          ...body,
          profile,
        }),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }
}
