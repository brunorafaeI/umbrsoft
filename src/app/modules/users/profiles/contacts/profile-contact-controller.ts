import { Controller, Get, Post, Put } from "@/common/decorators/route"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService, IRequestBody } from "@/app/contracts"
import { ProfileService } from "../profile-service"
import { ContactService } from "./contact-service"
import { type Contacts } from "@/persistences/typeorm/models/access/Contacts"
import { type FindManyOptions } from "typeorm"

@Controller("/profiles")
export class ProfileContactController {
  constructor(
    @Inject(ProfileService)
    private readonly _profileService: IService<Profiles>,

    @Inject(ContactService)
    private readonly _contactService: IService<Contacts>
  ) {}

  @Get("/:id/contacts")
  @Post("/:id/contacts")
  async profileContactIndex(
    req: IRequestBody<FindManyOptions<Contacts>>,
    res
  ): Promise<Contacts> {
    const { body } = req
    const { id } = req.params

    try {
      const profile = await this._profileService.findOne({
        select: ["id"],
        where: { id },
      })

      if (!profile) {
        throw new AppError("Profile not found", 404)
      }

      return res.status(200).send({
        data: await this._contactService.find({
          ...body,
          where: { ...body?.where, profile },
        }),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Put("/:id/contacts")
  async profileContactCreate(
    req: IRequestBody<Contacts>,
    res
  ): Promise<Contacts> {
    const { body } = req
    const { id } = req.params

    try {
      const profile = await this._profileService.findOne({
        select: ["id"],
        where: { id },
      })

      if (!profile) {
        throw new AppError("Profile not found", 404)
      }

      return res.status(201).send({
        data: await this._contactService.findOrSave({
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
