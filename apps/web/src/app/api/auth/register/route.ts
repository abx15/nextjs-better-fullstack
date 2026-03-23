import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@full-stack-nextjs/db';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password, profile } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or phone already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with profile
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        language: 'hi',
        role: 'user',
        isPremium: false,
        profile: {
          create: {
            state: profile.state || '',
            district: profile.district || '',
            pincode: profile.pincode || null,
            age: profile.age || 0,
            gender: profile.gender || '',
            caste: profile.caste || 'general',
            religion: profile.religion || null,
            annualIncome: profile.annualIncome || 0,
            bplCard: profile.bplCard || false,
            rationCardType: profile.rationCardType || null,
            occupation: profile.occupation || 'other',
            landHolding: profile.landHolding ? parseFloat(profile.landHolding) : null,
            isDisabled: profile.isDisabled || false,
            disabilityPercent: profile.disabilityPercent || null,
            isWidow: profile.isWidow || false,
            isSeniorCitizen: profile.isSeniorCitizen || false,
            isMinority: profile.isMinority || false,
            isStudying: profile.isStudying || false,
            educationLevel: profile.educationLevel || null,
            isProfileComplete: Boolean(
              profile.state && 
              profile.district && 
              profile.age && 
              profile.gender
            ),
          }
        }
      },
      include: {
        profile: true
      }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'User created successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
