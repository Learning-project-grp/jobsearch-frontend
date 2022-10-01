import { useMutation, useQueryClient } from '@tanstack/react-query'
import Axios from 'utils/axios'
import { Experience } from './useGetExperience'
import Toast from 'components/common/Toast'

type CreateExperienceData = Omit<Experience, 'id' | 'createTime' | 'updateTime'>

const createExperience = (
  data: CreateExperienceData
): Promise<CreateExperienceData> => {
  return Axios.post('/exp', data)
}

const useCreateExperience = () => {
  const queryClient = useQueryClient()

  return useMutation<CreateExperienceData, any, CreateExperienceData>(
    createExperience,
    {
      onSuccess: (data, variables) => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['experience', { id: variables.userId }])
        Toast.success({ title: 'Saved successfully' })
      },
    }
  )
}

export default useCreateExperience
