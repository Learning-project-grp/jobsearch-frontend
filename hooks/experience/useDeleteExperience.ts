import { useMutation } from '@tanstack/react-query'
import Axios from 'utils/axios'
import Toast from 'components/Toast'

const deleteExperience = (id: string): Promise<string> => {
  return Axios.post(`exp/${id}`, id)
}

const useDeleteExperience = () => {
  return useMutation<any, any, any>(deleteExperience, {
    onSuccess: () => {
      Toast.success({ title: 'Experience deleted' })
    },
  })
}

export default useDeleteExperience
