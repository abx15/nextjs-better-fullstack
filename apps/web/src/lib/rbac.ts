import { NextRequest, NextResponse } from 'next/server'
import { auth } from './auth'

export type UserRole = 'USER' | 'OPERATOR' | 'ADMIN' | 'SUPER_ADMIN'

export interface AuthenticatedUser {
  id: string
  email?: string
  name?: string
  role: UserRole
  isPremium: boolean
  language: string
  isActive: boolean
}

export class RoleAccessError extends Error {
  constructor(message: string, public requiredRole?: UserRole) {
    super(message)
    this.name = 'RoleAccessError'
  }
}

export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy = {
    'USER': 0,
    'OPERATOR': 1,
    'ADMIN': 2,
    'SUPER_ADMIN': 3
  }
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export function hasAnyRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole)
}

export async function requireAuth(request: NextRequest): Promise<AuthenticatedUser> {
  const session = await auth()
  
  if (!session?.user) {
    throw new RoleAccessError('Authentication required')
  }
  
  return {
    id: session.user.id,
    email: session.user.email || undefined,
    name: session.user.name || undefined,
    role: session.user.role as UserRole,
    isPremium: session.user.isPremium || false,
    language: session.user.language || 'hi',
    isActive: true // TODO: Get from database
  }
}

export async function requireRole(
  request: NextRequest, 
  requiredRole: UserRole
): Promise<AuthenticatedUser> {
  const user = await requireAuth(request)
  
  if (!hasPermission(user.role, requiredRole)) {
    throw new RoleAccessError(
      `Access denied. Required role: ${requiredRole}`,
      requiredRole
    )
  }
  
  return user
}

export async function requireAnyRole(
  request: NextRequest, 
  allowedRoles: UserRole[]
): Promise<AuthenticatedUser> {
  const user = await requireAuth(request)
  
  if (!hasAnyRole(user.role, allowedRoles)) {
    throw new RoleAccessError(
      `Access denied. Allowed roles: ${allowedRoles.join(', ')}`
    )
  }
  
  return user
}

export function createRoleMiddleware(requiredRole: UserRole) {
  return async (request: NextRequest) => {
    try {
      const user = await requireRole(request, requiredRole)
      return user
    } catch (error) {
      if (error instanceof RoleAccessError) {
        return NextResponse.json(
          { error: error.message, requiredRole: error.requiredRole },
          { status: 403 }
        )
      }
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      )
    }
  }
}

export function createAnyRoleMiddleware(allowedRoles: UserRole[]) {
  return async (request: NextRequest) => {
    try {
      const user = await requireAnyRole(request, allowedRoles)
      return user
    } catch (error) {
      if (error instanceof RoleAccessError) {
        return NextResponse.json(
          { error: error.message },
          { status: 403 }
        )
      }
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      )
    }
  }
}

// Role-based access control constants
export const RBAC = {
  // Public routes (no auth required)
  PUBLIC: [] as UserRole[],
  
  // User-only routes
  USER: ['USER', 'OPERATOR', 'ADMIN', 'SUPER_ADMIN'] as UserRole[],
  
  // Operator and above
  OPERATOR: ['OPERATOR', 'ADMIN', 'SUPER_ADMIN'] as UserRole[],
  
  // Admin and above
  ADMIN: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  
  // Super admin only
  SUPER_ADMIN: ['SUPER_ADMIN'] as UserRole[],
  
  // Specific permission combinations
  USER_MANAGEMENT: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  SCHEME_MANAGEMENT: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  ANALYTICS: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  CUSTOMER_SERVICE: ['OPERATOR', 'ADMIN', 'SUPER_ADMIN'] as UserRole[],
} as const

export function getRoleRedirectPath(role: UserRole): string {
  switch (role) {
    case 'USER':
      return '/dashboard'
    case 'OPERATOR':
      return '/operator'
    case 'ADMIN':
    case 'SUPER_ADMIN':
      return '/admin'
    default:
      return '/login'
  }
}
