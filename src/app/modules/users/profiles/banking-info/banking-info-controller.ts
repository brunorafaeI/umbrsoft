import { Controller, Delete, Get, Post, Put } from "@/common/decorators/route"
import { type FindOneOptions, type FindManyOptions } from "typeorm"
import { AppLogger } from "@/common/libs/log4js"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequestBody } from "@/app/contracts/request-interface"
import { type Bookings } from "@/persistences/typeorm/models/widgets/Bookings"
import { BankingInfoService } from "./banking-info-service"
import { RequestUtil } from "@/common/utils/request"

@Controller("/bankings")
export class BankingInfoController {
  constructor(
    @Inject(BankingInfoService)
    private readonly _bankingService: IService<Bookings>
  ) {}

  @Get("/")
  @Post("/")
  async bankingIndex(
    req: IRequestBody<FindManyOptions<Bookings>>,
    res
  ): Promise<Bookings[]> {
    const { body } = req
    const { take, skip, page } = RequestUtil.parseQueryPagination(req.query)

    try {
      const [bankingInfos, total] = await this._bankingService.findAndCount({
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
        data: bankingInfos,
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Get("/:id")
  @Post("/:id")
  async bankingFindOne(
    req: IRequestBody<FindOneOptions<Bookings>>,
    res
  ): Promise<Profiles[]> {
    const { body } = req
    const { id } = req.params

    try {
      const bodyWhere = { ...body, where: { ...body?.where, id } }

      return res.status(200).send({
        data: await this._bankingService.findOne(bodyWhere),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Put("/:id")
  async bankingUpdate(req: IRequestBody<Profiles>, res): Promise<Profiles> {
    const { body } = req
    const { id } = req.params

    try {
      return res.status(200).send({
        data: await this._bankingService.save(id, body),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Delete("/:id")
  async bankingDelete(req, res): Promise<Profiles> {
    const { id } = req.params

    try {
      return res.status(200).send({
        data: await this._bankingService.remove(id as string),
      })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }
}
