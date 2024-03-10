import { Controller, Get, Post, Put } from '@/common/decorators/route'
import { ProfileService } from './profile-service'
import { type FindManyOptions } from 'typeorm'
import { AppLogger } from '@/common/libs/log4js'
import { AppError } from '@/common/helpers/http'
import { type Profiles } from '@/persistences/typeorm/models/access/Profiles'

@Controller('/users/:userId/profiles')
export class ProfileController {
  @Get('/')
  @Post('/')
  async profileIndex (req, res): Promise<Profiles[]> {
    const { body } = req

    try {
      return res.status(200).send({
        profiles: await ProfileService.find({ ...(body as FindManyOptions<Profiles>) })
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError('Internal Server Error', 500)
    }
  }

  @Put('/')
  async userCreate (req, res): Promise<Profiles> {
    const { body } = req
    const { userId } = req.params

    try {
      return res.status(200).send({
        profile: await ProfileService.save({ ...body as Profiles, user: userId })
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError('Internal Server Error', 500)
    }
  }
}
