import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createStandaloneToast } from '@chakra-ui/toast'

import BaseLayout from 'layouts/BaseLayout'
import { theme } from 'theme'
import RouteGuard from 'components/RouteGuard'

const { ToastContainer } = createStandaloneToast()

// Create a client
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BaseLayout>
          {(Component as any).requiredAuth ? (
            <RouteGuard>
              <Component {...pageProps} />
            </RouteGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </BaseLayout>
        <ToastContainer />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
