import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {type  ReactNode, useState } from 'react'

type AppQueryProviderProps = {
  children: ReactNode
}

export default function AppQueryProvider(props: AppQueryProviderProps) {
  const { children } = props

  const [client] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}