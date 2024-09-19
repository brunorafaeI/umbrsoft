import { Controller, Get, Post, Put } from "@/common/decorators/route"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequest } from "@/app/contracts/request-interface"
import { ProfileService } from "../profile-service"
import { ContactService } from "./contact-service"
import { Contacts } from "@/persistences/typeorm/models/access/Contacts"

@Controller("/profiles")
export class ProfileBookingController {
  constructor(
    @Inject(ProfileService)
    private readonly _profileService: IService<Profiles>,

    @Inject(ContactService)
    private readonly _contactService: IService<Contacts>
  ) {}

  @Get("/:id/contacts")
  @Post("/:id/contacts")
  async profileContactIndex(req, res): Promise<Contacts> {
    const { body } = req
    const { id } = req.params

    try {
      const profile = await this._profileService.findOne({
        where: { id },
      })

      if (!profile) {
        throw new AppError("Profile not found", 404)
      }

      const bodyWhere = { where: body?.where, profile }

      return res.status(200).send({
        contacts: await this._contactService.find({
          ...body,
          ...bodyWhere,
        }),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id/contacts")
  async profileContactCreate(req: IRequest<Contacts>, res): Promise<Contacts> {
    const { body } = req
    const { id } = req.params

    try {
      const profile = await this._profileService.findOne({
        where: { id },
      })

      if (!profile) {
        throw new AppError("Profile not found", 404)
      }

      return res.status(201).send({
        contact: await this._contactService.findOrSave({
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
