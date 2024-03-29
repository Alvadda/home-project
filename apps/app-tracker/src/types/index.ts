import { z } from 'zod'

export const stringToDateSchema = z.string().transform((str) => {
  const date = new Date(str)
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format')
  }
  return date
})

export const applicationSchema = z.object({
  id: z.number(),
  processName: z.string(),
  titleDetail: z.string().nullish(),
  color: z.string(),
})

export type Application = z.infer<typeof applicationSchema>

export const sessionSchema = z.object({
  id: z.number(),
  applicationId: z.number(),
  duration: z.number(),
  startTime: stringToDateSchema,
  endTime: stringToDateSchema,
})

export type Session = z.infer<typeof sessionSchema>
export type PostSession = Pick<Session, 'endTime' | 'startTime'>
