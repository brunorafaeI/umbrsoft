import { Controller, Delete, Get, Post, Put } from "@/common/decorators/route"
import { ContactService } from "./contact-service"
import { FindOneOptions, type FindManyOptions } from "typeorm"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Contacts } from "@/persistences/typeorm/models/access/Contacts"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequest } from "@/app/contracts/request-interface"

@Controller("/contacts")
export class ContactController {
  constructor(
    @Inject(ContactService)
    private readonly _contactService: IService<Contacts>
  ) {}

  @Get("/")
  @Post("/")
  async contactIndex(
    req: IRequest<FindManyOptions<Contacts>>,
    res
  ): Promise<Contacts[]> {
    const { body } = req

    try {
      return res.status(200).send({
        contacts: await this._contactService.find(body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Get("/:id")
  @Post("/:id")
  async contactFindOne(
    req: IRequest<FindOneOptions<Contacts>>,
    res
  ): Promise<Contacts[]> {
    const { body } = req
    const { contactId } = req.params

    try {
      const bodyWhere = { ...body, where: { ...body?.where, id: contactId } }

      return res.status(200).send({
        contact: await this._contactService.findOne(bodyWhere),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id")
  async contactUpdate(req: IRequest<Contacts>, res): Promise<Contacts> {
    const { body } = req
    const { id } = req.params

    try {
      return res.status(200).send({
        contact: await this._contactService.save(id, body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Delete("/:id")
  async contactDelete(req, res): Promise<Contacts> {
    const { id } = req.params

    try {
      return res.status(200).send({
        contact: await this._contactService.remove(id),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }
}
