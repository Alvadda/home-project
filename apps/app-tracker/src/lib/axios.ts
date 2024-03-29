import axios from 'axios'

import { env } from '../util/env'

export const axiosInstance = axios.create({
  baseURL: env.API,
})
