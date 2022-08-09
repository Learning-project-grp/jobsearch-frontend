import { Box } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import Header from './Header'

interface Props {}

const BaseLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <Box maxWidth="container.xl" bg="gray.50" m="auto">
      <Box
        bg="gray.50"
        position="fixed"
        right="0"
        left="0"
        top="0"
        zIndex="2"
        shadow='sm'
      >
        <Box maxW="container.xl" m="auto">
          <Header />
        </Box>
      </Box>
      <Box mt="80px" >{children}</Box>
    </Box>
  )
}

export default BaseLayout
