import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  HStack,
  Radio,
  useColorModeValue,
} from '@chakra-ui/react'
import FormInput from 'components/Form/FormInput'
import Button from 'components/Button'
import FormRadioGroup from 'components/Form/FormRadioGroup'
import useRegister, { RegisterData } from 'hooks/auth/useRegister'
import Router from 'next/router'

type Props = {}

type FormValues = RegisterData & { confirmPassword: string }

const RegisterPage = (props: Props) => {
  const { mutateAsync, isLoading } = useRegister()

  const formMethods = useForm<FormValues>()
  const { handleSubmit, watch } = formMethods

  const passwordField = watch('password')

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const { confirmPassword, ...restValues } = values
    await mutateAsync({ ...restValues, role: 'User' })
    Router.push('/login')
  }

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack
        spacing={20}
        mx={'auto'}
        w={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
        py={20}
        px={24}
      >
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign up</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>

        <Box
          rounded={'2xl'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box display="flex">
                <FormInput
                  name="firstName"
                  label="First Name"
                  containerProps={{ mr: '4' }}
                  isRequired
                />
                <FormInput name="lastName" label="Last Name" isRequired />
              </Box>

              <FormInput name="email" type="email" label="Email" isRequired />
              <FormInput
                name="password"
                type="password"
                autoComplete="new-password"
                label="Password"
                isRequired
                rules={{
                  minLength: {
                    value: 6,
                    message: 'Password must have at least 6 characters',
                  },
                }}
              />
              <FormInput
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                isRequired
                rules={{
                  validate: (value) =>
                    value === passwordField || 'The passwords do not match',
                }}
              />
              <FormInput
                name="dob"
                type="date"
                label="Date Of Birth"
                isRequired
              />
              <FormInput name="mobileNo" label="Phone Number" isRequired />
              <FormRadioGroup name="gender" label="Gender" isRequired>
                <HStack>
                  <Radio value="male">Male</Radio>
                  <Radio value="unknown">Unknown</Radio>
                  <Radio value="female">Female</Radio>
                </HStack>
              </FormRadioGroup>
              <FormInput name="address" label="Address" isRequired />
              <Box display="flex">
                <FormInput
                  name="addressCity"
                  label="City"
                  containerProps={{ mr: '4' }}
                  isRequired
                />
                <FormInput
                  name="addressPostalCode"
                  label="Postal Code"
                  isRequired
                />
              </Box>
              <Box display="flex">
                <FormInput
                  name="addressState"
                  label="State"
                  containerProps={{ mr: '4' }}
                  isRequired
                />
                <FormInput name="addressCountry" label="Country" isRequired />
              </Box>
              <Button
                mt={4}
                colorScheme="primary"
                isLoading={isLoading}
                type="submit"
              >
                Register
              </Button>
            </form>
          </FormProvider>
        </Box>
      </Stack>
    </Flex>
  )
}

export default RegisterPage
