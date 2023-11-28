import fastify from 'fastify'
import { onRequest, onError } from '@/infra/frameworks/fastify/middlewares'
import { AppRouter } from './routes'
const appFastify = fastify({})

// Routers
void appFastify.register(AppRouter.bootstrap, { prefix: '/api' })

// Hooks
appFastify.addHook('onRequest', onRequest)
appFastify.addHook('onError', onError)

export default appFastify
