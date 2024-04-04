import { Controller, Put, Post, Get } from '@/common/decorators/route'
import { UserService } from './user-service'
import { AppLogger } from '@/common/libs/log4js'
import { AppError } from '@/common/helpers/http'
import { type Users } from '@/persistences/typeorm/models/access/Users'
import { type FindManyOptions } from 'typeorm'

@Controller('/users')
export class UserController {
  @Post('/')
  @Get('/')
  async userIndex (req, res): Promise<Users[]> {
    const { body } = req

    try {
      return res.status(200).send({
        users: await UserService.find(body as FindManyOptions<Partial<Omit<Users, 'password'>>>)
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError('Internal Server Error', 500)
    }
  }

  @Post('/:userId')
  @Get('/:userId')
  async userFindOne (req, res): Promise<Users[]> {
    const { body } = req
    const { userId } = req.params

    try {
      return res.status(200).send({
        users: await UserService.find({
          ...(body as FindManyOptions<Partial<Omit<Users, 'password'>>>),
          where: { id: userId }
        })
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError('Internal Server Error', 500)
    }
  }

  @Put('/')
  async userCreate (req, res): Promise<Users> {
    const { body } = req

    try {
      return res.status(200).send({
        user: await UserService.findOrSave(body as Users)
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError('Internal Server Error', 500)
    }
  }
}
