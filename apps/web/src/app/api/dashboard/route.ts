import { matchSchemes } from "@/lib/ai/scheme-matcher";

export async function GET(request: Request) {
  // Get language from query params or default to Hindi
  const { searchParams } = new URL(request.url);
  const language = searchParams.get('lang') || 'hi';

  // Mock data for now - avoiding database dependencies
  const applications = [
    {
      id: "1",
      status: "approved",
      appliedAt: new Date().toISOString(),
      scheme: {
        nameHindi: "पीएम किसान सम्मान निधि",
        nameEnglish: "PM Kisan Samman Nidhi"
      }
    },
    {
      id: "2", 
      status: "applied",
      appliedAt: new Date(Date.now() - 86400000).toISOString(),
      scheme: {
        nameHindi: "राष्ट्रीय छात्रवृत्ति पोर्टल",
        nameEnglish: "National Scholarship Portal"
      }
    }
  ];

  const reminders = [
    {
      id: "1",
      titleHindi: "अगले महीने की किस्त जमा करें",
      titleEnglish: "Submit next month's installment",
      dueDate: new Date(Date.now() + 2592000000).toISOString(),
      type: "installment"
    },
    {
      id: "2",
      titleEnglish: "Document upload deadline",
      titleHindi: "दस्तावेज अपलोड करने की अंतिम तिथि",
      dueDate: new Date(Date.now() + 864000000).toISOString(),
      type: "document"
    }
  ];

  const savedSchemes = 5;

  // Use matcher to get top 3 recommendations (if available)
  let topSchemes: any[] = [];
  try {
    const matchResult = await matchSchemes();
    if (matchResult && 'schemes' in matchResult && matchResult.schemes) {
      topSchemes = matchResult.schemes.slice(0, 3);
    }
  } catch (error) {
    console.log("Scheme matcher not available, using empty array");
  }

  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === "applied" || a.status === "approved").length,
    approved: applications.filter(a => a.status === "approved").length,
    pending: applications.filter(a => a.status === "applied").length,
    saved: savedSchemes,
  };

  const recentActivity = applications.slice(0, 5).map(a => ({
    id: a.id,
    description: language === 'hi' 
      ? `${a.scheme.nameHindi} में Apply किया ✅`
      : `Applied for ${a.scheme.nameEnglish} ✅`,
    time: a.appliedAt,
    icon: "📋",
  }));

  return Response.json({
    stats,
    topSchemes,
    reminders: reminders.map(r => ({
      id: r.id,
      title: language === 'hi' ? r.titleHindi : r.titleEnglish,
      dueDate: r.dueDate,
      type: r.type,
      icon: r.type === "installment" ? "💰" : "🏥",
    })),
    recentActivity,
  });
}
