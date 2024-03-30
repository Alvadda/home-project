import { z } from 'zod'

const envSchema = z.object({
  VITE_API: z.string(),
})

console.log(import.meta.env)

export const env = envSchema.parse(import.meta.env)
