import { useMutation, useQueryClient } from '@tanstack/react-query'
import Axios from 'utils/axios'
import { Education } from './useGetEducation'
import Toast from 'components/Toast'

type UpdateEducationData = Education

type UpdateEducationResponse = {}

const updateEducation = (
  data: UpdateEducationData
): Promise<UpdateEducationResponse> => {
  return Axios.put('/edu', data)
}

const useUpdateEducation = () => {
  const queryClient = useQueryClient()

  return useMutation(updateEducation, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['education', { id: variables.userId }])
      Toast.success({ title: 'Updated successfully' })
    },
  })
}

export default useUpdateEducation
