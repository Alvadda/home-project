import { axiosInstance } from '../lib/axios'
import { Application, applicationSchema } from '../types'

export const getApplications = async (): Promise<Application[]> => {
  const { data } = await axiosInstance.get<unknown>('application')

  return applicationSchema.array().parse(data)
}
