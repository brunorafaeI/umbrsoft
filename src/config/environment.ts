import dotenv from 'dotenv'
import fs from 'node:fs'
import { join, resolve } from 'node:path'
import { KERNEL } from '@/config/kernel'
import { getenv } from '@/common/libs/dotenv'

export const APP_ENV = getenv('NODE_ENV', 'development')
export const checkEnvFile = (envPath: string): void => {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath })
  }
}

// Load the environment files
const PROJECT_DIR = join(KERNEL.project_dir, '..')

checkEnvFile(resolve(PROJECT_DIR, `.env.${APP_ENV}`))
checkEnvFile(resolve(PROJECT_DIR, '.env.local'))
checkEnvFile(resolve(PROJECT_DIR, '.env'))
