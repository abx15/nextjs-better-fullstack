# 🏛️ SarkariSaathi - सरकारी योजनाएं अब आसान

<div align="center">

![SarkariSaathi Logo](https://img.shields.io/badge/🏛️-SarkariSaathi-FF6B00?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.2.1-000000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-008000?style=for-the-badge)

**A comprehensive AI-powered government scheme discovery platform with complete Hindi/English bilingual support**

[🚀 Live Demo](https://sarkari-saathi.vercel.app) • [📖 Documentation](#-documentation) • [🤝 Contributing](#-contributing) • [📞 Support](#-support)

</div>

---

## 📋 Table of Contents

- [🌟 About](#-about)
- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Installation](#️-installation)
- [📁 Project Structure](#-project-structure)
- [🌐 Language Support](#-language-support)
- [🎨 Design System](#-design-system)
- [🔧 Configuration](#-configuration)
- [📊 Available Features](#-available-features)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 About

**SarkariSaathi** is a revolutionary platform that bridges the gap between Indian citizens and government welfare schemes. Using advanced AI technology and complete bilingual support, we make government schemes accessible to everyone, regardless of their language preference or technical expertise.

### 🎯 Our Mission
> *"हर भारतीय को सरकारी योजनाओं का लाभ दिलाना"*  
> *"Helping every Indian access government schemes"*

### 🏆 Key Achievements
- 🌍 **Complete Bilingual Support** - Hindi & English throughout
- 🤖 **AI-Powered Matching** - Smart scheme recommendations
- 📱 **Mobile-First Design** - Works perfectly on all devices
- 🔐 **Secure Authentication** - Google OAuth & Email/Password
- 📊 **Real-Time Tracking** - Application status updates
- 🎯 **500+ Government Schemes** - Central, State & UT schemes

---

## ✨ Features

### 🚀 Phase 3 Complete - Full Dashboard & Language System

#### 🌍 Complete Bilingual Support
- **हिंदी (Hindi)** - Full Hindi interface with Devanagari script
- **English** - Complete English language support  
- **Dynamic Language Switching** - Toggle between languages instantly
- **Localized Content** - All UI elements, dates, and content translated
- **Persistent Language Preference** - User's language choice saved across sessions
- **Date Localization** - Hindi (hi-IN) and English (en-US) date formatting

#### 📊 Complete Dashboard System
- **🏠 Welcome Dashboard** - Personalized user dashboard with statistics
- **🔍 Scheme Finder** - AI-powered scheme search and advanced filtering
- **📊 Application Tracker** - Real-time application status tracking
- **💬 AI Chat Assistant** - 24/7 bilingual chat support with voice features
- **📋 Document Management** - Secure document upload and storage
- **🔔 Reminder System** - Smart deadline reminders and notifications
- **📱 Mobile Navigation** - Responsive mobile-first design with bottom navigation

#### 🎨 Advanced UI/UX Design
- **Modern Dashboard Layout** - Professional sidebar navigation
- **Interactive Components** - Cards, badges, buttons with smooth hover effects
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **SarkariSaathi Design System** - Navy (#1a3a6b) and Saffron (#FF6B00) theme
- **Smooth Animations** - GSAP-powered transitions and micro-interactions
- **Dark Theme Support** - Consistent color scheme throughout

#### 🤖 Enhanced AI Integration
- **Language-Aware API** - API responses in user's preferred language
- **Smart Scheme Matching** - AI-powered recommendations based on user profile
- **Voice Assistant Ready** - Sarvam TTS integration for voice features
- **Multilingual Chat** - Natural conversation in Hindi and English

### 🔐 Authentication & Profile System

#### Complete Authentication
- **NextAuth.js Integration** - Secure authentication system
- **Google OAuth** - One-click Google login
- **Email/Password** - Traditional registration system
- **Hindi Interface** - Complete Hindi language support in auth flows
- **Session Management** - Secure session handling
- **Password Security** - Strong password requirements and hashing

#### Multi-Step Profile Setup
- **4-Step Onboarding** - Comprehensive user profile collection
- **Location Information** - State, district, and regional data
- **Economic Details** - Income, BPL card, caste categories
- **Occupation Data** - Employment and special categories
- **GSAP Animations** - Smooth transitions between steps
- **Edit Functionality** - Update profile information anytime

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **PostgreSQL** database
- **Git** for version control

### One-Click Setup
```bash
# Clone the repository
git clone https://github.com/abx15/nextjs-better-fullstack.git
cd SarkariSaathi

# Install dependencies
pnpm install

# Setup environment
cp apps/web/.env.example apps/web/.env

# Start development server
pnpm run dev
```

🎉 **Open [http://localhost:3001](http://localhost:3001) to view your application!**

---

## 🛠️ Installation

### Detailed Setup Guide

#### 1. Clone Repository
```bash
git clone https://github.com/abx15/nextjs-better-fullstack.git
cd SarkariSaathi
```

#### 2. Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

#### 3. Environment Configuration
```bash
# Copy environment template
cp apps/web/.env.example apps/web/.env.local
```

Configure your environment variables:
```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/sarkarisaathi"

# Authentication
AUTH_SECRET="your-super-secret-key-here"
AUTH_GOOGLE_ID="your-google-oauth-client-id"
AUTH_GOOGLE_SECRET="your-google-oauth-client-secret"

# AI Services (Optional)
SARVAM_API_KEY="your-sarvam-ai-api-key"

# Redis (Optional, for caching)
REDIS_URL="redis://localhost:6379"
```

#### 4. Database Setup
```bash
# Generate Prisma client
pnpm run db:generate

# Push schema to database
pnpm run db:push

# (Optional) View database in GUI
pnpm run db:studio
```

#### 5. Start Development
```bash
# Start all applications
pnpm run dev

# Or start only web app
cd apps/web && pnpm run dev
```

---

## 📁 Project Structure

```
SarkariSaathi/
├── 📂 apps/
│   └── 📂 web/                     # Main Next.js application
│       ├── 📂 src/
│       │   ├── 📂 app/              # App Router pages
│       │   │   ├── 📂 (auth)/       # Authentication pages
│       │   │   │   ├── login.tsx
│       │   │   │   ├── register.tsx
│       │   │   │   └── forgot-password.tsx
│       │   │   ├── 📂 (dashboard)/   # Dashboard pages
│       │   │   │   ├── layout.tsx    # Dashboard layout
│       │   │   │   ├── page.tsx      # Main dashboard
│       │   │   │   ├── finder.tsx    # Scheme finder
│       │   │   │   ├── chat.tsx      # AI chat
│       │   │   │   └── tracker.tsx   # Application tracker
│       │   │   ├── 📂 (landing)/     # Landing pages
│       │   │   ├── 📂 api/           # API routes
│       │   │   │   ├── auth/
│       │   │   │   ├── dashboard/
│       │   │   │   └── schemes/
│       │   │   ├── page.tsx          # Home page
│       │   │   └── layout.tsx        # Root layout
│       │   ├── 📂 components/        # React components
│       │   │   ├── 📂 ui/            # shadcn/ui components
│       │   │   ├── 📂 sarkari/       # Custom components
│       │   │   └── 📂 layout/        # Layout components
│       │   ├── 📂 contexts/         # React contexts
│       │   │   └── language-context.tsx
│       │   ├── 📂 lib/              # Utilities
│       │   │   ├── i18n.ts          # Translations
│       │   │   └── ai/              # AI integrations
│       │   └── 📂 store/            # State management
│       └── 📂 public/               # Static assets
├── 📂 packages/
│   ├── 📂 db/                       # Database layer
│   │   ├── 📂 prisma/               # Database schema
│   │   └── 📂 src/                  # Database utilities
│   ├── 📂 api/                      # API layer
│   ├── 📂 config/                   # Shared configuration
│   └── 📂 env/                      # Environment variables
├── 📄 README.md                     # This file
├── 📄 package.json                  # Root package.json
└── 📄 turbo.json                   # Turborepo config
```

---

## 🌐 Language Support

### 🎯 Complete Bilingual Implementation

#### Architecture Overview
```typescript
// Language Context Hook
import { useLanguage } from "@/contexts/language-context";

const { language, setLanguage, t } = useLanguage();

// Usage in components
<button onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}>
  {t('languageToggle')}
</button>
```

#### Supported Languages
| Language | Code | Status | Coverage |
|-----------|------|--------|----------|
| **हिंदी** | `hi` | ✅ Complete | 100% |
| **English** | `en` | ✅ Complete | 100% |

#### Features
- **Instant Switching** - No page reload required
- **Complete Translation** - All UI elements, buttons, labels
- **Date Localization** - Proper date formatting for each language
- **Number Formatting** - Locale-specific number formats
- **RTL Support Ready** - Prepared for right-to-left languages
- **API Integration** - Server responds in user's preferred language

#### Translation Files Structure
```typescript
// src/lib/i18n.ts
export const translations = {
  hi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    finder: "योजना खोजें",
    // ... 50+ more translations
  },
  en: {
    // Navigation  
    dashboard: "Dashboard",
    finder: "Scheme Finder",
    // ... 50+ more translations
  }
};
```

---

## 🎨 Design System

### 🎨 Color Palette
```css
/* Primary Colors */
--sarkari-navy: #1a3a6b;        /* Main brand color */
--sarkari-saffron: #FF6B00;    /* Accent color */
--sarkari-green: #138808;       /* Success color */

/* Neutral Colors */
--gray-50: #f9fafb;
--gray-900: #111827;

/* Semantic Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
```

### 📝 Typography
```css
/* Hindi Font */
--font-hindi: 'Noto Sans Devanagari', sans-serif;

/* English Font */
--font-english: 'Inter', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
```

### 📱 Responsive Breakpoints
| Breakpoint | Screen Width | Usage |
|------------|--------------|-------|
| Mobile | < 768px | Single column, bottom navigation |
| Tablet | 768px - 1024px | Two columns, adapted layout |
| Desktop | > 1024px | Full multi-column layout |

---

## 🔧 Configuration

### 📋 Available Scripts

#### Development Commands
```bash
# Start development server
pnpm run dev

# Start only web application
pnpm run dev:web

# Type checking
pnpm run check-types
```

#### Database Commands
```bash
# Generate Prisma client
pnpm run db:generate

# Push schema to database
pnpm run db:push

# Open Prisma Studio
pnpm run db:studio

# Run migrations
pnpm run db:migrate
```

#### Build & Deploy
```bash
# Build for production
pnpm run build

# Start production server
pnpm run start

# Code quality checks
pnpm run check
```

### 🔧 Environment Variables

#### Required Variables
```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/db"

# Authentication
AUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3001"
```

#### Optional Variables
```env
# Google OAuth
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# AI Services
SARVAM_API_KEY="your-sarvam-api-key"

# Redis (Caching)
REDIS_URL="redis://localhost:6379"
```

---

## 📊 Available Features

### 🏠 Dashboard Features

#### Main Dashboard (`/dashboard`)
- **Welcome Section** - Personalized greeting with date
- **Statistics Cards** - Application stats with animations
- **Matched Schemes** - AI-recommended schemes for user
- **Recent Activity** - Latest application updates
- **Quick Actions** - Easy access to common tasks
- **Reminders** - Upcoming deadlines and notifications

#### Scheme Finder (`/dashboard/finder`)
- **Advanced Search** - Filter by category, state, eligibility
- **AI Matching** - Smart scheme recommendations
- **Scheme Cards** - Detailed scheme information
- **Save Options** - Bookmark favorite schemes
- **Application Links** - Direct apply buttons

#### AI Chat Assistant (`/dashboard/chat`)
- **Bilingual Chat** - Hindi and English support
- **Voice Input** - Speech-to-text functionality
- **Text-to-Speech** - Voice responses
- **Session History** - Chat conversation logs
- **Quick Questions** - Pre-defined common queries

#### Application Tracker (`/dashboard/tracker`)
- **Status Overview** - All applications in one place
- **Timeline View** - Application progress tracking
- **Document Upload** - Secure file management
- **Deadline Alerts** - Important date reminders
- **Action Buttons** - Next steps for each application

### 🔐 Authentication Features

#### User Registration
- **Email/Password** - Traditional signup
- **Google OAuth** - One-click registration
- **Phone Number** - Mobile verification (coming soon)
- **Hindi Interface** - Complete Hindi language support

#### Profile Setup
- **Multi-Step Process** - 4-step guided setup
- **Location Data** - State, district, pincode
- **Economic Information** - Income, occupation, categories
- **Document Upload** - Required documents
- **Progress Saving** - Save and continue later

### 🌐 Language Features

#### Language Switching
- **Header Toggle** - Easy language switcher
- **Instant Update** - No page reload needed
- **Persistent Choice** - Remember user preference
- **Complete Coverage** - All pages support both languages

#### Translation Quality
- **Native Hindi** - Proper Devanagari script
- **Professional English** - Clear, natural language
- **Consistent Terminology** - Standardized translations
- **Cultural Context** - Culturally appropriate content

---

## 🚀 Deployment

### 🌐 Production Deployment

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Deploy with custom domain
vercel --prod
```

#### Docker Deployment
```bash
# Build Docker image
docker build -t sarkari-saathi .

# Run container
docker run -p 3000:3000 sarkari-saathi
```

#### Manual Deployment
```bash
# Build for production
pnpm run build

# Start production server
pnpm run start
```

### 🔧 Environment Setup

#### Production Environment
```env
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://your-domain.com"

# Production Database
DATABASE_URL="your-production-database-url"

# Production Auth
AUTH_SECRET="your-production-secret"
AUTH_GOOGLE_ID="your-production-google-id"
AUTH_GOOGLE_SECRET="your-production-google-secret"

# Production AI Services
SARVAM_API_KEY="your-production-sarvam-key"
```

### 📊 Performance Optimization

#### Built-in Optimizations
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic route-based splitting
- **Caching Strategy** - Redis for API responses
- **Bundle Analysis** - Optimized package sizes
- **Lazy Loading** - Component and route lazy loading

#### Performance Metrics
- **Lighthouse Score**: 95+
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

---

## 🤝 Contributing

### 🎯 How to Contribute

#### 1. Fork the Repository
```bash
# Fork on GitHub
# Clone your fork
git clone https://github.com/yourusername/sarkari-saathi.git
cd sarkari-saathi
```

#### 2. Create Feature Branch
```bash
# Create and switch to new branch
git checkout -b feature/amazing-feature

# Or for bug fixes
git checkout -b fix/issue-description
```

#### 3. Make Changes
- Follow the existing code style
- Add tests for new features
- Update documentation
- Ensure all tests pass

#### 4. Submit Pull Request
```bash
# Commit your changes
git commit -m "feat: add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Create Pull Request on GitHub
```

### 📝 Development Guidelines

#### Code Style
- **TypeScript** - Use strict TypeScript
- **ESLint** - Follow linting rules
- **Prettier** - Use consistent formatting
- **Components** - Keep components small and focused

#### Language Support
- **Hindi First** - Prioritize Hindi translations
- **English Quality** - Ensure professional English
- **Consistency** - Use consistent terminology
- **Cultural Context** - Consider cultural nuances

#### Testing
- **Unit Tests** - Test individual components
- **Integration Tests** - Test API endpoints
- **E2E Tests** - Test user workflows
- **Language Tests** - Verify both languages work

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 📋 License Summary
- ✅ **Commercial Use** - Use in commercial projects
- ✅ **Modification** - Modify the code
- ✅ **Distribution** - Distribute your modifications
- ✅ **Private Use** - Use privately
- ❌ **Liability** - No warranty provided
- ❌ **Trademark** - Cannot use trademark

---

## 🙏 Acknowledgments

### 🏛️ Government Partners
- **Government of India** - For scheme data and APIs
- **State Governments** - Regional scheme information
- **Digital India Initiative** - Inspiration and support

### 🤖 Technology Partners
- **Sarvam AI** - Multilingual AI capabilities
- **NextAuth.js** - Authentication solution
- **Vercel** - Hosting platform
- **Prisma** - Database ORM

### 🌟 Open Source Community
- **Next.js Team** - Amazing React framework
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **All Contributors** - For making this project possible

---

## 📞 Support & Contact

### 🆘 Get Help

#### Documentation
- **📖 User Guide** - [Visit our docs](https://sarkari-saathi.vercel.app/docs)
- **🔧 API Reference** - [API Documentation](https://sarkari-saathi.vercel.app/api-docs)
- **🎯 Tutorials** - [Video Tutorials](https://youtube.com/sarkari-saathi)

#### Community Support
- **💬 Discord** - [Join our Discord](https://discord.gg/sarkari-saathi)
- **🐦 Twitter** - [@SarkariSaathi](https://twitter.com/SarkariSaathi)
- **📧 Email** - support@sarkarisaathi.in

#### Report Issues
- **🐛 Bug Reports** - [Report on GitHub](https://github.com/abx15/nextjs-better-fullstack/issues)
- **💡 Feature Requests** - [Suggest features](https://github.com/abx15/nextjs-better-fullstack/discussions)
- **📧 Security Issues** - security@sarkarisaathi.in

### 📱 Social Media

#### Follow Us
- **📘 Facebook** - [SarkariSaathi](https://facebook.com/SarkariSaathi)
- **📷 Instagram** - [@sarkari_saathi](https://instagram.com/sarkari_saathi)
- **💼 LinkedIn** - [SarkariSaathi](https://linkedin.com/company/sarkari-saathi)
- **🎥 YouTube** - [SarkariSaathi Official](https://youtube.com/c/sarkari-saathi)

---

## 🚀 Roadmap

### 📅 Upcoming Features (Phase 4)

#### 🎯 Enhanced AI Features
- **🤖 Advanced Chat** - More sophisticated AI conversations
- **📊 Predictive Analytics** - Scheme success predictions
- **🔍 Smart Search** - Natural language scheme search
- **📱 Voice Commands** - Complete voice control

#### 📊 Advanced Analytics
- **📈 User Dashboard** - Detailed usage analytics
- **🎯 Success Metrics** - Scheme success tracking
- **📊 Government Insights** - Anonymized usage data for government
- **🔍 Trend Analysis** - Popular schemes and trends

#### 🌐 Expansion Plans
- **🗺️ More Languages** - Support for 12+ Indian languages
- **🌍 International** - Adapt for other countries
- **📱 Mobile Apps** - Native Android and iOS apps
- **💼 B2B Solutions** - Enterprise and NGO versions

### 🎯 Long-term Vision

#### 🏛️ Government Integration
- **🔗 Official APIs** - Direct government data integration
- **📋 Digital Applications** - Direct scheme applications
- **🏆 Success Stories** - User success tracking
- **📊 Impact Measurement** - Social impact metrics

#### 🌟 Community Features
- **👥 User Community** - Peer support and discussions
- **🎓 Educational Content** - Scheme guidance and tutorials
- **🏆 Success Stories** - User testimonials and case studies
- **🤝 Partnerships** - NGO and corporate partnerships

---

<div align="center">

### 🎉 Made with ❤️ for the People of India

**🏛️ SarkariSaathi - Empowering Every Indian with Government Schemes**

[⭐ Star This Repo](https://github.com/abx15/nextjs-better-fullstack) • [🍴 Fork This Repo](https://github.com/abx15/nextjs-better-fullstack/fork) • [🐛 Report Issues](https://github.com/abx15/nextjs-better-fullstack/issues)

---

**© 2026 SarkariSaathi. All rights reserved.**

*"सरकारी योजनाओं का लाभ हर भारतीय तक पहुंचाना"*  
*"Delivering government scheme benefits to every Indian"*

</div>
