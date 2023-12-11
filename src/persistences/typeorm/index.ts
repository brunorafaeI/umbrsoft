import 'dotenv/config'
import 'reflect-metadata'

import path from 'node:path'
import { DataSource } from 'typeorm'
import { getenv } from '@/common/libs/dotenv'
import { SystemLogger } from '@/common/libs/log4js'

const ENV_PROD = getenv('NODE_ENV') === 'production'

export const entityManager = new DataSource({
  type: 'postgres',
  url: getenv.str('DATABASE_URL'),
  entities: [path.resolve(__dirname, 'models', '**', '*.{ts,js}')],
  migrations: [path.resolve(__dirname, 'migrations', '**', '*.{ts,js}')],
  synchronize: false,
  logging: !ENV_PROD,
  migrationsRun: !ENV_PROD,
  maxQueryExecutionTime: 3000
})

entityManager.initialize()
  .then(() => { SystemLogger.info('') })
  .catch(err => { SystemLogger.error(err) })
