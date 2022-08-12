import { IS_SERVER } from 'constant'

const useJwtToken = () => {
  return {
    token: IS_SERVER ? null : localStorage.getItem('jwt'),
    setToken: (value: string) =>
      IS_SERVER ? {} : localStorage.setItem('jwt', value),
    removeToken: () => (IS_SERVER ? {} : localStorage.removeItem('jwt')),
  }
}

export default useJwtToken
