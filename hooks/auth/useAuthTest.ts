import { useQuery } from '@tanstack/react-query'
import Axios from 'utils/axios'

export type TestData = {
  email: string
  password: string
}

type TestResponse = {
  token: string
  userId: string
}

type Props = TestData

const authTest = (): Promise<TestResponse> => {
  return Axios.get('/auth/test')
}

const usAuthTest = () => {
  return useQuery(['authTest'], authTest, {
    onSuccess: (data) => {},
  })
}

export default usAuthTest
