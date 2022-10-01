import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AuthState {
  userInfo?: { userId: string }
  setUserInfo: (userInfo: any) => void
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
