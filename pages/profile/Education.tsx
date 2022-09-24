import ProfileLayout from 'components/Profile/ProfileLayout'
import React, { useEffect } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Flex, Box, Stack } from '@chakra-ui/react'
import FormInput from 'components/Form/FormInput'
import Button from 'components/Button'
import useGetEducation, { Education } from 'hooks/education/useGetEducation'

type Props = {}

type FormValues = {
  educations: Education[]
}

const Education = (props: Props) => {
  const formMethods = useForm<FormValues>()
  const { handleSubmit, watch, control, reset, getValues } = formMethods
  const { data, isSuccess, isLoading } = useGetEducation({ id: '1' })
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'educations',
    }
  )

  console.log('data', data)

  useEffect(() => {
    isSuccess && reset({ educations: data })
  }, [isSuccess])

  return (
    <ProfileLayout>
      <Flex align={'center'} justify={'center'}>
        <Stack spacing={20} mx={'auto'} w={'100%'} py={8} px={8}>
          <FormProvider {...formMethods}>
            <form onSubmit={() => {}}>
              {fields.map((field, index) => (
                <Box pt={4} key={field.id}>
                  <FormInput
                    name={`educations.${index}.university`}
                    label="University"
                    isRequired
                  />

                  <FormInput
                    name={`educations.${index}.qualification`}
                    label="Qualification"
                    isRequired
                  />
                  <FormInput
                    name={`educations.${index}.fieldOfStudy`}
                    label="Field of Study"
                    isRequired
                  />
                  <FormInput
                    name={`educations.${index}.grade`}
                    label="Grade"
                    isRequired
                  />

                  <FormInput
                    name={`educations.${index}.graduationDate`}
                    type="date"
                    label="Graduation Date"
                    isRequired
                  />

                  <FormInput
                    name={`educations.${index}.description`}
                    label="Description"
                    isRequired
                  />

                  <Box
                    my={4}
                    pb={8}
                    borderBottom={
                      index === fields.length - 1 ? 'none' : '1px solid #999'
                    }
                  >
                    {index === fields.length - 1 && (
                      <Button
                        mt={4}
                        mr={4}
                        variant="outline"
                        onClick={() => append({} as Education)}
                      >
                        Add New
                      </Button>
                    )}

                    <Button
                      mt={4}
                      mr={4}
                      colorScheme="primary"
                      // isLoading={isLoading}
                      onClick={() => {}}
                    >
                      Save
                    </Button>
                    <Button
                      mt={4}
                      colorScheme="secondary"
                      // isLoading={isLoading}
                      onClick={() => {}}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              ))}
            </form>
          </FormProvider>
        </Stack>
      </Flex>
    </ProfileLayout>
  )
}

export default Education
