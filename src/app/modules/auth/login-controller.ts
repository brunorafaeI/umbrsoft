import { IRequest } from "@/app/contracts/request-interface"
import { Controller, Post } from "@/common/decorators/route"

type LoginRequest = IRequest<{ username: string; password?: string }>

@Controller("/auth")
export class LoginController {
  @Post("/login")
  async login(req: LoginRequest, res): Promise<any> {
    return res.status(200).send({ body: req.body })
  }
}
