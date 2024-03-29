import { axiosInstance } from '../lib/axios'
import { PostSession, Session, sessionSchema } from '../types'

export const postSession = async (appId: number, session: PostSession): Promise<Session> => {
  const { data } = await axiosInstance.post<unknown>(`application/${appId}/sessions`, session)

  return sessionSchema.parse(data)
}
