import ProfileLayout from 'components/Profile/ProfileLayout'
import React, { useEffect } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Flex, Box, Stack, VStack, StackDivider } from '@chakra-ui/react'
import FormInput from 'components/Form/FormInput'
import Button from 'components/Button'
import useGetEducation, { Education } from 'hooks/education/useGetEducation'
import useCreateEducation from 'hooks/education/useCreateEducation'
import useUpdateEducation from 'hooks/education/useUpdateEducation'
import useDeleteEducation from 'hooks/education/useDeleteEducation'
import useAuthStore from 'stores/authStore'
import Spinner from 'components/common/Spinner'

type Props = {}

type FormValues = {
  educations: Education[]
}

const Education = (props: Props) => {
  const userInfo = useAuthStore((state) => state.userInfo)
  const formMethods = useForm<FormValues>()
  const { control, reset, getValues } = formMethods
  const { fields, prepend } = useFieldArray({
    control,
    name: 'educations',
    keyName: 'key',
  })

  const { data, isSuccess, isLoading } = useGetEducation({ id: '1' })

  const {
    mutateAsync: createMutateAsync,
    isLoading: isCreating,
    variables: createVariables,
  } = useCreateEducation()
  const {
    mutateAsync: updateMutateAsync,
    isLoading: isUpdating,
    variables: updateVariables,
  } = useUpdateEducation()
  const {
    mutateAsync: deleteMutateAsync,
    isLoading: isDeleting,
    variables: deleteVariables,
  } = useDeleteEducation()

  useEffect(() => {
    if (isSuccess && Array.isArray(data)) {
      reset({
        educations: data,
      })
    }
  }, [isSuccess, data])

  const handleSaveEducation = (index: number) => {
    const { educations } = getValues()
    const currentEducation = educations[index]

    if (userInfo?.userId)
      createMutateAsync({ ...currentEducation, userId: userInfo?.userId })
  }

  const handleUpdateEducation = (index: number) => {
    const { educations } = getValues()
    const currentExperience = educations[index]

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
                    university: '',
                    qualification: '',
                    fieldOfStudy: '',
                    grade: '',
                    graduationDate: '',
                    description: '',
                    id: '',
                    userId: '',
                    uniqKey: new Date().toISOString(),
                  } as Education)
                }
                mb="4"
              >
                Add New Education
              </Button>

              {isLoading ? (
                <Spinner isCentered />
              ) : (
                <VStack alignItems="flex-start" divider={<StackDivider />}>
                  {fields.map((field, index) => {
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
                                ? handleUpdateEducation(index)
                                : handleSaveEducation(index)
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

export default Education
