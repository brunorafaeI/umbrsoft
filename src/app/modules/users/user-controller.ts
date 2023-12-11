import { Controller, Get, Post } from '@/common/decorators/route'
import { UserService } from './user-service'
import { type FindManyOptions } from 'typeorm'
import { AppLogger } from '@/common/libs/log4js'
import { AppError } from '@/common/helpers/http'
import { type Users } from '@/persistences/typeorm/models/access/Users'

@Controller('/users')
export class UserController {
  @Get('/')
  async userIndex (req, res): Promise<Users[]> {
    const { body } = req

    try {
      return res.status(200).send({
        users: await UserService.find({ ...(body as FindManyOptions<Users>) })
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError(err.message)
    }
  }

  @Post('/')
  userCreate (req, res): object {
    return res.status(200).send({ body: req.body })
  }
}
