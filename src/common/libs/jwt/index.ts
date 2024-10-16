import { jwtVerify, SignJWT, type JWTPayload } from "jose"
import { getEnv } from "../dotenv/getenv"
import { SystemLogger } from "../log4js"
import { AppError } from "@/common/helpers/http"

const JWT_SECRET = getEnv("JWT_SECRET")
const JWT_ISSUER = getEnv("JWT_ISSUER")

export type CredentialsType = JWTPayload & {
  id?: string
  name?: string
  email?: string
  picture?: string
}

export interface IJwtToken {
  encode: (credentails: CredentialsType) => Promise<string>
  decode: (token: string) => Promise<JWTPayload>
}

export const jwtToken: IJwtToken = {
  encode: async (credentails: CredentialsType) => {
    return await new SignJWT({
      ...credentails,
      iat: Math.floor(Date.now() / 1000),
    })
      .setExpirationTime("10h")
      .setProtectedHeader({ alg: "HS256" })
      .setIssuer(JWT_ISSUER)
      .sign(new TextEncoder().encode(JWT_SECRET))
  },

  decode: async (token: string) => {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET),
        { algorithms: ["HS256"] }
      )
      return payload
    } catch (err) {
      SystemLogger.error(err.message)
      throw new AppError("Invalid token or expired", 401)
    }
  },
}
