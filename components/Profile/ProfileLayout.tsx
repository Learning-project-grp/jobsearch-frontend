import {
  Avatar,
  Box,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

type Props = {}

const ProfileLayout = ({ children }: PropsWithChildren<Props>) => {
  const submenu = [
    { name: 'Experience', icon: '', to: '/profile/Experience' },
    { name: 'Education', icon: '', to: '/profile/Education' },
    { name: 'Skills', icon: '' },
    { name: 'Languages', icon: '' },
    { name: 'Additional Info', icon: '' },
    { name: 'About Me', icon: '' },
    { name: 'Uploaded Resume', icon: '' },
    { name: 'Privacy Setting', icon: '' },
  ]

  return (
    <Flex gap={6} pt={10} px={{ sm: '2', md: '8', xl: 'none' }}>
      {/* Submenu */}
      <Box
        display={{ base: 'none', lg: 'block' }}
        w={'30%'}
        rounded={'2xl'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'md'}
        py={10}
      >
        <Link _hover={{ underline: 'false' }}>
          <Flex
            h="20"
            alignItems="center"
            gap={10}
            px={8}
            _hover={{ bgColor: 'gray.50' }}
          >
            <Avatar />
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Your Name
              </Text>
              <Text fontSize="md" color="gray.500">
                View my profile
              </Text>
            </Box>
          </Flex>
        </Link>

        {submenu.map((submenu) => (
          <Link _hover={{ underline: 'false' }} href={submenu.to}>
            <Flex pl={8} py={2} w={'full'} _hover={{ bgColor: 'gray.50' }}>
              {/* <Icon /> */}
              <Text>{submenu.name}</Text>
            </Flex>
          </Link>
        ))}
      </Box>

      {/* TODD: submenu in sm and md screen */}

      {/* Content */}
      <Box
        w={{ sm: 'full', lg: '70%' }}
        rounded={'2xl'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'md'}
        py={10}
        px={4}
      >
        {children}
      </Box>
    </Flex>
  )
}

export default ProfileLayout
