import ProfileLayout from 'components/Profile/ProfileLayout'
import React, { useEffect } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Flex, Box, Stack, VStack, StackDivider } from '@chakra-ui/react'
import FormInput from 'components/common/Form/FormInput'
import Button from 'components/common/Button'
import useGetExperience, { Experience } from 'hooks/experience/useGetExperience'
import useCreateExperience from 'hooks/experience/useCreateExperience'
import useDeleteExperience from 'hooks/experience/useDeleteExperience'
import useAuthStore from 'stores/authStore'
import useUpdateExperience from 'hooks/experience/useUpdateExperience'
import Spinner from 'components/common/Spinner'

type Props = {}

type FormValues = {
  experiences: Experience[]
}

const ExperiencesPage = (props: Props) => {
  const userInfo = useAuthStore((state) => state.userInfo)
  const formMethods = useForm<FormValues>({
    defaultValues: {
      experiences: [],
    },
  })
  const { control, reset, getValues } = formMethods

  const { fields, prepend } = useFieldArray({
    control,
    name: 'experiences',
    keyName: 'key',
  })

  const { data, isSuccess, isLoading } = useGetExperience({
    id: userInfo?.userId,
  })

  const {
    mutateAsync,
    isLoading: isCreating,
    variables: createVariables,
  } = useCreateExperience()
  const {
    mutateAsync: updateMutateAsync,
    isLoading: isUpdating,
    variables: updateVariables,
  } = useUpdateExperience()
  const {
    mutateAsync: deleteMutateAsync,
    isLoading: isDeleting,
    variables: deleteVariables,
  } = useDeleteExperience()

  useEffect(() => {
    if (isSuccess && Array.isArray(data)) {
      reset({
        experiences: data,
      })
    }
  }, [isSuccess, data])

  const handleSaveExperience = (index: number) => {
    const { experiences } = getValues()
    const currentExperience = experiences[index]

    if (userInfo?.userId)
      mutateAsync({ ...currentExperience, userId: userInfo?.userId })
  }

  const handleUpdateExperience = (index: number) => {
    const { experiences } = getValues()
    const currentExperience = experiences[index]

    updateMutateAsync(currentExperience)
  }

  return (
    <ProfileLayout>
      <Flex align={'center'} justify={'center'}>
        <Stack spacing={20} mx={'auto'} w={'100%'} px={4}>
          <FormProvider {...formMethods}>
            <form>
              <Button
                colorScheme="primary"
                onClick={() =>
                  prepend({
                    positionTitle: '',
                    positionLevel: '',
                    companyName: '',
                    salary: '',
                    durationFrom: '',
                    durationTo: '',
                    description: '',
                    id: '',
                    userId: '',
                    uniqKey: new Date().toISOString(),
                  } as Experience)
                }
                mb="4"
              >
                Add New Experience
              </Button>
              {isLoading ? (
                <Spinner isCentered />
              ) : (
                <VStack alignItems="flex-start" divider={<StackDivider />}>
                  {fields?.map((field, index) => {
                    const isCreatingCurrentItem =
                      isCreating &&
                      (createVariables as any).uniqKey ===
                        (field as any).uniqKey
                    const isUpdatingCurrentItem =
                      isUpdating && field.id === updateVariables?.id
                    const isDeletingCurrentItem =
                      isDeleting && field.id === deleteVariables
                    return (
                      <Box pt={4} key={field.key} w="full">
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

                        <FormInput
                          name={`experiences.${index}.description`}
                          label="Description"
                          isRequired
                        />

                        <Box my={4}>
                          <Button
                            mt={4}
                            mr={4}
                            colorScheme="secondary"
                            isLoading={
                              isCreatingCurrentItem || isUpdatingCurrentItem
                            }
                            onClick={() => {
                              field.id
                                ? handleUpdateExperience(index)
                                : handleSaveExperience(index)
                            }}
                          >
                            {field.id ? 'Update' : 'Save'}
                          </Button>
                          <Button
                            mt={4}
                            colorScheme="red"
                            variant="ghost"
                            isLoading={isDeletingCurrentItem}
                            onClick={() => {
                              deleteMutateAsync(field.id)
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    )
                  })}
                </VStack>
              )}
            </form>
          </FormProvider>
        </Stack>
      </Flex>
    </ProfileLayout>
  )
}

export default ExperiencesPage
