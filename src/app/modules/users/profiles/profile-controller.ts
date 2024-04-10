import { Controller, Get, Post, Put } from '@/common/decorators/route'
import { ProfileService } from './profile-service'
import { type FindManyOptions } from 'typeorm'
import { AppLogger } from '@/common/libs/log4js'
import { AppError } from '@/common/helpers/http'
import { type Profiles } from '@/persistences/typeorm/models/access/Profiles'

@Controller('/profiles')
export class ProfileController {
  @Get('/')
  @Post('/')
  async profileIndex (req, res): Promise<Profiles[]> {
    const { body } = req

    try {
      return res.status(200).send({
        profiles: await ProfileService.find({
          ...(body as FindManyOptions<Profiles>)
        })
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError('Internal Server Error', 500)
    }
  }

  @Get('/:profileId')
  @Post('/:profileId')
  async profileFindOne (req, res): Promise<Profiles[]> {
    const { body } = req
    const { profileId } = req.params

    try {
      return res.status(200).send({
        profiles: await ProfileService.find({
          ...(body as FindManyOptions<Profiles>),
          where: { id: profileId }
        })
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError('Internal Server Error', 500)
    }
  }

  @Put('/')
  async profileCreate (req, res): Promise<Profiles> {
    const { body } = req
    const { userId } = req.params

    try {
      return res.status(200).send({
        profile: await ProfileService.save({
          ...body as Profiles, user: userId
        })
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError('Internal Server Error', 500)
    }
  }
}
