import { IRequestBody, IService } from "@/app/contracts"
import { IJwtTokenService, JwtToken } from "@/app/externals/jwt-token-service"
import { Inject } from "@/common/decorators/injectable"
import { Controller, Post } from "@/common/decorators/route"
import { type Users } from "@/persistences/typeorm/models/access/Users"
import { UserService } from "../users/user-service"
import { AppLogger } from "@/common/libs/log4js"
import { AppError } from "@/common/helpers/http"

@Controller("/auth")
export class AuthController {
  constructor(
    @Inject(JwtToken)
    private readonly _jwtToken: IJwtTokenService,

    @Inject(UserService)
    private readonly _userService: IService<Users>
  ) {}

  @Post("/login")
  async authLogin(
    req: IRequestBody<{ username: string, password: string }>,
    res
  ): Promise<any> {
    const { username } = req.body

    try {
      const jwtToken = await this._jwtToken.sign({ username })
      return res.status(200).send({ accessToken: jwtToken })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError("Internal Server Error", 500)
    }
  }

  @Post("/google")
  async authGoogle(
    req: IRequestBody<{ credentials: Record<string, string> }>,
    res
  ): Promise<any> {
    return res.status(200).send({ body: req.body })
  }
}
