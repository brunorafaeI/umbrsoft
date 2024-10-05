import { Injectable } from "@/common/decorators/injectable"
import { type CredentailsType, jwtToken } from "@/common/libs/jwt"

export interface IJwtTokenService {
  sign: (credentials: CredentailsType) => Promise<string>
  verify: (token: string) => Promise<any>
}

@Injectable()
export class JwtToken implements IJwtTokenService {
  constructor(private readonly _jwtToken = jwtToken) {}

  async sign(credentials: CredentailsType): Promise<string> {
    return await this._jwtToken.encode(credentials)
  }

  async verify(token: string): Promise<any> {
    return await this._jwtToken.decode(token)
  }
}
