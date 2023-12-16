import fastify from 'fastify'
import { onRequest, onError } from '@/frameworks/fastify/middlewares'
import { AppRouter } from './routes'

const appFastify = fastify({
  ignoreTrailingSlash: true
})

// Routers
void appFastify.register(AppRouter.bootstrap)

// Hooks
appFastify.addHook('onRequest', onRequest)
appFastify.addHook('onError', onError)

export default appFastify
