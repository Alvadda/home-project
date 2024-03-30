import Chart from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'

import { useAppsWithSessions } from '../hooks/useAppsWithSessions'

Chart.register()

export const UsageChart = () => {
  const { data } = useAppsWithSessions()

  const mappedData = data?.map((app) => ({
    name: `${app.processName} - ${app.titleDetail}`,
    duration: app.sessions.reduce((acc, curr) => acc + curr.duration, 0),
    color: app.color,
  }))

  return (
    <div className="w-svw flex h-svh flex-col items-center justify-center">
      <div className="w-1/3">
        <Doughnut
          data={{
            labels: mappedData?.map((d) => d.name),
            datasets: [
              {
                label: 'Time Spend in Application:',
                data: mappedData?.map((d) => d.duration / 60 / 60),
                backgroundColor: mappedData?.map((d) => d.color),
              },
            ],
          }}
        />
      </div>
    </div>
  )
}
