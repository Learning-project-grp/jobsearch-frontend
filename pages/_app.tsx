import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import BaseLayout from 'layouts/BaseLayout'
import { theme } from 'theme'

// Create a client
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
