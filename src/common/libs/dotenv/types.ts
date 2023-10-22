export type TGetEnvReturn = string | boolean | number

export type TGetEnvFunction<T extends TGetEnvReturn> = (
  env: string,
  fallback?: T
) => T | undefined

export interface IGetEnv {
  <T extends TGetEnvReturn = string>(env: string, fallback?: T): T

  bool: TGetEnvFunction<boolean>
  float: TGetEnvFunction<number>
  int: TGetEnvFunction<number>
  str: TGetEnvFunction<string>
}
