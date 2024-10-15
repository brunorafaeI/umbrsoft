import { IRequestBody, IService } from "@/app/contracts"
import {
  IJwtTokenService,
  JwtTokenService,
} from "@/app/externals/jwt-token-service"
import { Inject } from "@/common/decorators/injectable"
import { Controller, Post } from "@/common/decorators/route"
import { type Users } from "@/persistences/typeorm/models/access/Users"
import { UserService } from "../users/user-service"
import { AppLogger } from "@/common/libs/log4js"
import {
  GoogleAuthService,
  IGoogleAuthService,
} from "@/app/externals/google-auth-service"

@Controller("/auth")
export class AuthController {
  constructor(
    @Inject(JwtTokenService)
    private readonly _jwtToken: IJwtTokenService,

    @Inject(GoogleAuthService)
    private readonly _googleAuth: IGoogleAuthService,

    @Inject(UserService)
    private readonly _userService: IService<Users>
  ) {}

  @Post("/login")
  async authLogin(
    req: IRequestBody<{ username: string; password: string }>,
    res
  ) {
    const { username } = req.body

    try {
      const jwtToken = await this._jwtToken.sign({ username })
      return res.status(200).send({ accessToken: jwtToken })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }

  @Post("/google")
  async authGoogle(req: IRequestBody<{ idToken: string }>, res) {
    const { idToken } = req.body

    try {
      const userInfo = await this._googleAuth.getTokenInfo(idToken)
      const userFound = await this._userService.findOrSave({
        username: userInfo.email,
      })

      const jwtToken = await this._jwtToken.sign({
        ...userInfo,
        id: userFound.id,
      })

      const user = await this._userService.save(userFound.id, {
        accessToken: jwtToken,
      })

      return res.status(200).send({ data: user })
    } catch (err) {
      AppLogger.error(err.message)
      return err
    }
  }
}
