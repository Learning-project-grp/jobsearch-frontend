import { Box, HStack, VStack } from '@chakra-ui/react'
import Button from 'components/common/Button'
import LogoIcon from 'icons/LogoIcon'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useToggle } from 'react-use'
import { useEffect } from 'react'
import useJwtToken from 'hooks/useJwtToken'
import withNoSSR from 'hoc/withNoSSR'
import Toast from 'components/common/Toast'

type Props = {}

const Header = (props: Props) => {
  const router = useRouter()
  const [showMenu, toggleMenu] = useToggle(false)
  const { token, removeToken } = useJwtToken()

  useEffect(() => {
    router.events.on('routeChangeComplete', () => toggleMenu(false))

    return () => {
      router.events.off('routeChangeComplete', () => toggleMenu(false))
    }
  }, [router])

  const menus = [
    {
      label: 'Job search',
      to: '/job-search',
    },
    {
      label: 'MyJobStreet',
      to: '/profile/experience',
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

  const handleLogout = () => {
    removeToken()
    Toast.success({ title: 'Logged out successfully' })
    Router.push('/login')
  }
  return (
    <Box position="relative">
      <HStack
        spacing="8"
        justifyContent="space-between"
        bg="gray.50"
        py="2"
        px="4"
      >
        <HStack spacing="8">
          <LogoIcon
            fontSize="xl"
            w="40"
            onClick={() => Router.push('/')}
            _hover={{ cursor: 'pointer' }}
          />
          <HStack spacing="8" display={{ base: 'none', lg: 'flex' }}>
            {menus.map((menu) => (
              <Box key={menu.label} _hover={{ color: '#0d3880' }}>
                <Link href={menu.to}>{menu.label}</Link>
              </Box>
            ))}
          </HStack>
        </HStack>

        <HStack display={{ base: 'none', md: 'flex' }}>
          {token ? (
            <Button
              colorScheme="primary"
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                colorScheme="primary"
                variant="outline"
                onClick={() => Router.push('/login')}
              >
                Login
              </Button>
              <Button
                colorScheme="primary"
                onClick={() => Router.push('/register')}
              >
                Register
              </Button>
            </>
          )}
        </HStack>
        <Button
          display={{ base: 'flex', md: 'none' }}
          rightIcon={
            <Box
              transform={`rotate(${showMenu ? 180 : 0}deg)`}
              transition="transform ease-in-out 300ms"
            >
              <ChevronDownIcon width="25" height="25" />
            </Box>
          }
          variant="ghost"
          onClick={toggleMenu}
        >
          Menu
        </Button>
      </HStack>
      <HStack
        spacing="8"
        pt="5"
        borderTop="1px"
        borderColor="gray.200"
        py="5"
        px="4"
        display={{ base: 'none', md: 'flex', lg: 'none' }}
      >
        {menus.map((menu) => (
          <Box key={menu.label} _hover={{ color: '#0d3880' }}>
            <Link href={menu.to}>{menu.label}</Link>
          </Box>
        ))}
      </HStack>
      {showMenu && (
        <Box height="100vh" display={{ md: 'none' }}>
          <VStack spacing="8" alignItems="flex-start" p="4">
            {menus.map((menu) => (
              <Box key={menu.label} _hover={{ color: '#0d3880' }}>
                <Link href={menu.to}>{menu.label}</Link>
              </Box>
            ))}
          </VStack>
          <HStack
            borderTop="1px"
            borderBottom="1px"
            borderColor="gray.200"
            p="4"
            spacing="4"
          >
            {token ? (
              <Button
                colorScheme="primary"
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  colorScheme="primary"
                  variant="outline"
                  onClick={() => Router.push('/login')}
                >
                  Login
                </Button>
                <Button
                  colorScheme="primary"
                  onClick={() => Router.push('/register')}
                >
                  Register
                </Button>
              </>
            )}
          </HStack>
        </Box>
      )}
    </Box>
  )
}

export default withNoSSR(Header)
