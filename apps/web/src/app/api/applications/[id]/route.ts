import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@sarkari-saathi/db';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const applicationId = params.id;
    const { status, referenceNo, notes, rejectionReason } = await req.json();

    // Verify application belongs to user
    const existingApplication = await prisma.application.findFirst({
      where: {
        id: applicationId,
        userId,
      },
    });

    if (!existingApplication) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Update timeline with new status
    const currentTimeline = existingApplication.timeline as Array<{
      status: string;
      date: Date;
      note?: string;
    }>;

    const newTimelineEntry = {
      status,
      date: new Date(),
      note: notes || '',
    };

    const updatedTimeline = [...currentTimeline, newTimelineEntry];

    // Update application
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status,
        referenceNo,
        notes,
        rejectionReason,
        timeline: updatedTimeline,
        updatedAt: new Date(),
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
        id: updatedApplication.id,
        schemeId: updatedApplication.schemeId,
        schemeName: updatedApplication.scheme.nameHindi,
        schemeCategory: updatedApplication.scheme.category,
        ministry: updatedApplication.scheme.ministry,
        status: updatedApplication.status,
        appliedAt: updatedApplication.appliedAt,
        updatedAt: updatedApplication.updatedAt,
        referenceNo: updatedApplication.referenceNo,
        notes: updatedApplication.notes,
        rejectionReason: updatedApplication.rejectionReason,
        timeline: updatedApplication.timeline,
        benefitAmount: updatedApplication.scheme.benefitAmount,
      },
    });
  } catch (error) {
    console.error('Failed to update application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const applicationId = params.id;

    // Verify application belongs to user
    const existingApplication = await prisma.application.findFirst({
      where: {
        id: applicationId,
        userId,
      },
    });

    if (!existingApplication) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Delete application
    await prisma.application.delete({
      where: { id: applicationId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
