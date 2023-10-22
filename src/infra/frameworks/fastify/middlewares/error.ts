import { SystemLogger } from '@/common/libs/log4js'
import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export const onError = (
  request: FastifyRequest,
  reply: FastifyReply,
  error: FastifyError
): FastifyReply => {
  const { message, statusCode } = error

  SystemLogger.error(message)

  if (statusCode !== undefined) {
    return reply.status(statusCode).send({ message })
  }

  return reply.status(500).send({
    message: 'Internal server error.'
  })
}
