// app-router.ts
import path from "node:path"
import { type FastifyInstance } from "fastify"
import {
  ROUTE_METADATA_KEY,
  type RouteDefinition,
} from "@/common/decorators/route"
import { scandir } from "@/common/helpers/scandir"
import { SystemLogger } from "@/common/libs/log4js"
import { KERNEL } from "@/config/kernel"
import { methodWrapper } from "@/common/decorators/injectable"

export abstract class AppRouter {
  public static _route: FastifyInstance

  static async bootstrap(
    fastify: FastifyInstance,
    _: Record<string, any>
  ): Promise<void> {
    const controllersPath = path.resolve(KERNEL.project_dir, "app", "modules")

    AppRouter._route = fastify

    for await (const file of scandir(controllersPath)) {
      if (file.includes("controller")) {
        try {
          const controllerModule: object = await import(file)

          if (controllerModule instanceof Object) {
            const ControllerClass: object =
              "default" in controllerModule
                ? controllerModule.default
                : Object.values(controllerModule).find(
                    (obj) => obj instanceof Function
                  )

            if (ControllerClass) {
              AppRouter.register(ControllerClass)
            }
          }
        } catch (error: any) {
          SystemLogger.error(error.message)
        }
      }
    }
  }

  static register(controller: object): void {
    if (Reflect.hasMetadata(ROUTE_METADATA_KEY, controller)) {
      const routes: RouteDefinition[] = Reflect.getMetadata(
        ROUTE_METADATA_KEY,
        controller
      )

      for (const route of routes) {
        const { path, method, handler } = route

        try {
          ;(AppRouter._route as any)[method](
            path.replace(/\/$/, ""),
            methodWrapper(handler, controller)
          )
        } catch (error) {
          SystemLogger.error(error.message)
        }
      }
    }
  }

  public toString(): string {
    return JSON.stringify(this)
  }
}
