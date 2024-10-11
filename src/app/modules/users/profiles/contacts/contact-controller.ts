import { Controller, Delete, Get, Post, Put } from "@/common/decorators/route"
import { ContactService } from "./contact-service"
import { type FindOneOptions, type FindManyOptions } from "typeorm"
import { AppLogger } from "@/common/libs/log4js"
import { type Contacts } from "@/persistences/typeorm/models/access/Contacts"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequestBody } from "@/app/contracts/request-interface"
import { RequestUtil } from "@/common/utils/request"

@Controller("/contacts")
export class ContactController {
  constructor(
    @Inject(ContactService)
    private readonly _contactService: IService<Contacts>
  ) {}

  @Get("/")
  @Post("/")
  async contactIndex(
    req: IRequestBody<FindManyOptions<Contacts>>,
    res
  ): Promise<Contacts[]> {
    const { body } = req
    const { take, skip, page } = RequestUtil.parseQueryPagination(req.query)

    try {
      const [contacts, total] = await this._contactService.findAndCount({
        ...body,
        skip,
        take,
      })

      const totalPages = Math.ceil(total / take)

      return res.status(200).send({
        totalPages,
        currentPage: page,
        itemsPerPage: take,
        totalItems: total,
        data: contacts,
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Get("/:id")
  @Post("/:id")
  async contactFindOne(
    req: IRequestBody<FindOneOptions<Contacts>>,
    res
  ): Promise<Contacts[]> {
    const { body } = req
    const { contactId } = req.params

    try {
      const bodyWhere = { ...body, where: { ...body?.where, id: contactId } }

      return res.status(200).send({
        data: await this._contactService.findOne(bodyWhere),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Put("/:id")
  async contactUpdate(req: IRequestBody<Contacts>, res): Promise<Contacts> {
    const { body } = req
    const { id } = req.params

    try {
      return res.status(200).send({
        data: await this._contactService.save(id, body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Delete("/:id")
  async contactDelete(
    req: IRequestBody<{ id: string }>,
    res
  ): Promise<Contacts> {
    const { id } = req.params

    try {
      return res.status(200).send({
        data: await this._contactService.remove(id),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }
}
