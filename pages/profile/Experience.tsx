import ProfileLayout from 'components/Profile/ProfileLayout'
import React, { useEffect } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Flex, Box, Stack, Select, FormLabel } from '@chakra-ui/react'
import FormInput from 'components/Form/FormInput'
import Button from 'components/Button'
import useGetExperience, { Experience } from 'hooks/experience/useGetExperience'
import useCreateExperience from 'hooks/experience/useCreateExperience'
import useDeleteExperience from 'hooks/experience/useDeleteExperience'

type Props = {}

type FormValues = {
  experiences: Experience[]
}

const Experience = (props: Props) => {
  const formMethods = useForm<FormValues>()
  const { handleSubmit, watch, control, reset, getValues } = formMethods

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'experiences',
    }
  )

  const { data, isSuccess, isLoading } = useGetExperience({ id: '1' })
  const { mutateAsync } = useCreateExperience()
  const { mutateAsync: deleteMutateAsync } = useDeleteExperience()

  useEffect(() => {
    isSuccess && reset({ experiences: data })
  }, [isSuccess])

  const handleSaveExperience = (index: number) => {
    const { experiences } = getValues()
    const currentExperience = experiences[index]

    mutateAsync(currentExperience)
  }
  return (
    <ProfileLayout>
      <Flex align={'center'} justify={'center'}>
        <Stack spacing={20} mx={'auto'} w={'100%'} py={8} px={8}>
          <FormProvider {...formMethods}>
            <form onSubmit={() => {}}>
              {fields.map((field, index) => (
                <Box pt={4} key={field.id}>
                  <FormInput
                    name={`experiences.${index}.positionTitle`}
                    label="Position Title"
                    isRequired
                  />

                  <FormInput
                    name={`experiences.${index}.positionLevel`}
                    label="Position Level"
                    isRequired
                  />
                  <FormInput
                    name={`experiences.${index}.companyName`}
                    label="Company Name"
                    isRequired
                  />
                  <FormInput
                    name={`experiences.${index}.salary`}
                    label="Salary"
                    isRequired
                  />

                  <Box display="flex">
                    <FormInput
                      name={`experiences.${index}.durationFrom`}
                      type="date"
                      label="Joined Duration"
                      isRequired
                    />

                    <FormInput
                      ml={4}
                      name={`experiences.${index}.durationTo`}
                      type="date"
                      isRequired
                    />
                  </Box>

                  <Box mb={4}>
                    <FormLabel
                      mb="1"
                      htmlFor={`experiences.${index}.durationTo`}
                    >
                      Specialization
                      <Box color="red.500" ml="1" as="span">
                        *
                      </Box>
                    </FormLabel>
                    <Select
                      name="specialization"
                      placeholder="Select specialization"
                    >
                      <option value="option1">Specialization 1</option>
                      <option value="option2">Specialization 2</option>
                      <option value="option3">Specialization 3</option>
                    </Select>
                  </Box>

                  <FormInput
                    name={`experiences.${index}.description`}
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
                        onClick={() => append({} as Experience)}
                      >
                        Add New
                      </Button>
                    )}

                    <Button
                      mt={4}
                      mr={4}
                      colorScheme="primary"
                      // isLoading={isLoading}
                      onClick={() => {
                        handleSaveExperience(index)
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      mt={4}
                      colorScheme="secondary"
                      // isLoading={isLoading}
                      onClick={() => {
                        deleteMutateAsync(field.id)
                      }}
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

export default Experience
