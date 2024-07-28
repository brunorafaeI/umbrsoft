import fastify from "fastify"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"

import {
  onRequest,
  onError,
  onSecurity,
} from "@/frameworks/fastify/middlewares"
import { AppRouter } from "./routes"
import { SwaggerConfig } from "./swagger"

import fastifySwagger from "@fastify/swagger"
import fastifyApiReference from "@scalar/fastify-api-reference"
import { getenv } from "@/common/libs/dotenv"

const appFastify = fastify({
  ignoreTrailingSlash: true,
})

// Cors
void appFastify.register(cors, {
  origin: getenv("APP_ALLOWED_ORIGINS").split(","),
})

// Helmet
void appFastify.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  },
})

// Swagger
void appFastify.register(fastifySwagger, SwaggerConfig)
void appFastify.register(fastifyApiReference, {
  routePrefix: "/docs",
  configuration: {
    spec: () => appFastify.swagger(),
  },
})

// Routers
void appFastify.register(AppRouter.bootstrap)

// Middlewares
appFastify.addHook("onRequest", onSecurity)
appFastify.addHook("onRequest", onRequest)
appFastify.addHook("onError", onError)

export default appFastify
