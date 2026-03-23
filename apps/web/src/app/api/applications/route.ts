import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@sarkari-saathi/db';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch user's applications with scheme details
    const applications = await prisma.application.findMany({
      where: { userId },
      include: {
        scheme: {
          select: {
            id: true,
            nameHindi: true,
            nameEnglish: true,
            category: true,
            ministry: true,
            benefitAmount: true,
          },
        },
      },
      orderBy: { appliedAt: 'desc' },
    });

    // Calculate stats
    const stats = {
      total: applications.length,
      applied: applications.filter(a => a.status === 'applied').length,
      under_review: applications.filter(a => a.status === 'under_review').length,
      approved: applications.filter(a => a.status === 'approved').length,
      rejected: applications.filter(a => a.status === 'rejected').length,
      pending: applications.filter(a => a.status === 'under_review').length,
      saved: 0, // This would come from saved schemes
    };

    // Format applications for frontend
    const formattedApplications = applications.map(app => ({
      id: app.id,
      schemeId: app.schemeId,
      schemeName: app.scheme.nameHindi,
      schemeCategory: app.scheme.category,
      ministry: app.scheme.ministry,
      status: app.status,
      appliedAt: app.appliedAt,
      updatedAt: app.updatedAt,
      referenceNo: app.referenceNo,
      notes: app.notes,
      rejectionReason: app.rejectionReason,
      timeline: app.timeline as Array<{
        status: string;
        date: Date;
        note?: string;
      }>,
      benefitAmount: app.scheme.benefitAmount,
    }));

    return NextResponse.json({
      applications: formattedApplications,
      stats,
    });
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const { schemeId, applicationDate, referenceNo, notes } = await req.json();

    if (!schemeId) {
      return NextResponse.json({ error: 'Scheme ID is required' }, { status: 400 });
    }

    // Create new application
    const application = await prisma.application.create({
      data: {
        userId,
        schemeId,
        status: 'applied',
        appliedAt: new Date(applicationDate || Date.now()),
        referenceNo,
        notes,
        timeline: [{
          status: 'applied',
          date: new Date(),
          note: 'ऑनलाइन आवेदन किया',
        }],
      },
      include: {
        scheme: {
          select: {
            nameHindi: true,
            category: true,
            ministry: true,
            benefitAmount: true,
          },
        },
      },
    });

    return NextResponse.json({
      application: {
        id: application.id,
        schemeId: application.schemeId,
        schemeName: application.scheme.nameHindi,
        schemeCategory: application.scheme.category,
        ministry: application.scheme.ministry,
        status: application.status,
        appliedAt: application.appliedAt,
        updatedAt: application.updatedAt,
        referenceNo: application.referenceNo,
        notes: application.notes,
        timeline: application.timeline,
        benefitAmount: application.scheme.benefitAmount,
      },
    });
  } catch (error) {
    console.error('Failed to create application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
