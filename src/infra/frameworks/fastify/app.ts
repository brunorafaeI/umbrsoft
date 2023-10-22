import fastify from 'fastify'
import { onRequest, onError } from '@/infra/frameworks/fastify/middlewares'
// import { userRouter } from './routes'
import AppRouter from './routes/route'
const appFastify = fastify({})

// Routers
// void appFastify.register(userRouter)
void appFastify.register(AppRouter.bootstrap, { prefix: '/api' })

// Hooks
appFastify.addHook('onRequest', onRequest)
appFastify.addHook('onError', onError)

export default appFastify
