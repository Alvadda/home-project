import activeWin from 'active-win'

import config from './config.json'

type ActiveWindow = Awaited<ReturnType<typeof activeWin>>
type WindowConfig = (typeof config)[number]
type CurrentTrackingWindow = {
  startDate: Date
  detail?: string
  window: ActiveWindow
}
type TrackedWindow = CurrentTrackingWindow & {
  endDate: Date
}

const trackedWindowList: TrackedWindow[] = []

let currentTrackingWindow: CurrentTrackingWindow | undefined

const getConfigForWindow = (name: string) => config.find((app) => app.name === name)

const isNewWindowActive = (window: ActiveWindow, config: WindowConfig) => {
  if (currentTrackingWindow.window.owner.name !== window.owner.name) return true
  const detail = getWindowDetail(window, config)
  if (currentTrackingWindow.detail !== detail) return true

  return false
}

const getWindowDetail = (window: ActiveWindow, config: WindowConfig) => config.details.find((detail) => window.title.includes(detail))

const stopTracking = () => {
  console.log('Stop Tracking:', currentTrackingWindow.window.owner.name, currentTrackingWindow.detail)
  trackedWindowList.push({
    ...currentTrackingWindow,
    endDate: new Date(),
  })

  currentTrackingWindow = undefined
}

const startTracking = (window: ActiveWindow, config: WindowConfig) => {
  if (config.details.length === 0) {
    console.log('Start Tracking:', window.owner.name)
    return (currentTrackingWindow = {
      startDate: new Date(),
      window: window,
    })
  }

  const detail = getWindowDetail(window, config)
  if (detail) {
    console.log('Start Tracking:', window.owner.name, detail)
    return (currentTrackingWindow = {
      startDate: new Date(),
      window: window,
      detail,
    })
  }
}

const checkCurrentOpenWindow = async () => {
  const window = await activeWin()

  if (!window) return

  const configForWindow = getConfigForWindow(window.owner.name)

  if (!configForWindow) {
    if (!currentTrackingWindow) return
    return stopTracking()
  }

  if (!currentTrackingWindow) return startTracking(window, configForWindow)

  if (isNewWindowActive(window, configForWindow)) {
    stopTracking()
    startTracking(window, configForWindow)
  }
}

const intervalId = setInterval(checkCurrentOpenWindow, 1000)

process.on('SIGINT', () => {
  console.log(trackedWindowList)
  clearInterval(intervalId)
  process.exit()
})
