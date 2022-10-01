import { useMutation } from '@tanstack/react-query'
import Toast from 'components/common/Toast'
import useJwtToken from 'hooks/useJwtToken'
import useAuthStore from 'stores/authStore'
import Axios from 'utils/axios'

export type LoginData = {
  email: string
  password: string
}

type LoginResponse = {
  token: string
  userId: string
}

type Props = LoginData

const login = (props: Props): Promise<LoginResponse> => {
  return Axios.post('/auth/login', props)
}

const useLogin = () => {
  const setUserInfo = useAuthStore((state) => state.setUserInfo)
  const { setToken } = useJwtToken()
  return useMutation(login, {
    onSuccess: (data) => {
      setUserInfo({ userId: data.userId })
      setToken(data.token)
      Toast.success({ title: 'Logged in successfully' })
    },
  })
}

export default useLogin
