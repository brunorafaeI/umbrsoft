import { type CredentailsType } from "@/common/libs/jwt"

export interface IJwtService {
  sign: (credentials: CredentailsType) => Promise<string>
  verify: (token: string) => Promise<any>
}
