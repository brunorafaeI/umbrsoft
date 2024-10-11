import { Controller, Get, Post, Put } from "@/common/decorators/route"
import { AppLogger } from "@/common/libs/log4js"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequestBody } from "@/app/contracts/request-interface"
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

      const bodyWhere = { ...body, where: { ...body?.where, profile } }

      return res.status(200).send({
        data: await this._contactService.find(bodyWhere),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Put("/:id/contacts")
  async profileContactCreate(req: IRequestBody<Contacts>, res): Promise<Contacts> {
    const { body } = req
    const { id } = req.params

    try {
      const profile = await this._profileService.findOne({
        select: ["id"],
        where: { id },
      })

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
