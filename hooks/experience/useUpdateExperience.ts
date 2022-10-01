import { useMutation, useQueryClient } from '@tanstack/react-query'
import Axios from 'utils/axios'
import { Experience } from './useGetExperience'
import Toast from 'components/Toast'

type UpdateExperienceData = Experience

type UpdateExperienceResponse = {}

const updateExperience = (
  data: UpdateExperienceData
): Promise<UpdateExperienceResponse> => {
  return Axios.put('/exp', data)
}

const useUpdateExperience = () => {
  const queryClient = useQueryClient()

  return useMutation(updateExperience, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['experience', { id: variables.userId }])
      Toast.success({ title: 'Updated successfully' })
    },
  })
}

export default useUpdateExperience
