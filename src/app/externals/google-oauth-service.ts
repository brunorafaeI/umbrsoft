import { AppError } from "@/common/helpers/http"
import { Injectable } from "@/common/decorators/injectable"
import { GOOGLE_OAUTH_CLIENT_ID, googleOauth } from "@/common/libs/google-oauth"

export interface UserInfoType {
  name?: string
  email: string
  picture?: string
}

export interface IGoogleOauthService {
  getTokenInfo: (code: string) => Promise<UserInfoType>
}

@Injectable()
export class GoogleOauthService implements IGoogleOauthService {
  constructor(private readonly _googleOauth = googleOauth) {}

  async getTokenInfo(code: string): Promise<UserInfoType> {
    const { tokens } = await this._googleOauth.getToken(code)
    const { id_token: idToken } = tokens

    if (!idToken) {
      throw new AppError("Unauthorized access", 401)
    }

    const tokenVerifyed = await this._googleOauth.verifyIdToken({
      idToken,
      audience: GOOGLE_OAUTH_CLIENT_ID,
    })

    const payload = tokenVerifyed.getPayload()

    if (!payload?.email) {
      throw new AppError("Unauthorized user token", 401)
    }

    const userInfo: UserInfoType = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    }

    return userInfo
  }
}
