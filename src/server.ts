import { SystemLogger } from '@/common/libs/log4js'
import { getenv } from '@/common/libs/dotenv'
import AppServer from '@/infra/frameworks/fastify/app'
// import AppServer from '@/infra/frameworks/express/app'

const APP_PORT = getenv('APP_PORT', 8080)

AppServer.listen(
  {
    host: '0.0.0.0',
    port: APP_PORT
  },
  () => { SystemLogger.info(`Server listening on port ${APP_PORT}`) }
)
