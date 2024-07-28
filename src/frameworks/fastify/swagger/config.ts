// import convert from "joi-to-json"

export const SwaggerConfig = {
  swagger: {
    info: {
      title: "UmbrSoft API",
      description: "Documentation for UmbrSoft API",
      version: "1.0.0",
    },
  },
  externalDocs: {
    url: "https://swagger.io",
    description: "Find more info here",
  },
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    { name: "Users", description: "User related end-points" },
    { name: "Profiles", description: "Profile related end-points" },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  // transform: ({ schema, url, route, swaggerObject }) => {
  //   if (!schema) return

  //   const {
  //     params,
  //     body,
  //     queryString,
  //     headers,
  //     response,
  //     ...transformedSchema
  //   } = schema

  //   let transformedUrl = url

  //   if (params) transformedSchema.params = convert(params)
  //   if (body) transformedSchema.body = convert(body)
  //   if (queryString) transformedSchema.queryString = convert(queryString)
  //   if (headers) transformedSchema.headers = convert(headers)
  //   if (response) transformedSchema.response = convert(response)

  //   // can add the hide tag if needed
  //   if (url.startsWith("/internal")) transformedSchema.hide = true

  //   // can transform the url
  //   if (url.startsWith("/v2/docs")) {
  //     transformedUrl = url.replace("v2", "v3")
  //   }

  //   // can add the hide tag for routes that do not match the swaggerObject version
  //   if (route?.constraints?.version !== swaggerObject.swagger) {
  //     transformedSchema.hide = true
  //   }

  //   return { schema: transformedSchema, url: transformedUrl }
  // },
}
