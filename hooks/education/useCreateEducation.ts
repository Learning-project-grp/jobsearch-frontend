import { Education } from './useGetEducation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Axios from 'utils/axios'
import Toast from 'components/Toast'

type CreateEducationData = Education

const createEducation = (
  data: CreateEducationData
): Promise<CreateEducationData> => {
  return Axios.post('/edu', data)
}

const useCreateEducation = () => {
  const queryClient = useQueryClient()

  return useMutation<CreateEducationData, any, CreateEducationData>(
    createEducation,
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['education', { id: variables.userId }])
        Toast.success({ title: 'Saved successfully' })
      },
    }
  )
}

export default useCreateEducation
