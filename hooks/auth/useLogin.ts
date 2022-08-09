import { useMutation } from '@tanstack/react-query'
import Axios from 'utils/axios'

export type LoginData = {
  email: string
  password: string
}

type LoginResponse = {}

type Props = LoginData

const login = (props: Props): Promise<LoginResponse> => {
  return Axios.post('/auth/login', props)
}

const useLogin = () => {
  return useMutation(login, {
    onSuccess: () => {},
  })
}

export default useLogin
