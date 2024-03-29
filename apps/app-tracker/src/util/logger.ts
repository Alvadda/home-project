import { format } from 'date-fns'

import { env } from './env'

export class Logger {
  private isDev = false

  constructor() {
    this.isDev = env.MODE === 'dev'
  }

  log(message?: any, ...optionalParams: any[]) {
    if (!this.isDev) return

    console.log('[APP-TRACKER] -', format(new Date(), 'HH:mm:ss'), '-', message, ...optionalParams)
  }
}
