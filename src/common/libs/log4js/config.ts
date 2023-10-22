export default {
  appenders: {
    stdout: {
      type: 'stdout'
    },
    system: {
      type: 'file',
      filename: 'tmp/logs/system.log',
      layout: {
        type: 'pattern',
        pattern: '[%d] %c [%p]: %m'
      },
      maxLogSize: 1024 ** 2,
      numBackups: 3
    },
    errorFile: {
      type: 'file',
      filename: 'tmp/logs/system-error.log'
    },
    errors: {
      type: 'logLevelFilter',
      level: 'error',
      appender: 'errorFile'
    },
    access: {
      type: 'dateFile',
      filename: 'tmp/logs/system-access.log',
      category: 'http',
      maxLogSize: 1024 ** 2,
      numBackups: 3,
      layout: {
        type: 'custom'
      }
    }
  },
  categories: {
    default: { appenders: ['system', 'stdout', 'errors'], level: 'all' },
    '[ACCESS]': { appenders: ['access'], level: 'info' }
  }
}
