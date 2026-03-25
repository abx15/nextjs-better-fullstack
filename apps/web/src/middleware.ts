import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
const { auth } = NextAuth(authConfig)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { UserRole } from './lib/rbac'
import { getRoleRedirectPath, RBAC } from './lib/rbac'

const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/faq', 
  '/contact',
  '/login',
  '/register',
  '/forgot-password',
  '/help',
  '/schemes',
]

const PUBLIC_PREFIXES = [
  '/api/auth',
  '/api/schemes',
  '/api/sarvam',
  '/api/tts',
]

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role as UserRole || 'USER'
  const isActive = req.auth?.user?.isActive ?? true

  // Allow public routes
  const isPublic = PUBLIC_ROUTES.includes(pathname) || 
    PUBLIC_PREFIXES.some(p => pathname.startsWith(p))

  if (isPublic) {
    // Only redirect from auth pages, not from home page
    if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
      const redirectPath = getRoleRedirectPath(userRole)
      return NextResponse.redirect(new URL(redirectPath, req.url))
    }
    return NextResponse.next()
  }

  // Not logged in → login
  if (!isLoggedIn) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Check if user is active
  if (!isActive) {
    return NextResponse.redirect(new URL('/account-suspended', req.url))
  }

  // Role-based route protection
  if (pathname.startsWith('/admin')) {
    if (!RBAC.ADMIN.includes(userRole)) {
      const redirectPath = getRoleRedirectPath(userRole)
      return NextResponse.redirect(new URL(redirectPath, req.url))
    }
  }

  if (pathname.startsWith('/operator')) {
    if (!RBAC.OPERATOR.includes(userRole)) {
      const redirectPath = getRoleRedirectPath(userRole)
      return NextResponse.redirect(new URL(redirectPath, req.url))
    }
  }

  if (pathname.startsWith('/dashboard')) {
    if (!RBAC.USER.includes(userRole)) {
      const redirectPath = getRoleRedirectPath(userRole)
      return NextResponse.redirect(new URL(redirectPath, req.url))
    }
  }

  // API route protection
  if (pathname.startsWith('/api/admin')) {
    if (!RBAC.ADMIN.includes(userRole)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }
  }

  if (pathname.startsWith('/api/operator')) {
    if (!RBAC.OPERATOR.includes(userRole)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
}
