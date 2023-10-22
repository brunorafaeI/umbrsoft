import log4js from 'log4js'
import config from './config'
import layouts from './layouts'

layouts.forEach(layout => { log4js.addLayout(layout.name, layout.fallback) })
log4js.configure(config)

export const SystemLogger = log4js.getLogger('[SYSTEM]')
export const AppLogger = log4js.getLogger('[ACCESS]')
