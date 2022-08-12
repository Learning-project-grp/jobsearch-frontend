import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Box } from '@chakra-ui/react'
import FormInput from 'components/Form/FormInput'
import Button from 'components/Button'
import useLogin, { LoginData } from 'hooks/auth/useLogin'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import useJwtToken from 'hooks/useJwtToken'
import withNoSSR from 'hoc/withNoSSR'

type Props = {}

type FormValues = LoginData

const LoginPage = (props: Props) => {
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
      await backToHomePage()
    } else {
      setMounted(true)
    }
  }

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    await mutateAsync(values)
    await backToHomePage()
  }

  const backToHomePage = async () => {
    await Router.replace('/')
  }

  if (!mounted) return null

  return (
    <Box p="4" maxW="container.md" m="auto">
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
  )
}

export default withNoSSR(LoginPage) 
