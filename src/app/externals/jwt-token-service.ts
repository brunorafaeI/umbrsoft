import { Injectable } from "@/common/decorators/injectable"
import { type CredentialsType, jwtToken } from "@/common/libs/jwt"
import type { JWTPayload } from "jose"

export interface IJwtTokenService {
  sign: (credentials: CredentialsType) => Promise<string>
  verify: (token: string) => Promise<JWTPayload>
}

@Injectable()
export class JwtTokenService implements IJwtTokenService {
  constructor(private readonly _jwtToken = jwtToken) {}

  async sign(credentials: CredentialsType): Promise<string> {
    return await this._jwtToken.encode(credentials)
  }

  async verify(token: string): Promise<JWTPayload> {
    return await this._jwtToken.decode(token)
  }
}
