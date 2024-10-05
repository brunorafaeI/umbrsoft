import { Controller, Get, Post, Put } from "@/common/decorators/route"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService, IRequestBody } from "@/app/contracts"
import { ProfileService } from "../profile-service"
import { BankingInfoService } from "./banking-info-service"
import { type BankingInfo } from "@/persistences/typeorm/models/access/BankingInfo"
import { type FindManyOptions } from "typeorm"

@Controller("/profiles")
export class ProfileBankingInfoController {
  constructor(
    @Inject(ProfileService)
    private readonly _profileService: IService<Profiles>,

    @Inject(BankingInfoService)
    private readonly _bankingInfoService: IService<BankingInfo>
  ) {}

  @Get("/:id/banking-info")
  @Post("/:id/banking-info")
  async profileBankingIndex(
    req: IRequestBody<FindManyOptions<BankingInfo>>,
    res
  ): Promise<BankingInfo> {
    const { body } = req
    const { id } = req.params

    try {
      const profile = await this._profileService.findOne({
        select: ["id"],
        where: { id },
      })

      const bodyWhere = { where: body?.where, profile }

      return res.status(200).send({
        data: await this._bankingInfoService.find(bodyWhere),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id/banking-info")
  async profileBankingCreate(
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
        data: await this._bankingInfoService.findOrSave({
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
