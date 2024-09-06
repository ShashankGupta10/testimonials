'use client'
import { ClerkProvider } from '@clerk/nextjs'
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function makeQueryClient() {
  return new QueryClient()
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <ClerkProvider
      signUpFallbackRedirectUrl={'/'}
      signInFallbackRedirectUrl={'/dashboard'}
      signInUrl='/sign-in'
      signUpUrl='/sign-up'
      
    >
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        {children}
      </QueryClientProvider>
    </ClerkProvider>
  )
}
