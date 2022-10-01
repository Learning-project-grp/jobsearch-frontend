import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type UserInfo = { userId: string }
interface AuthState {
  userInfo?: UserInfo
  setUserInfo: (userInfo?: UserInfo) => void
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        userInfo: undefined,
        setUserInfo: (userInfo) => set(() => ({ userInfo })),
      }),
      {
        name: 'auth-store',
      }
    )
  )
)

export default useAuthStore
