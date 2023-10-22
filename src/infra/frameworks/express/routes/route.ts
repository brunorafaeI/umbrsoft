import path from 'node:path'
import { Router } from 'express'

import {
  ROUTE_METADATA_KEY,
  type RouteDefinition
} from '@/common/decorators/route'
import { scandir } from '@/common/helpers/scandir'
import { SystemLogger } from '@/common/libs/log4js'
import { KERNEL } from '@/infra/config/kernel'

export default class AppRouter {
  public static _route: Router = Router()
  static async bootstrap (): Promise<void> {
    const controllersPath = path.resolve(KERNEL.project_dir, 'app', 'modules')

    for await (const file of scandir(controllersPath)) {
      if (file.includes('controller')) {
        try {
          const controller = await import(file)

          if (controller instanceof Object) {
            const objCTRL =
              'default' in controller
                ? controller.default
                : Object.values(controller).find(
                  (obj) => obj instanceof Function
                )
            AppRouter.register(objCTRL)
          }
        } catch (error: any) {
          SystemLogger.error(error.message)
        }
      }
    }
  }

  static register (controller: any): void {
    if (Reflect.hasMetadata(ROUTE_METADATA_KEY, controller)) {
      const routes = Reflect.getMetadata(ROUTE_METADATA_KEY, controller)

      for (const [, route] of Object.entries<RouteDefinition>(routes)) {
        const { path, method, handler } = route

        try {
          (AppRouter._route as any)[method](path, handler)
        } catch (error) {
          SystemLogger.error(error.message)
        }
      }
    }
  }

  public toString (): string {
    return JSON.stringify(this)
  }
}
