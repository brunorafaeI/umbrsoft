import os from 'node:os'

import type { NextFunction, Request, Response } from 'express'
import { AppLogger, SystemLogger } from '@/common/libs/log4js'

export const onRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { method, url, ip, headers } = req
  const hostname = os.hostname()

  SystemLogger.info({ hostname, method, url, ip })
  AppLogger.info(method, url, ip, `[${hostname}]`, headers['user-agent'])

  next()
}
