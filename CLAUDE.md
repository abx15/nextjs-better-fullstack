# full-stack-nextjs

This file provides context about the project for AI assistants.

## Project Overview

- **Ecosystem**: Typescript

## Tech Stack

- **Runtime**: none
- **Package Manager**: pnpm

### Frontend

- Framework: next
- CSS: tailwind
- UI Library: shadcn-ui
- State: zustand

### Backend

- Framework: self
- API: trpc
- Validation: zod

### Database

- Database: postgres
- ORM: prisma

### Authentication

- Provider: nextauth

### Additional Features

- Testing: vitest
- AI: vercel-ai
- Email: nodemailer
- Payments: dodo
- Realtime: socket-io
- Job Queue: inngest
- Caching: upstash-redis
- CMS: payload
- Logging: pino
- Observability: sentry

## Project Structure

```
full-stack-nextjs/
├── apps/
│   ├── web/         # Frontend application
├── packages/
│   ├── api/         # API layer
│   ├── auth/        # Authentication
│   └── db/          # Database schema
```

## Common Commands

- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run tests
- `pnpm db:push` - Push database schema
- `pnpm db:studio` - Open database UI

## Maintenance

Keep CLAUDE.md updated when:

- Adding/removing dependencies
- Changing project structure
- Adding new features or services
- Modifying build/dev workflows

AI assistants should suggest updates to this file when they notice relevant changes.




# 🏛️ SarkariSaathi — Complete Prototype & Build Guide
> **"Har Indian ko uski haq ki scheme milni chahiye — bina kisi agent, dalal, ya pareshani ke"**

**Version:** 1.0.0  
**Stack:** Next.js 16 + Vercel AI SDK + Prisma + Neon PostgreSQL  
**Author:** Arun Kumar Bind  
**Date:** March 2026

---

**Prep**
Week 1-2:  Landing + Auth + Profile Setup
Week 3-4:  Scheme Finder + AI Chat
Week 5-6:  Dashboard + Tracker + Reminders
Week 7-8:  Admin Panel (basic)
Week 9-10: CSC Operator Panel
Week 11-12: Polish + Deploy + All pages complete

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Solution](#3-solution)
4. [Target Users](#4-target-users)
5. [Core Features](#5-core-features)
6. [Technical Architecture](#6-technical-architecture)
7. [Database Schema](#7-database-schema)
8. [Folder Structure](#8-folder-structure)
9. [UI/UX Prototype — Screen by Screen](#9-uiux-prototype--screen-by-screen)
10. [API Routes](#10-api-routes)
11. [AI Integration](#11-ai-integration)
12. [Environment Variables](#12-environment-variables)
13. [Build Roadmap](#13-build-roadmap)
14. [Revenue Model](#14-revenue-model)
15. [Funding Strategy](#15-funding-strategy)
16. [AI Agent Prompt](#16-ai-agent-prompt)

---

## 1. Project Overview

| Field | Details |
|---|---|
| **Project Name** | SarkariSaathi |
| **Tagline** | Google for Government Schemes |
| **Type** | AI-powered SaaS + Social Impact |
| **Language Support** | Hindi, English, + 10 regional languages |
| **Platform** | Web (PWA — works on mobile too) |
| **Target Market** | 80 crore eligible Indians |
| **Monetization** | Freemium + B2G + NGO partnerships |

---

## 2. Problem Statement

India mein **1000+ central aur state government schemes** hain, lekin:

- ❌ **60% eligible log apply hi nahi karte** — unhe pata hi nahi hota
- ❌ **40% log dalal/agent ko paise dete hain** sirf form bharne ke liye
- ❌ **Documents kya chahiye** — kisi ko clearly nahi pata
- ❌ **Regional language mein info nahi milti** — English-only portals
- ❌ **Existing portals (myscheme.gov.in) complex hain** — AI nahi hai
- ❌ **Scheme deadlines miss ho jaati hain** — koi reminder nahi

### Real Numbers:
```
India mein schemes: 1,000+
Eligible population: 80 crore+
Actually benefitting: ~30 crore
Gap: 50 crore log schemes miss kar rahe hain
```

---

## 3. Solution

**SarkariSaathi = AI-powered personal government guide**

```
User apni details bharta hai
         ↓
AI exact matching schemes nikalta hai
         ↓
Documents checklist milti hai
         ↓
Step-by-step apply guide milta hai
         ↓
Reminders & tracking milta hai
```

**Kya alag hai:**
- 🤖 AI se personalized scheme matching
- 🗣️ Hindi + 10 regional languages
- 📋 Smart document checklist
- 🔔 Deadline reminders
- 📍 Nearest CSC/office locator
- 🆓 Bilkul free for users

---

## 4. Target Users

### Primary Users

| User Type | Problem | Solution |
|---|---|---|
| **Kisan (Farmer)** | PM-KISAN, crop insurance nahi pata | Hindi mein AI guide |
| **BPL Family** | Ration card, housing scheme miss | Auto-match + checklist |
| **Student** | Scholarship dhundna mushkil | Personalized matches |
| **Disabled Person** | Complex disability schemes | Simple UI + voice |
| **Senior Citizen** | Pension schemes confusing | Step-by-step guide |
| **Small Business** | MSME schemes nahi pata | Business type match |
| **Women** | Mahila schemes unknown | Gender-filtered results |

### Secondary Users (B2B/B2G)

| User Type | Use Case |
|---|---|
| **CSC Operators** | Customers ko schemes dhundhne mein help |
| **ASHA/Anganwadi Workers** | Village mein awareness |
| **NGOs** | Beneficiary outreach |
| **Government** | Analytics dashboard |

---

## 5. Core Features

### Feature 1: 🤖 AI Scheme Finder (Main Feature)

**User Flow:**
```
Step 1: Profile bharo
  - Name, Age, Gender
  - State, District
  - Income category (BPL/APL/General)
  - Caste (General/OBC/SC/ST)
  - Occupation (Farmer/Student/Business/Service/Other)
  - Family size
  - Special category (Disabled/Widow/Senior/Minority)

Step 2: AI process karta hai
  - Zod validation
  - Meilisearch se scheme search
  - OpenAI se eligibility check
  - Redis cache (fast results)

Step 3: Results milte hain
  - "Tumhare liye 23 schemes hain"
  - Priority order mein listed
  - Each scheme ka benefit amount
  - Application deadline
  - Easy/Medium/Hard difficulty badge
```

**Example AI Response:**
```json
{
  "schemes": [
    {
      "name": "PM-KISAN Samman Nidhi",
      "benefit": "₹6,000/year",
      "eligibility": "100% match",
      "difficulty": "Easy",
      "deadline": "Ongoing",
      "documents": ["Aadhar", "Bank Account", "Land Records"]
    }
  ]
}
```

---

### Feature 2: 📋 Smart Document Checker

```
Scheme select karo
       ↓
AI documents checklist generate kare:
  ✅ Aadhar Card — "Har jagah chahiye"
  ✅ Bank Passbook — "Account number ke liye"
  ❌ Income Certificate — "SDM office se banwao — 3 din lagenge"
  ❌ Caste Certificate — "Tehsil se milega — free hai"
       ↓
"Ye 3 documents hain tumhare paas, ye 2 banwane padenge"
```

---

### Feature 3: 🗣️ Multilingual AI Chat

**Supported Languages:**
- Hindi (हिंदी)
- English
- Bhojpuri
- Marathi (मराठी)
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Bengali (বাংলা)
- Gujarati (ગુજરાતી)
- Kannada (ಕನ್ನಡ)
- Odia (ଓଡ଼ିଆ)
- Punjabi (ਪੰਜਾਬੀ)

**Example Chat:**
```
User: "Mujhe kisan credit card kaise milega?"

AI: "Kisan Credit Card (KCC) ke liye ye karo:

1. Apne nearest bank branch jao
   (SBI, PNB, ya cooperative bank)

2. Ye documents le jao:
   - Aadhar card
   - Zameen ke kagaz
   - Passport photo (2)

3. Form bharo — FREE hai
   Koi charge mat dena kisiko!

Seedha apply karne ke liye:
👉 [Apply Now Button]

Koi aur sawal hai?"
```

---

### Feature 4: 📍 Nearby Help Locator

```
GPS permission lo
       ↓
Map pe dikhao:
  📍 CSC Center (0.5 km) — "Form bharne mein help milegi"
  🏦 SBI Bank (1.2 km) — "PM-KISAN ke liye"
  🏛️ Tehsil Office (2.1 km) — "Caste certificate ke liye"
  🏥 Primary Health Centre (0.8 km) — "Ayushman card ke liye"
       ↓
Directions + Timing + Phone number
```

---

### Feature 5: 🔔 Smart Reminder System

```
Reminder Types:
  1. Scheme Deadline Alert
     "PM Awas Yojana ka last date 31 March hai!"
  
  2. Document Renewal
     "Tumhara income certificate expire ho raha hai"
  
  3. New Scheme Launch
     "UP mein nayi kisan scheme launch hui — tumhare liye match hai"
  
  4. Application Status Update
     "Tumhara PM-KISAN application approve ho gaya! 
      ₹2,000 aayenge 15 din mein"
  
  5. Installment Alert
     "PM-KISAN ki nayi installment aa gayi ✅"

Delivery Channels:
  - Web notification
  - Email (Resend)
  - WhatsApp (Future)
  - SMS (Future)
```

---

### Feature 6: 📊 Application Tracker

```
My Applications Dashboard:

┌─────────────────────────────────────────┐
│ PM-KISAN Samman Nidhi          ✅ Active │
│ Applied: Jan 2026 | Next: ₹2000 in 15d  │
├─────────────────────────────────────────┤
│ PM Awas Yojana                ⏳ Pending │
│ Applied: Feb 2026 | Status: Under Review │
├─────────────────────────────────────────┤
│ Scholarship (UP Govt)         ❌ Rejected│
│ Reason: Income certificate missing       │
│ [Fix & Reapply →]                        │
└─────────────────────────────────────────┘
```

---

### Feature 7: 🆘 RTI Helper

```
Koi scheme nahi mili ya reject hui?
       ↓
AI automatically RTI draft kare:
  - Correct department select kare
  - Correct format mein likhay
  - Reference numbers dale
  - Submit guide kare
       ↓
"Ye RTI bhejo — 30 din mein jawab aana chahiye"
```

---

### Feature 8: 👨‍👩‍👧 Family Profile Manager

```
Account mein multiple profiles:
  👤 Ramesh (Self) — 47 schemes
  👤 Sita (Wife) — 31 schemes (Mahila schemes extra)
  👤 Rahul (Son, 19) — 15 schemes (Education)
  👴 Dada (Father, 68) — 22 schemes (Senior citizen)
       ↓
Har member ke liye alag recommendations
```

---

### Feature 9: 📰 Personalized News Feed

```
Tumhare liye relevant updates:
  🆕 "UP mein 50,000 kisan ka karz maaf — check karo"
  📢 "Budget 2026: 3 nayi mahila schemes launch"
  ⏰ "Ration card renewal — 30 April deadline"
  💰 "PM-KISAN 19th installment release date confirm"
```

---

### Feature 10: 🏆 Gamification & Community

```
Profile Completion:     ████████░░ 80% → Badge milega
Schemes Applied:        5 → "Active Citizen" badge
Friends Referred:       3 → ₹50 wallet credit
Village Ranking:        #2 in Prayagraj district

Leaderboard:
  🥇 Ramesh Yadav — 12 schemes applied
  🥈 Sunita Devi — 9 schemes applied
  🥉 Arun Kumar — 7 schemes applied
```

---

## 6. Technical Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                          │
│         Next.js 16 + NextUI + Tailwind CSS           │
│    React Hook Form + Zustand + TanStack Query        │
│              GSAP Animations + PWA                   │
└─────────────────┬───────────────────────────────────┘
                  │ oRPC (Type-safe API)
┌─────────────────▼───────────────────────────────────┐
│                    BACKEND                           │
│              Next.js API Routes                      │
│         Auth.js + Vercel AI SDK + Inngest            │
│              Pino Logging + Sentry                   │
└──┬──────────┬──────────┬──────────┬─────────────────┘
   │          │          │          │
   ▼          ▼          ▼          ▼
┌─────┐  ┌───────┐  ┌───────┐  ┌────────┐
│Neon │  │Upstash│  │Meili- │  │Cloudfl-│
│ DB  │  │ Redis │  │search │  │are R2  │
│(SQL)│  │(Cache)│  │(Search│  │(Files) │
└─────┘  └───────┘  └───────┘  └────────┘
```

### Tech Stack Table

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 16 | App Router, SSR, RSC |
| **UI Library** | NextUI + Tailwind | Beautiful components |
| **Animation** | GSAP | Smooth transitions |
| **State** | Zustand | Client state |
| **Server State** | TanStack Query | API data fetching |
| **Forms** | React Hook Form + Zod | Form validation |
| **Backend** | Next.js API Routes | Server-side logic |
| **API Type** | oRPC | Type-safe endpoints |
| **Auth** | Auth.js v5 | Authentication |
| **Database** | PostgreSQL (Neon) | Main data store |
| **ORM** | Prisma | Type-safe queries |
| **Cache** | Upstash Redis | Fast repeated queries |
| **Search** | Meilisearch | Scheme search engine |
| **AI** | Vercel AI SDK + OpenAI | Scheme matching + chat |
| **Queue** | Inngest | Background jobs |
| **Files** | UploadThing + R2 | Document uploads |
| **Email** | Resend | Notifications |
| **Logging** | Pino | Server logs |
| **Monitoring** | Sentry | Error tracking |
| **CMS** | Payload | Scheme content management |
| **Payments** | Dodo Payments | Premium features |
| **Realtime** | Socket.IO | Live notifications |
| **Deploy** | Vercel | Hosting |

---

## 7. Database Schema

```prisma
// packages/db/prisma/schema/

// ─── USER ───────────────────────────────────────────
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  phone         String?
  language      String    @default("hi") // hi, en, mr, ta...
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  profile       UserProfile?
  familyMembers FamilyMember[]
  applications  Application[]
  reminders     Reminder[]
  savedSchemes  SavedScheme[]
  accounts      Account[]
  sessions      Session[]
}

// ─── USER PROFILE ───────────────────────────────────
model UserProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])

  // Location
  state           String
  district        String
  pincode         String?

  // Demographics
  age             Int
  gender          String   // male/female/other
  caste           String   // general/obc/sc/st
  religion        String?

  // Economic
  annualIncome    Int
  bplCard         Boolean  @default(false)
  rationCardType  String?  // AAY/BPL/APL

  // Occupation
  occupation      String   // farmer/student/business/service/other
  landHolding     Float?   // in acres (for farmers)

  // Special Categories
  isDisabled      Boolean  @default(false)
  isWidow         Boolean  @default(false)
  isSeniorCitizen Boolean  @default(false)
  isMinority      Boolean  @default(false)

  // Aadhaar (masked)
  aadhaarLast4    String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// ─── FAMILY MEMBER ──────────────────────────────────
model FamilyMember {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id])

  name         String
  relation     String   // wife/husband/son/daughter/father/mother
  age          Int
  gender       String
  occupation   String?
  isStudent    Boolean  @default(false)

  createdAt    DateTime @default(now())
}

// ─── SCHEME ─────────────────────────────────────────
model Scheme {
  id              String   @id @default(cuid())
  slug            String   @unique

  // Basic Info
  nameHindi       String
  nameEnglish     String
  descriptionHindi String  @db.Text
  descriptionEnglish String @db.Text

  // Classification
  category        String   // health/education/agriculture/housing/employment/women/disabled/senior
  subcategory     String?
  level           String   // central/state/district
  state           String?  // null = central scheme
  ministry        String

  // Benefit
  benefitType     String   // cash/subsidy/loan/insurance/service
  benefitAmount   String?  // "₹6,000/year" or "50% subsidy"
  maxBenefit      Float?

  // Eligibility Criteria (JSON)
  eligibilityCriteria Json

  // Documents Required
  documentsRequired Json   // array of document objects

  // Application
  applicationMode String   // online/offline/both
  applicationUrl  String?
  offlineProcess  String?  @db.Text
  deadline        DateTime?
  isOngoing       Boolean  @default(true)

  // Difficulty
  difficulty      String   // easy/medium/hard

  // Stats
  totalBeneficiaries Int?
  viewCount       Int      @default(0)
  applyCount      Int      @default(0)

  // Status
  isActive        Boolean  @default(true)
  isVerified      Boolean  @default(false)
  lastUpdated     DateTime @updatedAt

  applications    Application[]
  savedBy         SavedScheme[]
  createdAt       DateTime @default(now())
}

// ─── APPLICATION ────────────────────────────────────
model Application {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  schemeId    String
  scheme      Scheme   @relation(fields: [schemeId], references: [id])

  status      String   // applied/pending/approved/rejected/cancelled
  appliedAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Tracking
  referenceNo String?
  notes       String?  @db.Text
  rejectionReason String?

  // Timeline (JSON)
  timeline    Json     @default("[]")
}

// ─── SAVED SCHEME ───────────────────────────────────
model SavedScheme {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  schemeId  String
  scheme    Scheme   @relation(fields: [schemeId], references: [id])
  savedAt   DateTime @default(now())

  @@unique([userId, schemeId])
}

// ─── REMINDER ───────────────────────────────────────
model Reminder {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])

  type      String   // deadline/renewal/new_scheme/installment
  title     String
  message   String   @db.Text
  dueDate   DateTime
  isRead    Boolean  @default(false)
  isSent    Boolean  @default(false)

  createdAt DateTime @default(now())
}

// ─── AI CHAT ────────────────────────────────────────
model ChatSession {
  id        String   @id @default(cuid())
  userId    String
  title     String?
  language  String   @default("hi")
  messages  ChatMessage[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ChatMessage {
  id        String   @id @default(cuid())
  sessionId String
  session   ChatSession @relation(fields: [sessionId], references: [id])
  role      String   // user/assistant
  content   String   @db.Text
  createdAt DateTime @default(now())
}

// ─── AUTH (NextAuth) ─────────────────────────────────
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## 8. Folder Structure

```
sarkari-saathi/
├── apps/
│   └── web/
│       ├── app/
│       │   ├── (auth)/
│       │   │   ├── login/
│       │   │   │   └── page.tsx          ← Login page
│       │   │   └── register/
│       │   │       └── page.tsx          ← Register page
│       │   │
│       │   ├── (dashboard)/
│       │   │   ├── layout.tsx            ← Dashboard layout
│       │   │   ├── page.tsx              ← Dashboard home
│       │   │   ├── profile/
│       │   │   │   └── page.tsx          ← User profile setup
│       │   │   ├── schemes/
│       │   │   │   ├── page.tsx          ← All schemes list
│       │   │   │   └── [slug]/
│       │   │   │       └── page.tsx      ← Scheme detail
│       │   │   ├── my-schemes/
│       │   │   │   └── page.tsx          ← Applied + saved schemes
│       │   │   ├── chat/
│       │   │   │   └── page.tsx          ← AI chat interface
│       │   │   ├── reminders/
│       │   │   │   └── page.tsx          ← Reminder center
│       │   │   ├── family/
│       │   │   │   └── page.tsx          ← Family profile manager
│       │   │   └── tracker/
│       │   │       └── page.tsx          ← Application tracker
│       │   │
│       │   ├── (landing)/
│       │   │   └── page.tsx              ← Landing page
│       │   │
│       │   ├── api/
│       │   │   ├── auth/[...nextauth]/
│       │   │   │   └── route.ts          ← Auth.js handler
│       │   │   ├── chat/
│       │   │   │   └── route.ts          ← AI chat API
│       │   │   ├── schemes/
│       │   │   │   └── route.ts          ← Schemes search API
│       │   │   ├── profile/
│       │   │   │   └── route.ts          ← Profile API
│       │   │   └── rpc/
│       │   │       └── [...trpc]/
│       │   │           └── route.ts      ← oRPC handler
│       │   │
│       │   ├── layout.tsx                ← Root layout
│       │   └── globals.css               ← Global styles
│       │
│       ├── components/
│       │   ├── ui/                       ← Reusable UI components
│       │   │   ├── scheme-card.tsx
│       │   │   ├── document-checklist.tsx
│       │   │   ├── ai-chat.tsx
│       │   │   ├── language-selector.tsx
│       │   │   └── reminder-bell.tsx
│       │   │
│       │   ├── layout/
│       │   │   ├── sidebar.tsx
│       │   │   ├── header.tsx
│       │   │   └── bottom-nav.tsx        ← Mobile nav
│       │   │
│       │   └── forms/
│       │       ├── profile-form.tsx      ← User profile form
│       │       └── scheme-filter-form.tsx
│       │
│       ├── lib/
│       │   ├── ai/
│       │   │   ├── scheme-matcher.ts     ← AI scheme matching logic
│       │   │   └── chat-config.ts        ← AI chat configuration
│       │   │
│       │   ├── search/
│       │   │   └── meilisearch.ts        ← Search client
│       │   │
│       │   ├── cache/
│       │   │   └── redis.ts              ← Redis client
│       │   │
│       │   └── utils/
│       │       ├── eligibility.ts        ← Eligibility checker
│       │       └── language.ts           ← Translation utils
│       │
│       ├── store/
│       │   ├── user-store.ts             ← Zustand user state
│       │   └── scheme-store.ts           ← Zustand scheme state
│       │
│       ├── types/
│       │   ├── scheme.ts
│       │   └── user.ts
│       │
│       └── .env                          ← Environment variables
│
├── packages/
│   ├── db/
│   │   └── prisma/
│   │       └── schema/                   ← Prisma schema files
│   ├── env/                              ← Type-safe env validation
│   └── config/                           ← Shared configs
│
└── turbo.json                            ← Turborepo config
```

---

## 9. UI/UX Prototype — Screen by Screen

### Screen 1: Landing Page `/`

```
┌─────────────────────────────────────────────────────┐
│  🏛️ SarkariSaathi        [Login] [Register - FREE]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│         सरकारी योजनाएं अब आसान                      │
│    "Apni haq ki scheme AI se 2 minute mein dhundho" │
│                                                     │
│    [📋 Apni Schemes Dhundho — FREE →]               │
│                                                     │
│    ✅ 1,000+ Schemes  ✅ Hindi Support  ✅ Free     │
│                                                     │
├─────────────────────────────────────────────────────┤
│  HOW IT WORKS                                       │
│  1️⃣ Profile bharo (2 min)                           │
│  2️⃣ AI schemes dhundhe (instant)                    │
│  3️⃣ Documents samjho                                │
│  4️⃣ Apply karo                                      │
├─────────────────────────────────────────────────────┤
│  STATS                                              │
│  🎯 50,000+ Users  📋 1,000+ Schemes  ⭐ 4.9/5     │
└─────────────────────────────────────────────────────┘
```

---

### Screen 2: Profile Setup `/profile`

```
┌─────────────────────────────────────────────────────┐
│  ← Back    Apni Profile Banao    Step 1/3           │
│            ████████░░░░ 60%                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📍 Location                                        │
│  State: [Uttar Pradesh        ▼]                    │
│  District: [Prayagraj         ▼]                    │
│                                                     │
│  👤 Basic Info                                      │
│  Aapki Umar: [___] saal                             │
│  Gender: (●) Male  ( ) Female  ( ) Other            │
│                                                     │
│  💰 Income & Category                               │
│  Saalana Aay: [₹ _________]                         │
│  Varg: (●) General ( ) OBC ( ) SC ( ) ST            │
│  BPL Card hai? (●) Haan ( ) Nahi                    │
│                                                     │
│  👨‍🌾 Peshaa (Occupation)                             │
│  [ ] Kisan    [ ] Student  [ ] Business             │
│  [ ] Naukri   [✓] Other                             │
│                                                     │
│            [Aage Badhein →]                         │
└─────────────────────────────────────────────────────┘
```

---

### Screen 3: AI Results Dashboard `/schemes`

```
┌─────────────────────────────────────────────────────┐
│  🏛️ SarkariSaathi    🔔 3    👤 Ramesh    [≡]       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🎉 Badhai Ho! Tumhare liye 23 schemes hain         │
│                                                     │
│  [🌾 Kisan (8)] [🎓 Shiksha (4)] [🏥 Swasth (6)]   │
│  [🏠 Awas (3)]  [💼 Rozgar (2)]  [Sab (23)]        │
│                                                     │
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐   │
│  │ 🌾 PM-KISAN Samman Nidhi          EASY ✅   │   │
│  │ Labh: ₹6,000/year                           │   │
│  │ Eligibility: 100% match 🎯                  │   │
│  │ Documents: 3 chahiye, 2 hain tumhare paas   │   │
│  │                                             │   │
│  │ [📋 Documents Dekho] [🚀 Apply Karo]        │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ 🏥 Ayushman Bharat           MEDIUM ⚠️      │   │
│  │ Labh: ₹5 lakh/year health cover             │   │
│  │ Eligibility: 95% match                      │   │
│  │ Documents: 4 chahiye, 2 hain tumhare paas   │   │
│  │                                             │   │
│  │ [📋 Documents Dekho] [🚀 Apply Karo]        │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

### Screen 4: AI Chat `/chat`

```
┌─────────────────────────────────────────────────────┐
│  ← Back    AI Saathi Chat    🇮🇳 Hindi ▼            │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🤖 Namaste Ramesh ji! Main aapka                   │
│  SarkariSaathi hoon. Kya help chahiye?              │
│                                                     │
│  Quick Options:                                     │
│  [🌾 Kisan Schemes] [🎓 Scholarship]                │
│  [🏥 Health Schemes] [🏠 Housing]                   │
│                                                     │
│  ─────────────────────────────────────             │
│                                                     │
│           "PM Kisan ka paisa kab aayega?" →         │
│                                                     │
│  🤖 PM-KISAN ki 19th installment ke baare mein:     │
│                                                     │
│  📅 Expected date: April 2026                       │
│  💰 Amount: ₹2,000                                  │
│                                                     │
│  Apna payment status check karne ke liye:          │
│  👉 pmkisan.gov.in pe jao                           │
│  👉 Aadhar ya Mobile number se login karo           │
│                                                     │
│  Aur koi sawal hai? 😊                              │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [Type karo ya bol ke puchho...    ] [🎤] [➤]      │
└─────────────────────────────────────────────────────┘
```

---

### Screen 5: Application Tracker `/tracker`

```
┌─────────────────────────────────────────────────────┐
│  ← Back         Meri Applications                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  SUMMARY                                            │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│  │  5   │ │  2   │ │  1   │ │  2   │              │
│  │Total │ │Active│ │Pending│ │Other │              │
│  └──────┘ └──────┘ └──────┘ └──────┘              │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ PM-KISAN Samman Nidhi                        │   │
│  │ ●●●●●●●●●● Applied → Approved ✅            │   │
│  │ Ref: PMKISAN2026/UP/001234                   │   │
│  │ Next installment: April 2026                 │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ PM Awas Yojana                               │   │
│  │ ●●●●●░░░░░ Applied → Under Review ⏳        │   │
│  │ Submitted: 15 Feb 2026                       │   │
│  │ Expected: 45 din                             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ UP Scholarship                  Rejected ❌  │   │
│  │ Reason: Income certificate missing           │   │
│  │ [Fix Karo aur Dobara Apply Karo →]           │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 10. API Routes

```typescript
// app/api/schemes/route.ts
// GET /api/schemes?state=UP&category=farmer&income=50000
// Returns: Matched schemes with eligibility score

// app/api/chat/route.ts  
// POST /api/chat
// Body: { messages: [], language: "hi", userId: "" }
// Returns: AI streaming response

// app/api/profile/route.ts
// POST /api/profile → Create/Update profile
// GET /api/profile → Get user profile

// app/api/applications/route.ts
// POST → Submit new application
// GET → Get user applications
// PATCH → Update application status

// app/api/reminders/route.ts
// GET → Get user reminders
// PATCH → Mark as read

// oRPC Routes (apps/web/server/routers/)
// schemes.list → List schemes with filters
// schemes.match → AI-powered scheme matching
// schemes.detail → Single scheme details
// user.profile → User profile CRUD
// user.family → Family members CRUD
// applications.track → Application tracking
```

---

## 11. AI Integration

### Scheme Matcher AI

```typescript
// lib/ai/scheme-matcher.ts

import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'

export async function matchSchemes(userProfile: UserProfile) {
  // Step 1: Search schemes from Meilisearch
  const candidateSchemes = await searchSchemes({
    state: userProfile.state,
    category: userProfile.occupation,
    caste: userProfile.caste,
  })

  // Step 2: AI eligibility check
  const { object } = await generateObject({
    model: openai('gpt-4o-mini'),
    schema: z.object({
      matchedSchemes: z.array(z.object({
        schemeId: z.string(),
        eligibilityScore: z.number().min(0).max(100),
        eligibilityReason: z.string(),
        missingDocuments: z.array(z.string()),
        priority: z.enum(['high', 'medium', 'low']),
      }))
    }),
    prompt: `
      User Profile: ${JSON.stringify(userProfile)}
      
      Available Schemes: ${JSON.stringify(candidateSchemes)}
      
      Check eligibility for each scheme and return matched schemes
      with eligibility score (0-100) and missing documents.
      Respond in ${userProfile.language} language.
    `
  })

  // Step 3: Cache result in Redis
  await redis.set(
    `schemes:${userProfile.userId}`,
    JSON.stringify(object.matchedSchemes),
    { ex: 3600 } // 1 hour cache
  )

  return object.matchedSchemes
}
```

### Multilingual Chat AI

```typescript
// app/api/chat/route.ts

import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export async function POST(req: Request) {
  const { messages, language, userId } = await req.json()

  const systemPrompt = `
    You are SarkariSaathi, an AI assistant helping Indian citizens 
    find and apply for government schemes.
    
    Rules:
    - Always respond in ${language === 'hi' ? 'Hindi' : language} language
    - Give simple, clear answers
    - Always mention official sources
    - Never ask for Aadhar/bank details in chat
    - Be empathetic and helpful
    - Use simple words, not complex terms
    
    User Context: ${userId ? `Logged in user` : 'Guest user'}
  `

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
    system: systemPrompt,
    maxTokens: 500,
  })

  return result.toDataStreamResponse()
}
```

---

## 12. Environment Variables

```env
# ─── DATABASE ───────────────────────────────────────
# Get from: https://neon.tech → New Project → Connection String
DATABASE_URL="postgresql://user:pass@ep-xxx.ap-southeast-1.neon.tech/sarkari-saathi?sslmode=require"

# ─── AUTH ────────────────────────────────────────────
# Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
NEXTAUTH_SECRET="your-random-32-char-secret-here"
NEXTAUTH_URL="http://localhost:3001"

# Google OAuth (Get from: console.cloud.google.com)
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxx"

# ─── AI ──────────────────────────────────────────────
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY="sk-proj-xxx"

# ─── CACHE ───────────────────────────────────────────
# Get from: https://upstash.com → Create Database → REST API
UPSTASH_REDIS_REST_URL="https://xxx-ap-southeast-1.upstash.io"
UPSTASH_REDIS_REST_TOKEN="AXxxxx"

# ─── SEARCH ──────────────────────────────────────────
# Get from: https://cloud.meilisearch.com
MEILISEARCH_HOST="https://xxx.meilisearch.io"
MEILISEARCH_API_KEY="masterKey_xxx"

# ─── FILE UPLOAD ─────────────────────────────────────
# Get from: https://uploadthing.com → Dashboard → API Keys
UPLOADTHING_SECRET="sk_live_xxx"
UPLOADTHING_APP_ID="xxx"

# ─── FILE STORAGE ────────────────────────────────────
# Get from: Cloudflare Dashboard → R2 → Create Bucket
CLOUDFLARE_R2_ACCOUNT_ID="xxx"
CLOUDFLARE_R2_ACCESS_KEY_ID="xxx"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="xxx"
CLOUDFLARE_R2_BUCKET_NAME="sarkari-saathi-docs"

# ─── EMAIL ───────────────────────────────────────────
# Get from: https://resend.com → API Keys
RESEND_API_KEY="re_xxx"

# ─── MONITORING ──────────────────────────────────────
# Get from: https://sentry.io → New Project → DSN
SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"
NEXT_PUBLIC_SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"

# ─── JOB QUEUE ───────────────────────────────────────
# Get from: https://inngest.com → Event Keys
INNGEST_EVENT_KEY="evt_xxx"
INNGEST_SIGNING_KEY="signkey_xxx"

# ─── PAYMENTS ────────────────────────────────────────
# Get from: https://dodopayments.com → Dashboard
DODO_API_KEY="dodo_live_xxx"
DODO_WEBHOOK_SECRET="whsec_xxx"

# ─── APP ─────────────────────────────────────────────
NEXT_PUBLIC_APP_URL="http://localhost:3001"
NEXT_PUBLIC_APP_NAME="SarkariSaathi"
NODE_ENV="development"
```

---

## 13. Build Roadmap

### Phase 1 — MVP (Month 1-2) 🎯

```
Week 1-2: Foundation
  ✅ Project setup (already done!)
  ✅ Database schema setup
  ✅ Auth (login/register)
  ✅ Basic UI layout

Week 3-4: Core Features
  ✅ Profile form (state, income, caste, occupation)
  ✅ Scheme database (seed 100 central schemes)
  ✅ Basic scheme matching (rule-based first)
  ✅ Scheme detail page + documents list

Week 5-6: AI Integration
  ✅ AI scheme matcher (OpenAI)
  ✅ Multilingual AI chat (Hindi + English)
  ✅ Redis caching
  ✅ Meilisearch integration

Week 7-8: Polish
  ✅ Application tracker
  ✅ Reminders system
  ✅ PWA setup
  ✅ Mobile responsive
  ✅ Deploy to Vercel
```

### Phase 2 — Growth (Month 3-4)

```
  ✅ 500 schemes database
  ✅ 5 regional languages add
  ✅ Nearby CSC locator (Google Maps)
  ✅ WhatsApp bot (Twilio)
  ✅ Family profile manager
  ✅ RTI helper
  ✅ SEO optimization
  ✅ SIH/hackathon participation
```

### Phase 3 — Scale (Month 5-6)

```
  ✅ 1000+ schemes
  ✅ All Indian languages
  ✅ B2G dashboard (sell to govts)
  ✅ CSC operator panel
  ✅ NGO partnership portal
  ✅ Analytics dashboard
  ✅ Premium subscription
  ✅ Voice input (regional languages)
```

---

## 14. Revenue Model

| Stream | Description | Potential |
|---|---|---|
| **Freemium** | Basic free, Premium ₹99/month (unlimited AI chat, priority support) | ₹10L+/month at scale |
| **B2G Contracts** | Sell analytics dashboard to state governments | ₹50L+ per contract |
| **CSC Partners** | ₹500/month per CSC operator for pro tools | ₹5L+/month |
| **NGO White-label** | Custom branded solution for NGOs | ₹2-10L per NGO |
| **Data Insights** | Anonymized scheme uptake data to researchers | ₹5-20L/year |

---

## 15. Funding Strategy

### Immediate (0-3 months)

```
1. Smart India Hackathon 2025
   Prize: ₹1 lakh
   How: Register team, submit proposal

2. MyGov Innovation Challenge
   Prize: ₹2-10 lakh
   How: Submit on mygov.in

3. Innovate India
   Prize: ₹5 lakh
   How: innovateindia.mygov.in
```

### Short Term (3-6 months)

```
1. Startup India Registration
   Benefit: Tax exemption + credibility
   How: startupindia.gov.in

2. MeitY Startup Hub
   Grant: ₹25 lakh (equity-free)
   How: Apply at startup.meity.gov.in

3. NASSCOM Foundation
   Grant: ₹10-50 lakh
   How: nasscomfoundation.org
```

### Medium Term (6-12 months)

```
1. Omidyar Network India
   Investment: $250K - $2M
   Focus: Financial inclusion, civic tech

2. Lok Capital
   Investment: ₹50L - 5Cr
   Focus: Rural India, social impact

3. iSPIRT
   Support: Network + mentorship
   How: ispirt.in
```

### Pitch Deck Key Points

```
Problem:  50 crore Indians missing out on schemes
Solution: AI-powered scheme finder in their language
Traction: X users, Y schemes applied, Z success stories
Market:   ₹1000 crore+ opportunity
Team:     Technical + domain expertise
Ask:      ₹50 lakh for 18 months runway
```

---

## 16. AI Agent Prompt

**Copy this prompt and paste in Claude Code or Cursor:**

```
You are an expert Full Stack Developer building "SarkariSaathi" — an AI-powered government scheme finder for Indian citizens.

READ the CLAUDE.md file first to understand project structure.

PROJECT DETAILS:
- Name: SarkariSaathi (सरकारी साथी)
- Purpose: Help Indians find and apply for government schemes using AI
- Stack: Next.js 16 + Vercel AI SDK + Prisma + Neon PostgreSQL + Meilisearch + Redis

TASKS TO COMPLETE:

1. DATABASE SETUP
   - Apply this Prisma schema: User, UserProfile, FamilyMember, Scheme, Application, SavedScheme, Reminder, ChatSession, ChatMessage
   - Run: npx prisma generate && npx prisma db push
   - Seed 10 sample schemes (PM-KISAN, Ayushman Bharat, PM Awas Yojana etc.)

2. ENVIRONMENT SETUP
   - Fix apps/web/.env with all required variables (with comments)
   - Key vars: DATABASE_URL, NEXTAUTH_SECRET, OPENAI_API_KEY, UPSTASH_REDIS_REST_URL

3. CORE PAGES BUILD
   a. Landing page / — Hindi tagline, CTA button, how it works section
   b. Profile setup /profile — Multi-step form (location, demographics, income, occupation)
   c. Schemes /schemes — AI-matched scheme cards with eligibility score
   d. Scheme detail /schemes/[slug] — Full info + document checklist
   e. AI Chat /chat — Multilingual chat interface
   f. Tracker /tracker — Application status tracking

4. AI FEATURES
   a. Scheme matcher API: POST /api/schemes/match
      - Takes user profile
      - Searches Meilisearch for candidate schemes  
      - Uses OpenAI to check eligibility
      - Returns ranked schemes with scores
      - Caches in Redis for 1 hour
   
   b. Chat API: POST /api/chat
      - Multilingual (Hindi/English default)
      - System prompt: helpful government scheme assistant
      - Stream response using Vercel AI SDK
      - Save chat history to database

5. UI REQUIREMENTS
   - Language: Hindi as default, English toggle
   - Mobile-first responsive design
   - NextUI components throughout
   - GSAP animations on page transitions
   - Government-trust color scheme (Navy blue + Saffron + White)
   - Accessibility: large fonts, high contrast

6. COMPONENT LIST
   - SchemeCard — shows scheme name, benefit, eligibility %, difficulty badge
   - DocumentChecklist — shows required docs with have/need status
   - ProfileForm — multi-step with progress bar
   - AIChatInterface — ChatGPT-like interface in Hindi
   - ApplicationTracker — timeline-based status view
   - ReminderBell — notification dropdown
   - LanguageSelector — flag + language dropdown

Start with task 1 (database), then proceed step by step.
Tell me progress at each step.
```

---

## ✅ Quick Start Checklist

```
□ pnpm install — dependencies install
□ .env file fill karo (Neon DB URL minimum)
□ npx prisma db push — database tables banao
□ pnpm run db:generate — Prisma client generate
□ pnpm dev — development server start
□ localhost:3001 pe open karo
□ Landing page dekhna
□ Register karna
□ Profile fill karna
□ Schemes dekhna
□ AI chat try karna
```

---

*SarkariSaathi — Built with ❤️ for Bharat 🇮🇳*
*"Technology se sashakt, schemes se samridh"*