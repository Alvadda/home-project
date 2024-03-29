import { z } from 'zod'

const envSchema = z.object({
  API: z.string(),
})

export const env = envSchema.parse(process.env)
