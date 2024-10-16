import { AppError } from "@/common/helpers/http"
import { Injectable } from "@/common/decorators/injectable"
import { AUTH_GOOGLE_ID, googleAuth } from "@/common/libs/google-auth"
import { SystemLogger } from "@/common/libs/log4js"

export interface UserInfoType {
  name?: string
  email: string
  picture?: string
}

export interface IGoogleAuthService {
  getTokenInfo: (idToken?: string) => Promise<UserInfoType>
}

@Injectable()
export class GoogleAuthService implements IGoogleAuthService {
  constructor(private readonly _googleAuth = googleAuth) {}

  async getTokenInfo(idToken?: string): Promise<UserInfoType> {
    if (!idToken) {
      throw new AppError("Unauthorized access", 401)
    }

    try {
      const tokenVerifyed = await this._googleAuth.verifyIdToken({
        idToken,
        audience: AUTH_GOOGLE_ID,
      })

      const payload = tokenVerifyed.getPayload()

      if (!payload?.email) {
        throw new AppError("Unauthorized user token", 401)
      }

      return {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      } satisfies UserInfoType
    } catch (err) {
      SystemLogger.error(err.message)
      throw new AppError("Invalid token or expired", 401)
    }
  }
}
