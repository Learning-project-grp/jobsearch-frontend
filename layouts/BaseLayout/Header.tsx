import { Box, HStack } from '@chakra-ui/react'
import Button from 'components/Button'
import LogoIcon from 'icons/LogoIcon'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'

type Props = {}

const Header = (props: Props) => {
  const menus = [
    {
      label: 'Job search',
      to: '/job-search',
    },
    {
      label: 'MyJobStreet',
      to: '/myjobstreet',
    },
    {
      label: 'Company profiles',
      to: '/company-profiles',
    },
    {
      label: 'Career advice',
      to: '/career-advice',
    },
  ]

  return (
    <HStack
      spacing="8"
      justifyContent="space-between"
      bg="gray.50"
      py="5"
      px="4"
    >
      <HStack spacing="8">
        <LogoIcon fontSize="xl" w="40" />
        {menus.map((menu) => (
          <Box key={menu.label} _hover={{ color: '#0d3880' }}>
            <Link href={menu.to}>{menu.label}</Link>
          </Box>
        ))}
      </HStack>
      <HStack>
        <Button colorScheme='primary' variant="outline" onClick={() => Router.push('/login')}>Login</Button>
        <Button colorScheme='primary' onClick={() => Router.push('/register')}>Register</Button>
      </HStack>
    </HStack>
  )
}

export default Header
