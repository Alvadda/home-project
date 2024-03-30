import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { UsageChart } from '@/features/app-usage'

const queryClient = new QueryClient()
export const App = () => (
  <QueryClientProvider client={queryClient}>
    <UsageChart />
  </QueryClientProvider>
)
