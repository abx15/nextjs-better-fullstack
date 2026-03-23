import { create } from 'zustand'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
}

interface ChatSession {
  id: string
  title: string | null
  language: string
  createdAt: Date
}

interface ChatState {
  sessions: ChatSession[]
  currentSessionId: string | null
  messages: ChatMessage[]
  isTyping: boolean
  isRecording: boolean
  setSessions: (sessions: ChatSession[]) => void
  setCurrentSession: (id: string | null) => void
  addMessage: (message: ChatMessage) => void
  setMessages: (messages: ChatMessage[]) => void
  setTyping: (typing: boolean) => void
  setRecording: (recording: boolean) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  sessions: [],
  currentSessionId: null,
  messages: [],
  isTyping: false,
  isRecording: false,
  setSessions: (sessions) => set({ sessions }),
  setCurrentSession: (id) => set({ currentSessionId: id }),
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  setMessages: (messages) => set({ messages }),
  setTyping: (isTyping) => set({ isTyping }),
  setRecording: (isRecording) => set({ isRecording }),
  clearMessages: () => set({ messages: [] }),
}))
