import useAuthStore from 'stores/authStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Axios from 'utils/axios'
import Toast from 'components/Toast'

const deleteExperience = (id: string): Promise<string> => {
  return Axios.delete(`exp/${id}`)
}

const useDeleteExperience = () => {
  const userInfo = useAuthStore((state) => state.userInfo)
  const queryClient = useQueryClient()
  return useMutation(deleteExperience, {
    onSuccess: () => {
      queryClient.invalidateQueries(['experience', { id: userInfo?.userId }])
      Toast.success({ title: 'Experience deleted' })
    },
  })
}

export default useDeleteExperience
