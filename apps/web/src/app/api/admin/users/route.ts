import { NextRequest, NextResponse } from 'next/server'
import { auth } from "@/auth";
import { requireRole, UserRole } from '@/lib/rbac';
import prisma from "@full-stack-nextjs/db";
import bcrypt from 'bcryptjs';

// GET /api/admin/users - Get all users with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(request, 'ADMIN')
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role') || ''
    const isActive = searchParams.get('isActive')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (role) {
      where.role = role as UserRole
    }

    if (isActive !== null) {
      where.isActive = isActive === 'true'
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          profile: true,
          operator: true,
          adminProfile: true,
          _count: {
            select: {
              applications: true,
              reminders: true,
              savedSchemes: true,
              chatSessions: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ])

    const formattedUsers = users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      state: u.profile?.state || "N/A",
      role: u.role,
      isPremium: u.isPremium,
      isActive: u.isActive,
      joinedAt: u.createdAt,
      lastActive: u.updatedAt,
      applicationsCount: u._count.applications,
      chatSessionsCount: u._count.chatSessions,
      remindersCount: u._count.reminders,
      savedSchemesCount: u._count.savedSchemes,
      profile: u.profile,
      operator: u.operator,
      adminProfile: u.adminProfile
    }))

    return NextResponse.json({
      users: formattedUsers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/admin/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const adminUser = await requireRole(request, 'ADMIN')
    
    const body = await request.json()
    const { 
      name, 
      email, 
      phone, 
      password, 
      role = 'USER',
      language = 'hi',
      isPremium = false,
      isActive = true
    } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or phone already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: role as UserRole,
        language,
        isPremium,
        isActive
      },
      include: {
        profile: true,
        operator: true,
        adminProfile: true,
        _count: {
          select: {
            applications: true,
            reminders: true,
            savedSchemes: true,
            chatSessions: true
          }
        }
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/users - Update user
export async function PATCH(request: NextRequest) {
  try {
    const adminUser = await requireRole(request, 'ADMIN')
    
    const body = await request.json()
    const { userId, ...data } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Handle password update separately
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12)
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      include: {
        profile: true,
        operator: true,
        adminProfile: true,
        _count: {
          select: {
            applications: true,
            reminders: true,
            savedSchemes: true,
            chatSessions: true
          }
        }
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/users - Delete user
export async function DELETE(request: NextRequest) {
  try {
    const adminUser = await requireRole(request, 'ADMIN')
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Delete user (cascade delete will handle related records)
    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
