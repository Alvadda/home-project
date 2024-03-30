import { useQuery } from '@tanstack/react-query'
import { endOfWeek, startOfWeek } from 'date-fns'

import { getApplicationSessions } from '../api/getApplicationSessions'

const TEN_MIN = 600000

export const useAppsWithSessions = () => {
  const startOfTheWeek = startOfWeek(new Date())
  const EndOfTheWeek = endOfWeek(new Date())

  return useQuery({
    queryKey: ['APPS_WITH_SESSION', startOfTheWeek, EndOfTheWeek],
    queryFn: () => getApplicationSessions(startOfTheWeek, EndOfTheWeek),
    staleTime: TEN_MIN,
  })
}
