import axios from 'axios'

import { env } from '@/utils/env'

export const axiosInstance = axios.create({
  baseURL: env.VITE_API,
})
