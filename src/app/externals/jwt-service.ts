import { Injectable } from "@/common/decorators/injectable"
import { type CredentailsType, jwtToken } from "@/common/libs/jwt"
import { type IJwtService } from "../contracts/jwt-interface"

@Injectable()
export class JwtToken implements IJwtService {
  async sign(credentials: CredentailsType): Promise<string> {
    return await jwtToken.encode(credentials)
  }

  async verify(token: string): Promise<any> {
    return await jwtToken.decode(token)
  }
}
