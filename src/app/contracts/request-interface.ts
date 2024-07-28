import { type FastifyRequest } from "fastify"

export interface IRequest<T> extends FastifyRequest {
  body: Partial<T>
  params: any
}
