import { auth } from '../auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/faq', 
  '/contact',
  '/login',
  '/register',
]

const PUBLIC_PREFIXES = [
  '/schemes',
  '/api/auth',
]

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role ?? 'user'

  // Allow public routes
  const isPublic = PUBLIC_ROUTES.includes(pathname) || 
    PUBLIC_PREFIXES.some(p => pathname.startsWith(p))
  
  if (isPublic) return NextResponse.next()

  // Not logged in → login
  if (!isLoggedIn) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Admin only
  if (pathname.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Operator only
  if (pathname.startsWith('/operator') && !['operator', 'admin'].includes(userRole)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
}
