import os from 'node:os'

import { AppLogger, SystemLogger } from '@/common/libs/log4js'
import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'

export const onRequest = (
  req: FastifyRequest,
  _: FastifyReply,
  done: HookHandlerDoneFunction
): void => {
  const { method, url, ip, headers } = req
  const hostname = os.hostname()

  SystemLogger.info({ hostname, method, url, ip })
  AppLogger.info(method, url, ip, `[${hostname}]`, headers['user-agent'])

  done()
}
