import { type FastifyRequest } from "fastify"

export interface IRequestBody<T> extends FastifyRequest {
  body: Partial<T>
  query: Record<string, string>
  params: Record<string, string>
}

export interface IRequestQuery<T> extends FastifyRequest {
  query: Partial<T>
  params: Record<string, string>
}
