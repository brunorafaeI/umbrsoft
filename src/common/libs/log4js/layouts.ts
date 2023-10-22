import { type LoggingEvent } from 'log4js'

export default [
  {
    name: 'custom',
    fallback: (config: any) => {
      return ({ categoryName, level, startTime, data }: LoggingEvent) => {
        const { levelStr } = level

        return `[${startTime.toISOString()}] ${categoryName} [${levelStr}]: ${data.join(' ')}`
      }
    }
  }
]
