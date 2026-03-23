import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: {
    id: string
    name: string | null
    email: string | null
    phone: string | null
    image: string | null
    role: string
    isPremium: boolean
  } | null
  profile: {
    state: string
    district: string
    age: number
    gender: string
    caste: string
    annualIncome: number
    bplCard: boolean
    occupation: string
    isDisabled: boolean
    isWidow: boolean
    isSeniorCitizen: boolean
    isMinority: boolean
    isProfileComplete: boolean
  } | null
  language: 'hi' | 'en'
  setUser: (user: UserState['user']) => void
  setProfile: (profile: UserState['profile']) => void
  setLanguage: (lang: 'hi' | 'en') => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      language: 'hi',
      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setLanguage: (language) => set({ language }),
      clearUser: () => set({ user: null, profile: null }),
    }),
    { name: 'sarkari-user-store' }
  )
)
