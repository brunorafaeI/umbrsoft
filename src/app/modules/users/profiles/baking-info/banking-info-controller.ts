import { Controller, Get, Post, Put } from '@/common/decorators/route'
import { BankingInfoService } from './banking-info-service'
import { type FindManyOptions } from 'typeorm'
import { AppLogger } from '@/common/libs/log4js'
import { AppError } from '@/common/helpers/http'
import { type BankingInfo } from '@/persistences/typeorm/models/access/BankingInfo'

@Controller('/profiles/:profileId/banking-info')
export class BankingInfoController {
  @Get('/')
  @Post('/')
  async backingInfoIndex (req, res): Promise<BankingInfo[]> {
    const { body } = req

    try {
      return res.status(200).send({
        profiles: await BankingInfoService.find({
          ...(body as FindManyOptions<BankingInfo>)
        })
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError('Internal Server Error', 500)
    }
  }

  @Get('/:contactId')
  @Post('/:contactId')
  async backingInfoFindOne (req, res): Promise<BankingInfo[]> {
    const { body } = req
    const { contactId } = req.params

    try {
      return res.status(200).send({
        profiles: await BankingInfoService.find({
          ...(body as FindManyOptions<BankingInfo>),
          where: { id: contactId }
        })
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError('Internal Server Error', 500)
    }
  }

  @Put('/')
  async backingInfoCreate (req, res): Promise<BankingInfo> {
    const { body } = req
    const { profileId } = req.params

    try {
      return res.status(200).send({
        profile: await BankingInfoService.save({
          ...body as BankingInfo, profile: profileId
        })
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError('Internal Server Error', 500)
    }
  }
}
