class Container {
  private static instance: Container
  private readonly dependencies = new Map()

  private constructor() {}

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container()
    }
    return Container.instance
  }

  register<T>(token: any, instance: T): void {
    this.dependencies.set(token, instance)
  }

  resolve<T>(token: any): T {
    const dependency = this.dependencies.get(token)
    if (!dependency) {
      throw new Error(`No dependency found for token: ${token}`)
    }
    return dependency
  }
}

export const container = Container.getInstance()
