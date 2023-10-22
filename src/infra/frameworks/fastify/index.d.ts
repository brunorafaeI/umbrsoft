declare namespace Fastify {
  export interface FastifyError {
    statusCode: number
  }

  export interface FastifyRequest {
    userClient: Record<string, any>
  }
}
