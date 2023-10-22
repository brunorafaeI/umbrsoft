import { type IGetEnv } from './types'
import {
  getEnv,
  getEnvBoolean,
  getEnvFloat,
  getEnvInteger,
  getEnvString
} from './getenv'

export const getenv = getEnv as IGetEnv

getenv.bool = getEnvBoolean
getenv.float = getEnvFloat
getenv.int = getEnvInteger
getenv.str = getEnvString
