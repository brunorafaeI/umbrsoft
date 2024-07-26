import "reflect-metadata"

import { container } from "@/frameworks/dependency/container"
import { isConstructor } from "@/common/utils/class"

export function Injectable() {
  return (target: object) => {
    if (isConstructor(target)) {
      const dependencies: [] = resolveDependencies(target)
      const TargetClass = target

      const targetInstance: Record<string, string> = new TargetClass(
        ...dependencies
      )

      container.register(TargetClass.name, targetInstance)
    }
  }
}

export function Inject(token: string | symbol) {
  return (target: object, _: any, index: number) => {
    const existingInjectedParams =
      Reflect.getOwnMetadata("inject_params", target) || []
    existingInjectedParams.push({ index, token })
    Reflect.defineMetadata("inject_params", existingInjectedParams, target)
  }
}

export function resolveDependencies<T>(target: object): T {
  const tokens = Reflect.getMetadata("design:paramtypes", target) || []
  const injectParams = Reflect.getOwnMetadata("inject_params", target) || []

  const params = tokens.map((token: any, index: number) => {
    const injectedParam = injectParams.find(
      (param: any) => param.index === index
    )
    if (injectedParam) {
      return this.resolve(injectedParam.token)
    }
    return this.resolve(token)
  })

  if (params.length === 0) {
    const params = injectParams.map((param: any) =>
      container.resolve(param.token)
    )
    return params
  }

  return params
}

export function methodWrapper(method: any, controllerClass: object): any {
  return function (...args: any[]) {
    const dependencies: object[] = resolveDependencies(controllerClass)

    if (isConstructor(controllerClass)) {
      const ObjClass = controllerClass
      const controllerInstance = new ObjClass(...dependencies)
      return method.apply(controllerInstance, args)
    }
  }
}
