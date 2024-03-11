import fastify from 'fastify'
import cors from '@fastify/cors'
import { onRequest, onError } from '@/frameworks/fastify/middlewares'
import { AppRouter } from './routes'
import { SwaggerConfig } from './swagger'

import fastifySwagger from '@fastify/swagger'
import fastifyApiReference from '@scalar/fastify-api-reference'

const appFastify = fastify({
  ignoreTrailingSlash: true
})

// Middlewares
void appFastify.register(cors, {
  origin: [
    'http://localhost:3000',
    /\.umbrsoft\.com$/
  ]
})

// Swagger
void appFastify.register(fastifySwagger, SwaggerConfig)
void appFastify.register(fastifyApiReference, {
  routePrefix: '/docs',
  configuration: {
    spec: () => appFastify.swagger()
  }
})

// Routers
void appFastify.register(AppRouter.bootstrap)

// Hooks
appFastify.addHook('onRequest', onRequest)
appFastify.addHook('onError', onError)

export default appFastify
