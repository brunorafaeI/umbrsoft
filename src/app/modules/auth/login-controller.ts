import { Controller, Post } from '@/common/decorators/route'
import { type Users } from '@/persistences/typeorm/models/access/Users'
import { type FastifyRequest } from 'fastify'

interface LoginFormRequest extends FastifyRequest {
  body: {
    credential: Pick<Users, 'username' | 'password'>
  }
}

@Controller('/auth')
export class LoginController {
  @Post('/login')
  async login (req: LoginFormRequest, res): Promise<any> {
    return res.status(200).send({ body: req.body })
  }
}
