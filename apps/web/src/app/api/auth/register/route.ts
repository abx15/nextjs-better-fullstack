import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
// import prisma from '@full-stack-nextjs/db' // Temporarily disabled

// Mock user storage for demo (in production, use database)
declare global {
  var mockUsers: any[] | undefined
}

const mockUsers = globalThis.mockUsers || []

export async function POST(req: Request) {
  try {
    console.log('Register API called')
    
    const body = await req.json()
    console.log('Request body:', { name: body.name, phone: body.phone, email: body.email })
    
    // Validation
    if (!body.name || !body.phone || !body.password) {
      console.log('Validation failed: missing required fields')
      return NextResponse.json({ error: 'सभी required fields भरें' }, { status: 400 })
    }
    
    // Check if phone already exists (mock check)
    const existing = mockUsers.find(user => user.phone === body.phone)
    if (existing) {
      console.log('Phone already exists:', body.phone)
      return NextResponse.json({ error: 'यह मोबाइल नंबर पहले से registered है' }, { status: 400 })
    }
    
    const hashedPassword = await bcrypt.hash(body.password, 12)
    
    // Create mock user
    const user = {
      id: `user_${Date.now()}`,
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      password: hashedPassword,
      role: 'USER',
      isActive: true,
      createdAt: new Date().toISOString()
    }
    
    // Store in mock array (in production, save to database)
    mockUsers.push(user)
    globalThis.mockUsers = mockUsers
    
    console.log('Mock user registered successfully:', { 
      id: user.id, 
      name: user.name, 
      phone: user.phone,
      totalUsers: mockUsers.length 
    })
    
    return NextResponse.json({ 
      success: true, 
      userId: user.id,
      message: 'Registration successful!'
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ 
      error: 'Registration failed: ' + (error as Error).message 
    }, { status: 500 })
  }
}
