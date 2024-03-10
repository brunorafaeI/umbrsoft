import { getEnv } from '@/common/libs/dotenv/getenv'

export const SwaggerConfig = {
  openapi: {
    info: {
      title: 'UmbrSoft API',
      description: 'Automatically generated documentation for your API.',
      version: '1.0.0'
    },
    servers: [
      {
        url: getEnv('APP_BASE_URL')
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  externalDocs: {
    url: 'https://swagger.io',
    description: 'Find more info here'
  },
  transform: (schema: object) => {
    return recursivePropertyReplacement(schema)
  }
}

export function recursivePropertyReplacement (schema: object): object {
  if (typeof schema === 'object') {
    if ('customSwaggerProps' in schema) {
      Object.assign(schema, schema.customSwaggerProps)
      delete schema.customSwaggerProps
    }

    return Object.fromEntries(
      Object.entries(schema).map(([key, value]) => {
        if (typeof value === 'object') {
          return [key, recursivePropertyReplacement(value as object)]
        }
        return [key, value]
      })
    )
  }

  return schema
}
