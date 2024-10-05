import { jwtVerify, SignJWT, type JWTPayload } from "jose"
import { getEnv } from "../dotenv/getenv"

export const jwtSecret = getEnv("JWT_SECRET")

export type CredentailsType = JWTPayload & {
  username?: string
  password?: string
}

export interface IJwtToken {
  encode: (credentails: CredentailsType) => Promise<string>
  decode: (token: string) => Promise<JWTPayload>
}

export const jwtToken: IJwtToken = {
  encode: async (credentails: CredentailsType) => {
    return await new SignJWT(credentails)
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode(jwtSecret))
  },

  decode: async (token: string) => {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(jwtSecret),
      { algorithms: ["HS256"] }
    )
    return payload
  },
}
