import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Box } from '@chakra-ui/react'
import FormInput from 'components/Form/FormInput'
import Button from 'components/Button'
import useLogin, { LoginData } from 'hooks/auth/useLogin'

type Props = {}

type FormValues = LoginData

const LoginPage = (props: Props) => {
  const { mutateAsync, isLoading } = useLogin()

  const formMethods = useForm<FormValues>()
  const { handleSubmit } = formMethods

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    await mutateAsync(values)
  }

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

export default LoginPage
