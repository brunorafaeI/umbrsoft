import { Controller, Get, Post } from '@/common/decorators/route'

@Controller('/users')
export class UserController {
  @Get('/')
  public userIndex (_, res): any {
    return res.status(200).send({ message: 'List of users' })
  }

  @Post('/')
  public userCreate (req, res): any {
    return res.status(200).send({ body: req.body })
  }
}
