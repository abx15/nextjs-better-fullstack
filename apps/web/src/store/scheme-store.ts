import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SchemeWithScore {
  id: string
  slug: string
  nameHindi: string
  nameEnglish: string
  category: string
  benefitAmount: string | null
  difficulty: string
  eligibilityScore: number
  matchReasonHindi: string
  missingDocuments: string[]
  priority: 'high' | 'medium' | 'low'
}

interface SchemeState {
  matchedSchemes: SchemeWithScore[]
  savedSchemeIds: string[]
  activeCategory: string
  searchQuery: string
  filters: {
    state?: string
    difficulty?: string
    benefitType?: string
    level?: string
  }
  isMatching: boolean
  lastMatchedAt: Date | null
  setMatchedSchemes: (schemes: SchemeWithScore[]) => void
  toggleSaved: (schemeId: string) => void
  setActiveCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  setFilters: (filters: SchemeState['filters']) => void
  setIsMatching: (loading: boolean) => void
}

export const useSchemeStore = create<SchemeState>()(
  persist(
    (set, get) => ({
      matchedSchemes: [],
      savedSchemeIds: [],
      activeCategory: 'all',
      searchQuery: '',
      filters: {},
      isMatching: false,
      lastMatchedAt: null,
      setMatchedSchemes: (schemes) => set({ matchedSchemes: schemes, lastMatchedAt: new Date() }),
      toggleSaved: (id) => set((s) => ({
        savedSchemeIds: s.savedSchemeIds.includes(id)
          ? s.savedSchemeIds.filter(x => x !== id)
          : [...s.savedSchemeIds, id]
      })),
      setActiveCategory: (c) => set({ activeCategory: c }),
      setSearchQuery: (q) => set({ searchQuery: q }),
      setFilters: (f) => set({ filters: f }),
      setIsMatching: (b) => set({ isMatching: b }),
    }),
    { name: 'sarkari-scheme-store' }
  )
)
