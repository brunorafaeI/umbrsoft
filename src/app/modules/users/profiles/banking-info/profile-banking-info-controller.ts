import { Controller, Get, Post, Put } from "@/common/decorators/route"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"
import { type Profiles } from "@/persistences/typeorm/models/access/Profiles"
import { Inject } from "@/common/decorators/injectable"
import { IService } from "@/app/contracts"
import { IRequest } from "@/app/contracts/request-interface"
import { ProfileService } from "../profile-service"
import { BankingInfoService } from "./banking-info-service"
import { BankingInfo } from "@/persistences/typeorm/models/access/BankingInfo"

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
  async profileBankingIndex(req, res): Promise<BankingInfo> {
    const { body } = req
    const { id } = req.params

    try {
      const profile = await this._profileService.findOne({
        where: { id },
      })

      const bodyWhere = { where: body?.where, profile }

      return res.status(200).send({
        bankings: await this._bankingInfoService.find({
          ...body,
          ...bodyWhere,
        }),
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Put("/:id/banking-info")
  async profileBankingCreate(req: IRequest<Profiles>, res): Promise<Profiles> {
    const { body } = req
    const { id } = req.params

    try {
      const profile = await this._profileService.findOne({
        where: { id },
      })

      return res.status(201).send({
        banking: await this._bankingInfoService.findOrSave({
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
