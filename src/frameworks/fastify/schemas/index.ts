import path from "node:path"

import { createGenerator } from "ts-json-schema-generator"

import fastify from "fastify"
import fastifySwagger from "@fastify/swagger"
import fastifyApiReference from "@scalar/fastify-api-reference"

export interface Person {
  name: string
  age: number
  gender: "male" | "female"
}

const config = {
  path: __filename,
  tsconfig: path.resolve(process.cwd(), "tsconfig.json"),
}

const schemaGenerator = createGenerator(config)
const schema = schemaGenerator.createSchema("Person")

const personSchema = schema.definitions?.Person

const appFastify = fastify()

appFastify.post(
  "/",
  {
    schema: {
      body: personSchema,
      operantionId: "createPerson",
      response: {
        200: personSchema,
      },
    },
  },
  async (req, res) => {
    return req.body
  }
)

void appFastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: "UmbrSoft API",
      version: "1.0.0",
    },
  },
})

void appFastify.register(fastifyApiReference, {
  routePrefix: "/docs",
  // uiConfig: {
  //   docExpansion: 'full'
  // },
  // uiHooks: {
  //   onRequest (request, reply, next) {
  //     next()
  //   }
  // },
  // staticCSP: true,
  // transformStaticCSP (header) {
  //   return header
  // }
})

appFastify.listen({ port: 3000 }, () => {
  console.log("Server listening on port 3000")
})
