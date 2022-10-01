import Axios from 'utils/axios'
import { useQuery } from '@tanstack/react-query'

export type Education = {
  university: string
  graduationDate?: string
  qualification: string
  fieldOfStudy: string
  grade: string
  description: string
  userId: string
  id: string
}

type GetUserEducationData = {
  id: string
}

type GetUserEducationResponse = Education[]

const getEducation = (
  props: GetUserEducationData
): Promise<GetUserEducationResponse> => {
  return Axios.get(`edu/user/${props.id}`)
}

const useGetEducation = (props: GetUserEducationData) => {
  return useQuery(['education', { id: props.id }], () => getEducation(props), {
    enabled: !!props.id,
  })
}

export default useGetEducation
