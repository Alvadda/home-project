import activeWin from 'active-win'

import { getApplications } from './api/getApplications'
import { postSession } from './api/postSession'
import { Application } from './types'
import { Cache } from './util/cache'
import { Logger } from './util/logger'

type ActiveWindow = NonNullable<Awaited<ReturnType<typeof activeWin>>>

type CurrentTrackedApp = {
  startTime: Date
  applicationId: number
}

const cache = new Cache<number | undefined>()
const logger = new Logger()

let currentTrackedApp: CurrentTrackedApp | undefined

const getApplicationId = (window: ActiveWindow, apps: Application[]) => {
  const uniqKey = `${window.owner.name}/${window.title}`

  const fromCache = cache.get(uniqKey)
  if (fromCache) return fromCache

  const appId = apps.find((app) => {
    const trackableApp = app.processName === window.owner.name

    if (!trackableApp) return false

    if (!app.titleDetail) return true

    return window.title.includes(app.titleDetail)
  })?.id

  cache.set({ key: uniqKey, value: appId })
  return appId
}

const startNewTracking = (appId: number) => {
  logger.log('Start Tracking: ', appId)
  currentTrackedApp = {
    applicationId: appId,
    startTime: new Date(),
  }
}

const stopTracking = async () => {
  if (!currentTrackedApp) return

  logger.log('Stop Tracking: ', currentTrackedApp.applicationId)

  await postSession(currentTrackedApp.applicationId, { startTime: currentTrackedApp.startTime, endTime: new Date() })
  currentTrackedApp = undefined
}

const init = async () => {
  const appsToTrack = await getApplications()

  logger.log('Start Tracker for: ', appsToTrack)

  const track = async () => {
    const window = await activeWin()
    if (!window) return

    const appId = getApplicationId(window, appsToTrack)

    if (!appId) return stopTracking()

    if (currentTrackedApp && currentTrackedApp.applicationId === appId) return

    if (!currentTrackedApp) return startNewTracking(appId)

    await stopTracking()
    startNewTracking(appId)
  }

  setInterval(track, 1000)
}

init()
