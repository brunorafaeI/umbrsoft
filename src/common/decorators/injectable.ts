import "reflect-metadata"

import { container } from "@/frameworks/dependency/container"
import { isClass } from "@/common/utils/class"
import { AppLogger } from "../libs/log4js"

export function Injectable() {
  return (target: object) => {
    try {
      if (isClass(target)) {
        const TargetClass = target
        const dependencies: [] = resolveDependencies(target)
        const targetInstance: object = new TargetClass(...dependencies)

        container.register(
          Reflect.get(targetInstance.constructor, "name"),
          targetInstance
        )
      }
    } catch (err) {
      AppLogger.error(err.message)
    }
  }
}

export function Inject(token: object) {
  return (target: object, _: any, index: number) => {
    try {
      if (isClass(token)) {
        const TokenClass = token
        token = Reflect.get(new TokenClass().constructor, "name")
      }

      const existingInjectedParams =
        Reflect.getOwnMetadata("inject_params", target) || []
      existingInjectedParams.unshift({ index, token })
      Reflect.defineMetadata("inject_params", existingInjectedParams, target)
    } catch (err) {
      AppLogger.error(err.message)
    }
  }
}

export function resolveDependencies<T>(target: object): T {
  const tokens = Reflect.getMetadata("design:paramtypes", target) || []
  const injectParams = Reflect.getOwnMetadata("inject_params", target) || []

  const params = tokens.map((token: any, index: number) => {
    const injectedParam = injectParams.find(
      (param: any) => param?.index === index
    )
    if (injectedParam) {
      return container.resolve(injectedParam?.token)
    }
    return container.resolve(token)
  })

  if (params?.length === 0) {
    const params = injectParams.map((param: any) =>
      container.resolve(param?.token)
    )
    return params
  }

  return params
}

export function methodWrapper(method: any, controllerClass: object): any {
  return function (...args: any[]) {
    const dependencies: object[] = resolveDependencies(controllerClass)

    if (isClass(controllerClass)) {
      const ObjClass = controllerClass
      const controllerInstance = new ObjClass(...dependencies)

      return method.apply(controllerInstance, args)
    }
  }
}
