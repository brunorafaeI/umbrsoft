export const SwaggerConfig = {
  swagger: {
    info: {
      title: 'UmbrSoft API',
      version: '1.0.0'
    }
  },
  externalDocs: {
    url: 'https://swagger.io',
    description: 'Find more info here'
  },
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: 'Users', description: 'User related end-points' },
    { name: 'Profiles', description: 'Profile related end-points' }
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  }
}

export const SwaggerUiConfig = {
  prefix: '/docs',
  routePrefix: '/docs',
  exposeRoute: true,
  uiConfig: {
    docExpansion: 'full'
  },
  uiHooks: {
    onRequest (request, reply, next) {
      next()
    }
  },
  staticCSP: true,
  transformStaticCSP (header) {
    return header
  }
}
