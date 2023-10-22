import { Controller, Get } from '@/common/decorators/route'

@Controller('/posts')
export class PostController {
  @Get('/')
  public postIndex (_, res): any {
    return res.status(200).send({ message: 'List of posts' })
  }
}
