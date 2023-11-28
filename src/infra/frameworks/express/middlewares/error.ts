import type { NextFunction, Request, Response } from 'express'
import { SystemLogger } from '@/common/libs/log4js'

export const onError = (
  error: any,
  req: Request,
  res: Response,
  _: NextFunction
): Response => {
  const { message, statusCode } = error

  SystemLogger.error(message)

  if (statusCode !== undefined) {
    return res.status(statusCode).json({ message })
  }

  return res.status(500).json({
    message: 'Internal server error.'
  })
}
