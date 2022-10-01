import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import FormInput from 'components/common/Form/FormInput'
import Button from 'components/common/Button'
import useLogin, { LoginData } from 'hooks/auth/useLogin'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useJwtToken from 'hooks/useJwtToken'
import withNoSSR from 'hoc/withNoSSR'
import {
  Flex,
  Box,
  Stack,
  Link,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

type Props = {}

type FormValues = LoginData

const LoginPage = (props: Props) => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { mutateAsync, isLoading } = useLogin()
  const { token } = useJwtToken()
  const formMethods = useForm<FormValues>()
  const { handleSubmit } = formMethods

  useEffect(() => {
    checkIsLoggedIn()
  }, [])

  const checkIsLoggedIn = async () => {
    if (token) {
      await backToHomePageOrPrevPage()
    } else {
      setMounted(true)
    }
  }

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    await mutateAsync(values)
    await backToHomePageOrPrevPage()
  }

  const backToHomePageOrPrevPage = async () => {
    const returnUrl = (router.query.returnUrl as string) || '/'
    await router.replace(returnUrl)
  }

  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} w={'xl'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput name="email" type="email" label="Email" isRequired />
              <FormInput
                name="password"
                type="password"
                label="Password"
                isRequired
              />
              <Button
                mt={4}
                colorScheme="primary"
                isLoading={isLoading}
                type="submit"
              >
                Login
              </Button>
            </form>
          </FormProvider>
        </Box>
      </Stack>
    </Flex>
  )
}

export default withNoSSR(LoginPage)
