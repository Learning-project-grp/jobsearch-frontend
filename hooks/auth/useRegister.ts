import { useMutation } from '@tanstack/react-query'
import Toast from 'components/common/Toast'
import Axios from 'utils/axios'

export type RegisterData = {
  firstName: string
  lastName: string
  email: string
  password: string
  dob: string
  mobileNo: string
  gender: string
  address: string
  addressCity: string
  addressPostalCode: string
  addressState: string
  addressCountry: string
  role: 'User' | 'Admin'
}

type RegisterResponse = {
  firstName: string
  lastName: string
  email: string
  password: string
  dob: string
  mobileNo: string
  gender: string
  address: string
  addressCity: string
  addressPostalCode: string
  addressState: string
  addressCountry: string
  idNo: string
  role: string
}

type Props = RegisterData

const register = (props: Props): Promise<RegisterResponse> => {
  return Axios.post('/auth/register', props)
}

const useRegister = () => {
  return useMutation(register, {
    onSuccess: () => {
      Toast.success({ title: 'Registered successfully' })
    },
  })
}

export default useRegister
