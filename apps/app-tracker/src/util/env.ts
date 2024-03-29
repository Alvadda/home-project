import { z } from 'zod'

const envSchema = z.object({
  API: z.string(),
  MODE: z.enum(['dev', 'prod']),
})

export const env = envSchema.parse(process.env)
