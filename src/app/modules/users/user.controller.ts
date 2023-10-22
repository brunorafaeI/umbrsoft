import { Controller, Get, Post } from '@/common/decorators/route'
import { UserService } from './user.service'
import { type users } from '@prisma/client'

@Controller('/users')
export class UserController {
  @Get('/')
  public async userIndex (_, res): Promise<users> {
    const users = await UserService.findAll()

    return res.status(200).send({ users })
  }

  @Post('/')
  public userCreate (req, res): any {
    return res.status(200).send({ body: req.body })
  }
}
