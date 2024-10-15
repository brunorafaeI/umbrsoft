import { OAuth2Client } from "google-auth-library"
import { getEnv } from "../dotenv/getenv"

export const AUTH_GOOGLE_ID = getEnv("AUTH_GOOGLE_ID")
const AUTH_GOOGLE_SECRET = getEnv("AUTH_GOOGLE_SECRET")

export const googleAuth = new OAuth2Client({
  clientId: AUTH_GOOGLE_ID,
  clientSecret: AUTH_GOOGLE_SECRET,
})
