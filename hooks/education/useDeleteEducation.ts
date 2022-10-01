import useAuthStore from 'stores/authStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Axios from 'utils/axios'
import Toast from 'components/Toast'

const deleteEducation = (id: string): Promise<string> => {
  return Axios.delete(`exp/${id}`)
}

const useDeleteEducation = () => {
  const userInfo = useAuthStore((state) => state.userInfo)
  const queryClient = useQueryClient()
  return useMutation(deleteEducation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['education', { id: userInfo?.userId }])
      Toast.success({ title: 'Education deleted' })
    },
  })
}

export default useDeleteEducation
