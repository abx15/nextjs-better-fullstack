"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

/* ─── SECTION DATA ─── */

const howItWorks = [
  { step: "01", icon: "📝", titleHi: "प्रोफाइल बनाएं", titleEn: "Create Profile", descHi: "2 मिनट में अपनी जानकारी भरें" },
  { step: "02", icon: "🤖", titleHi: "AI योजनाएं खोजे", titleEn: "AI Finds Schemes", descHi: "Instant matching — AI आपके लिए योजनाएं खोजता है" },
  { step: "03", icon: "📄", titleHi: "दस्तावेज़ समझें", titleEn: "Understand Documents", descHi: "Clear checklist — कौन से कागज़ात चाहिए" },
  { step: "04", icon: "🚀", titleHi: "आवेदन करें", titleEn: "Apply Now", descHi: "Step by step guide — आसानी से apply करें" },
];

const stats = [
  { value: "50,000+", labelHi: "उपयोगकर्ता", labelEn: "Users", icon: "👥" },
  { value: "1,000+", labelHi: "योजनाएं", labelEn: "Schemes", icon: "📋" },
  { value: "28", labelHi: "राज्य", labelEn: "States", icon: "🗺️" },
  { value: "₹10Cr+", labelHi: "लाभ दिलाया", labelEn: "Benefits Claimed", icon: "💰" },
];

const schemes = [
  { icon: "🌾", nameHi: "PM-KISAN सम्मान निधि", benefit: "₹6,000/वर्ष", difficulty: "आसान", category: "किसान" },
  { icon: "🏥", nameHi: "आयुष्मान भारत", benefit: "₹5 लाख/परिवार", difficulty: "आसान", category: "स्वास्थ्य" },
  { icon: "🏠", nameHi: "PM आवास योजना", benefit: "₹2.50 लाख", difficulty: "मध्यम", category: "आवास" },
  { icon: "🎓", nameHi: "SC/ST छात्रवृत्ति", benefit: "₹1.5 लाख/वर्ष", difficulty: "मध्यम", category: "शिक्षा" },
  { icon: "👩", nameHi: "सुकन्या समृद्धि", benefit: "8.2% ब्याज", difficulty: "आसान", category: "महिला" },
  { icon: "💼", nameHi: "PM मुद्रा योजना", benefit: "₹10 लाख लोन", difficulty: "मध्यम", category: "रोज़गार" },
];

const testimonials = [
  {
    name: "रामलाल यादव",
    state: "उत्तर प्रदेश",
    avatar: "👨‍🌾",
    quoteHi: "SarkariSaathi से मुझे PM-KISAN और फसल बीमा दोनों का पता चला। पहले तो पता ही नहीं था कि इतनी सारी योजनाएं हैं।",
  },
  {
    name: "प्रिया शर्मा",
    state: "राजस्थान",
    avatar: "👩‍🎓",
    quoteHi: "मैंने SC/ST scholarship के लिए apply किया और ₹50,000 की छात्रवृत्ति मिली। इस app ने मेरी पढ़ाई बचा ली!",
  },
  {
    name: "मोहम्मद अली",
    state: "बिहार",
    avatar: "👨‍💼",
    quoteHi: "मुद्रा लोन से अपनी दुकान शुरू की। SarkariSaathi ने सारे documents की list दे दी, बहुत आसान हो गया।",
  },
];

const forWhom = [
  { icon: "🌾", titleHi: "किसान", titleEn: "Farmers", count: "200+ योजनाएं" },
  { icon: "🎓", titleHi: "छात्र", titleEn: "Students", count: "150+ योजनाएं" },
  { icon: "👩", titleHi: "महिलाएं", titleEn: "Women", count: "180+ योजनाएं" },
  { icon: "♿", titleHi: "दिव्यांग", titleEn: "Disabled", count: "80+ योजनाएं" },
  { icon: "👴", titleHi: "वृद्ध", titleEn: "Senior Citizens", count: "60+ योजनाएं" },
  { icon: "💼", titleHi: "व्यापारी", titleEn: "Entrepreneurs", count: "120+ योजनाएं" },
];

/* ─── LANDING PAGE ─── */

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const schemesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const forWhomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".hero-title", { opacity: 0, y: 40, duration: 0.8, ease: "power3.out" });
      gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 0.8, delay: 0.2, ease: "power3.out" });
      gsap.from(".hero-cta", { opacity: 0, y: 20, duration: 0.6, delay: 0.4, ease: "power3.out" });
      gsap.from(".hero-badges", { opacity: 0, y: 20, duration: 0.6, delay: 0.6, ease: "power3.out" });

      // ScrollTrigger-like animations using intersection observer fallback
      const animateOnScroll = (selector: string, props: gsap.TweenVars) => {
        const elements = document.querySelectorAll(selector);
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                gsap.from(entry.target, { ...props, ease: "power3.out" });
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 }
        );
        elements.forEach((el) => observer.observe(el));
      };

      animateOnScroll(".step-card", { opacity: 0, y: 40, duration: 0.6, stagger: 0.15 });
      animateOnScroll(".stat-item", { opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.1 });
      animateOnScroll(".scheme-card-item", { opacity: 0, y: 30, duration: 0.5, stagger: 0.1 });
      animateOnScroll(".testimonial-card", { opacity: 0, x: -30, duration: 0.6, stagger: 0.2 });
      animateOnScroll(".whom-card", { opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.1 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO SECTION ─── */}
      <section
        ref={heroRef}
        className="relative bg-navy-gradient min-h-[85vh] flex items-center overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--sarkari-saffron)] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--sarkari-green)] rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-hindi leading-tight">
            सरकारी योजनाएं
            <br />
            <span className="text-gradient-saffron" style={{ WebkitTextFillColor: "transparent", background: "linear-gradient(135deg, #FF6B00, #FF8B3D)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>
              अब आसान
            </span>
          </h1>

          <p className="hero-subtitle mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto">
            Find government schemes made for <strong>YOU</strong> — in 2 minutes, for free
          </p>

          <div className="hero-cta mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/register"
              className="group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl bg-[var(--sarkari-saffron)] text-white shadow-xl shadow-[var(--sarkari-saffron)]/30 hover:shadow-2xl hover:shadow-[var(--sarkari-saffron)]/40 hover:scale-105 transition-all duration-300 text-hindi"
            >
              अपनी योजनाएं खोजें →
            </Link>
            <p className="text-xs sm:text-sm text-white/60">
              पहले से <strong className="text-white/90">50,000+</strong> लोग जुड़ चुके हैं
            </p>
          </div>

          <div className="hero-badges mt-6 sm:mt-8 lg:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:gap-4">
            {["✅ Free", "✅ Hindi Support", "✅ 1000+ Schemes", "✅ Secure"].map(
              (badge) => (
                <span
                  key={badge}
                  className="text-xs sm:text-sm text-white/70 bg-white/10 px-3 sm:px-4 py-1.5 rounded-full"
                >
                  {badge}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section ref={stepsRef} className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--sarkari-navy)] text-hindi">
              कैसे काम करता है?
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Just 4 simple steps to find your perfect government scheme
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="step-card group relative rounded-2xl border border-border bg-card p-4 sm:p-6 text-center transition-all duration-300 hover:shadow-xl hover:border-[var(--sarkari-saffron)]/30 hover:-translate-y-2"
              >
                <div className="absolute -top-3 -left-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[var(--sarkari-saffron)] text-white text-xs font-bold flex items-center justify-center shadow-lg">
                  {item.step}
                </div>
                <span className="text-3xl sm:text-4xl block mb-3 sm:mb-4">{item.icon}</span>
                <h3 className="text-sm sm:text-base font-semibold text-[var(--sarkari-navy)] text-hindi">
                  {item.titleHi}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.titleEn}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 text-hindi">
                  {item.descHi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section ref={statsRef} className="py-8 sm:py-10 lg:py-12 bg-[var(--sarkari-navy)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.labelEn}
                className="stat-item text-center py-3 sm:py-4"
              >
                <span className="text-2xl sm:text-3xl block mb-2">{stat.icon}</span>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-white/70 text-hindi mt-1">
                  {stat.labelHi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POPULAR SCHEMES ─── */}
      <section ref={schemesRef} className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--sarkari-navy)] text-hindi">
              लोकप्रिय योजनाएं
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">
              Most popular government schemes for Indian citizens
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {schemes.map((scheme) => (
              <div
                key={scheme.nameHi}
                className="scheme-card-item group rounded-2xl border border-border bg-card p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:border-[var(--sarkari-saffron)]/30 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">{scheme.icon}</span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-[var(--sarkari-navy)] text-hindi line-clamp-1">
                        {scheme.nameHi}
                      </h3>
                      <span className="text-[10px] text-muted-foreground">
                        {scheme.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                    {scheme.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground text-hindi">
                      लाभ:{" "}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[var(--sarkari-green)]">
                      {scheme.benefit}
                    </span>
                  </div>
                  <Link
                    href={`/schemes`}
                    className="text-xs font-medium text-[var(--sarkari-saffron)] hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <Link
              href="/schemes"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 border-[var(--sarkari-navy)] text-[var(--sarkari-navy)] font-semibold hover:bg-[var(--sarkari-navy)] hover:text-white transition-all text-hindi text-sm sm:text-base"
            >
              और योजनाएं देखें →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section ref={testimonialsRef} className="py-12 sm:py-16 lg:py-20 bg-[var(--sarkari-bg-alt)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--sarkari-navy)] text-hindi">
              लोग क्या कहते हैं
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">
              Real stories from real users across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="testimonial-card rounded-2xl bg-card border border-border p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl sm:text-3xl">{t.avatar}</span>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm text-hindi">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground text-hindi">
                      {t.state}
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed text-hindi">
                  &ldquo;{t.quoteHi}&rdquo;
                </p>
                <div className="flex items-center gap-0.5 mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-xs sm:text-sm">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOR WHOM ─── */}
      <section ref={forWhomRef} className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--sarkari-navy)] text-hindi">
              किसके लिए है?
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">
              Government schemes for every Indian citizen
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {forWhom.map((item) => (
              <div
                key={item.titleEn}
                className="whom-card group rounded-2xl border border-border bg-card p-3 sm:p-5 text-center transition-all duration-300 hover:shadow-xl hover:border-[var(--sarkari-saffron)]/30 hover:-translate-y-2 cursor-pointer"
              >
                <span className="text-3xl sm:text-4xl block mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <h3 className="text-xs sm:text-sm font-semibold text-[var(--sarkari-navy)] text-hindi">
                  {item.titleHi}
                </h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {item.titleEn}
                </p>
                <p className="text-[10px] sm:text-[11px] text-[var(--sarkari-saffron)] font-medium mt-1 sm:mt-2 text-hindi">
                  {item.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-saffron-gradient">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-hindi">
            अभी Register करें — बिलकुल FREE
          </h2>
          <p className="mt-3 sm:mt-4 text-white/80 text-base sm:text-lg max-w-xl mx-auto">
            Join 50,000+ Indians who already found their government scheme benefits
          </p>
          <Link
            href="/register"
            className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-6 sm:px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-xl bg-white text-[var(--sarkari-saffron)] shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            <span className="text-hindi">मुफ्त में शुरू करें</span> →
          </Link>
          <p className="mt-3 sm:mt-4 text-white/60 text-xs sm:text-sm">
            No credit card required • 100% Free • Hindi support
          </p>
        </div>
      </section>
    </div>
  );
}
