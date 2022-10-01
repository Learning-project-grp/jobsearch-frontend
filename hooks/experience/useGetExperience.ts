import Axios from 'utils/axios'
import { useQuery } from '@tanstack/react-query'

export type Experience = {
  companyName: string
  createTime?: Date
  description: string
  durationFrom: string
  durationTo: string
  id: string
  positionLevel: string
  positionTitle: string
  salary: string
  updateTime?: Date
  userId: string
}

type GetUserExperienceData = {
  id?: string
}

type GetUserExperienceResponse = Experience[]

const getExperience = (
  props: GetUserExperienceData
): Promise<GetUserExperienceResponse> => {
  return Axios.get(`exp/user/${props.id}`)
}

const useGetExperience = (props: GetUserExperienceData) => {
  return useQuery(
    ['experience', { id: props.id }],
    () => getExperience(props),
    {
      enabled: !!props.id,
    }
  )
}

export default useGetExperience
