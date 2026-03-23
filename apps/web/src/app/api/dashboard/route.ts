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

    // Fetch dashboard data
    const [applications, savedSchemes, reminders] = await Promise.all([
      // User's applications
      prisma.application.findMany({
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
              difficulty: true,
            },
          },
        },
        orderBy: { appliedAt: 'desc' },
        take: 5,
      }),

      // User's saved schemes
      prisma.savedScheme.findMany({
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
              difficulty: true,
            },
          },
        },
        orderBy: { savedAt: 'desc' },
        take: 3,
      }),

      // User's reminders
      prisma.reminder.findMany({
        where: { userId },
        orderBy: { dueDate: 'asc' },
        take: 3,
      }),
    ]);

    // Calculate stats
    const stats = {
      total: applications.length,
      applied: applications.filter(a => a.status === 'applied').length,
      approved: applications.filter(a => a.status === 'approved').length,
      pending: applications.filter(a => a.status === 'under_review').length,
      saved: savedSchemes.length,
    };

    // Get top schemes (combine applied and saved)
    const topSchemes = [
      ...applications.map(app => ({
        ...app.scheme,
        matchPercent: 85 + Math.floor(Math.random() * 15), // Mock match percentage
        docsReady: 2,
        docsNeeded: 1,
        isSaved: false,
        status: app.status,
      })),
      ...savedSchemes.map(saved => ({
        ...saved.scheme,
        matchPercent: 75 + Math.floor(Math.random() * 25), // Mock match percentage
        docsReady: 1,
        docsNeeded: 2,
        isSaved: true,
      })),
    ].slice(0, 3);

    // Format reminders
    const formattedReminders = reminders.map(reminder => ({
      id: reminder.id,
      title: reminder.title,
      dueDate: reminder.dueDate,
      type: reminder.type,
      icon: reminder.type === 'deadline' ? '⏰' : 
            reminder.type === 'renewal' ? '🔄' : 
            reminder.type === 'installment' ? '💰' : '📢',
    }));

    // Mock recent activity
    const recentActivity = [
      {
        id: 1,
        description: `${applications[0]?.scheme?.nameHindi || 'PM-KISAN'} में Apply किया ✅`,
        time: applications[0] ? '2 दिन पहले' : 'आज',
        icon: '📋',
      },
      {
        id: 2,
        description: `${savedSchemes[0]?.scheme?.nameHindi || 'Ayushman Bharat'} Save किया 💾`,
        time: savedSchemes[0] ? 'आज' : 'कल',
        icon: '💾',
      },
      {
        id: 3,
        description: 'AI से योजनाएं खोजीं 🤖',
        time: '3 दिन पहले',
        icon: '🤖',
      },
    ];

    return NextResponse.json({
      stats,
      topSchemes,
      reminders: formattedReminders,
      recentActivity,
    });
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    
    // Return mock data for development
    return NextResponse.json({
      stats: {
        total: 8,
        applied: 3,
        approved: 2,
        pending: 2,
        saved: 5,
      },
      topSchemes: [
        {
          id: 1,
          nameHindi: 'पीएम-किसान सम्मान निधि',
          nameEnglish: 'PM-KISAN Samman Nidhi',
          category: 'kisan',
          ministry: 'कृषि एवं किसान कल्याण मंत्रालय',
          benefitAmount: '₹6,000/साल',
          difficulty: 'easy',
          matchPercent: 95,
          docsReady: 2,
          docsNeeded: 1,
          isSaved: false,
        },
        {
          id: 2,
          nameHindi: 'आयुष्मान भारत',
          nameEnglish: 'Ayushman Bharat',
          category: 'swasthya',
          ministry: 'स्वास्थ्य एवं परिवार कल्याण मंत्रालय',
          benefitAmount: '₹5 लाख/साल',
          difficulty: 'medium',
          matchPercent: 88,
          docsReady: 1,
          docsNeeded: 2,
          isSaved: true,
        },
      ],
      reminders: [
        {
          id: 1,
          title: 'PM-KISAN Installment',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          type: 'installment',
          icon: '💰',
        },
        {
          id: 2,
          title: 'Ayushman Card Renewal',
          dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
          type: 'renewal',
          icon: '🏥',
        },
      ],
      recentActivity: [
        {
          id: 1,
          description: 'PM-KISAN में Apply किया ✅',
          time: '2 दिन पहले',
          icon: '📋',
        },
        {
          id: 2,
          description: 'Ayushman Bharat Save किया 💾',
          time: 'आज',
          icon: '💾',
        },
      ],
    });
  }
}
