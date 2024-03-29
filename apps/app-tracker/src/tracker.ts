import activeWin from 'active-win'

import { getApplications } from './api/getApplications'
import { postSession } from './api/postSession'
import { Application } from './types'

type ActiveWindow = NonNullable<Awaited<ReturnType<typeof activeWin>>>

type CurrentTrackedApp = {
  startTime: Date
  applicationId: number
}

let currentTrackedApp: CurrentTrackedApp | undefined

const getApplicationId = (window: ActiveWindow, apps: Application[]) => {
  return apps.find((app) => {
    const trackableApp = app.processName === window.owner.name

    if (!trackableApp) return false

    if (!app.titleDetail) return true

    return window.title.includes(app.titleDetail)
  })?.id
}

const startNewTracking = (appId: number) => {
  console.log('Start Tracking: ', appId)
  currentTrackedApp = {
    applicationId: appId,
    startTime: new Date(),
  }
}

const stopTracking = async () => {
  if (!currentTrackedApp) return

  console.log('Stop Tracking: ', currentTrackedApp.applicationId)

  await postSession(currentTrackedApp.applicationId, { startTime: currentTrackedApp.startTime, endTime: new Date() })
  currentTrackedApp = undefined
}

const init = async () => {
  const appsToTrack = await getApplications()

  console.log('Start Tracker for: ', appsToTrack)

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

  setInterval(track, 5000)
}

init()
