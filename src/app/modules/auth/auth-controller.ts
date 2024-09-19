import { IRequest } from "@/app/contracts/request-interface"
import { Controller, Post } from "@/common/decorators/route"

@Controller("/auth")
export class AuthController {
  @Post("/login")
  async authLogin(
    req: IRequest<{ username: string, password?: string }>,
    res
  ): Promise<any> {
    return res.status(200).send({ body: req.body })
  }

  @Post("/google")
  async authGoogle(
    req: IRequest<{ credentials: Record<string, string> }>,
    res
  ): Promise<any> {
    return res.status(200).send({ body: req.body })
  }
}
