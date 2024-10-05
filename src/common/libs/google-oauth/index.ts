import { OAuth2Client } from "google-auth-library"
import { getEnv } from "../dotenv/getenv"

export const GOOGLE_OAUTH_CLIENT_ID = getEnv("GOOGLE_OAUTH_CLIENT_ID")
const GOOGLE_OAUTH_CLIENT_SECRET = getEnv("GOOGLE_OAUTH_CLIENT_SECRET")
const GOOGLE_OAUTH_REDIRECT_URI = getEnv("GOOGLE_OAUTH_REDIRECT_URI")

export const googleOauth = new OAuth2Client({
  clientId: GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: GOOGLE_OAUTH_REDIRECT_URI,
})
