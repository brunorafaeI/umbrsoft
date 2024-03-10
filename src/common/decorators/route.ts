import 'reflect-metadata'
import { SystemLogger } from '@/common/libs/log4js'

export enum RouteMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export interface RouteDefinition {
  method: RouteMethod
  path: string
  handler: (req: Request, res: Response) => void | Promise<void>
}

export const ROUTE_METADATA_KEY = Symbol('route')

/**
 * Generates a route decorator function that adds routes to the metadata of a class.
 *
 * @param {string} path - The path of the route.
 * @param {RouteMethod} method - The HTTP method of the route.
 * @return {void}
 */
export const Route = (path: string, method: RouteMethod) => {
  return (target: object, _: string, descriptor: PropertyDescriptor) => {
    try {
      const routes = Reflect.getMetadata(ROUTE_METADATA_KEY, target.constructor) ?? []
      const newRoutes: RouteDefinition[] = [
        ...routes,
        { path, method, handler: descriptor.value }
      ]

      Reflect.defineMetadata(ROUTE_METADATA_KEY, newRoutes, target.constructor)
    } catch (error) {
      SystemLogger.error(`Error in Route function: ${error}`)
    }
  }
}

export const Get = (path: string): any => Route(path, RouteMethod.GET)
export const Post = (path: string): any => Route(path, RouteMethod.POST)
export const Delete = (path: string): any => Route(path, RouteMethod.DELETE)
export const Put = (path: string): any => Route(path, RouteMethod.PUT)

export const Controller = (routePrefix: string) => {
  return (constructor: object) => {
    const routes: [] = Reflect.getMetadata(ROUTE_METADATA_KEY, constructor) ?? []
    const newRoutes: RouteDefinition[] = []

    for (const [, route] of Object.entries<RouteDefinition>(routes)) {
      newRoutes.push({ ...route, path: routePrefix.concat(route.path) })
    }

    Reflect.defineMetadata(ROUTE_METADATA_KEY, newRoutes, constructor)
  }
}
