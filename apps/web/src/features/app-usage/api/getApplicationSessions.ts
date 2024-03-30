import { ApplicationWithSessions, applicationWithSessionsSchema } from '@/types'
import { parseDateForUrl } from '@/utils/parseDateForUrl'

import { axiosInstance } from '../../../lib/axios'

export const getApplicationSessions = async (startDate: Date, endDate: Date): Promise<ApplicationWithSessions[]> => {
  const { data } = await axiosInstance.get<unknown>(
    `application/sessions/period?startDate=${parseDateForUrl(startDate)}&endDate=${parseDateForUrl(endDate)}`
  )

  return applicationWithSessionsSchema.array().parse(data)
}
