import os from "node:os"

import { AppLogger, SystemLogger } from "@/common/libs/log4js"
import type {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify"
import { getenv } from "@/common/libs/dotenv"
import { AppError } from "@/common/helpers/http"

export const onSecurity = (
  req: FastifyRequest,
  _: FastifyReply,
  done: HookHandlerDoneFunction
): void => {
  const { method, url, ip, headers } = req
  const hostname = os.hostname()

  const allowedIps = getenv("APP_ALLOWED_IPS").split(",")
  const findIp = allowedIps.find((allowedIp) => ip.match(new RegExp(allowedIp)))

  if (!findIp) {
    SystemLogger.warn({ hostname, method, url, ip })
    AppLogger.warn(
      method,
      url,
      ip,
      `[${hostname}]`,
      "Unauthorized IP",
      headers["user-agent"]
    )

    throw new AppError(
      "Forbidden: You are not authorized to access this server",
      403
    )
  }

  done()
}
