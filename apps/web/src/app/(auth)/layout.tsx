import { type ReactNode } from 'react'
import Header from '@/components/layout/header'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
