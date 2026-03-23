import { create } from 'zustand'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
}

interface UIState {
  isSidebarOpen: boolean
  activeModal: string | null
  toasts: Toast[]
  toggleSidebar: () => void
  openModal: (modal: string) => void
  closeModal: () => void
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  activeModal: null,
  toasts: [],
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
  addToast: (toast) => set((s) => ({
    toasts: [...s.toasts, { ...toast, id: crypto.randomUUID() }]
  })),
  removeToast: (id) => set((s) => ({
    toasts: s.toasts.filter(t => t.id !== id)
  })),
}))
