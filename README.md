# 🏛️ SarkariSaathi - सरकारी योजनाएं अब आसान

A comprehensive government scheme discovery platform that helps Indian citizens find and apply for relevant government schemes using AI-powered matching and complete bilingual support.

## 🌟 Features

### 🚀 Phase 3 Complete - Full Dashboard & Language Switching

- **🌍 Complete Bilingual Support**
  - **हिंदी (Hindi)** - Full Hindi interface with Devanagari script
  - **English** - Complete English language support
  - **Dynamic Language Switching** - Toggle between languages instantly
  - **Localized Content** - All UI elements, dates, and content translated
  - **Persistent Language Preference** - User's language choice saved across sessions

- **� Complete Dashboard System**
  - **Welcome Dashboard** - Personalized user dashboard with statistics
  - **Scheme Finder** - AI-powered scheme search and filtering
  - **Application Tracker** - Real-time application status tracking
  - **AI Chat Assistant** - 24/7 bilingual chat support
  - **Document Management** - Secure document upload and storage
  - **Reminder System** - Smart deadline reminders
  - **Mobile Navigation** - Responsive mobile-first design

- **🎨 Advanced UI/UX**
  - **Modern Dashboard Layout** - Sidebar navigation with mobile bottom nav
  - **Interactive Components** - Cards, badges, buttons with hover effects
  - **Responsive Design** - Optimized for desktop, tablet, and mobile
  - **Dark Theme Ready** - Consistent color scheme (Navy #1a3a6b, Saffron #FF6B00)
  - **Smooth Animations** - GSAP-powered transitions and micro-interactions

- **🤖 Enhanced AI Integration**
  - **Language-Aware API** - API responses in user's preferred language
  - **Smart Scheme Matching** - AI-powered recommendations
  - **Voice Assistant Ready** - Sarvam TTS integration
  - **Multilingual Chat** - Hindi and English conversation support

### 🔐 Phase 2 Features - Authentication & Profile Setup

- **Complete Authentication System**
  - NextAuth.js with Google OAuth & Email/Password login
  - Hindi language interface with localized validation messages
  - Split layout design (branding left, form right) for auth pages
  - Password strength indicators and secure registration

- **Multi-Step Profile Setup**
  - 4-step comprehensive user onboarding with GSAP animations
  - Location & Basic Info (state, district, age, gender)
  - Economic Information (income, BPL card, caste category)
  - Occupation & Special Categories (farmer, student, disability, etc.)

### 🛠️ Tech Stack

- **Frontend**: Next.js 16.2.1, React 18, TypeScript
- **Styling**: TailwindCSS, shadcn/ui, Radix UI
- **Authentication**: NextAuth.js v5 (beta)
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand, React Hook Form
- **Language**: Custom i18n system with Hindi/English support
- **Animations**: GSAP
- **AI**: Sarvam AI (Speech & Voice)
- **Build Tools**: Turborepo, Biome, Husky
- **Deployment**: PWA ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials (optional)

### Installation

1. **Clone and install dependencies**:
```bash
git clone https://github.com/abx15/nextjs-better-fullstack.git
cd SarkariSaathi
pnpm install
```

2. **Environment Setup**:
Copy `.env.example` to `.env` and configure:
```bash
cp apps/web/.env.example apps/web/.env
```

Required environment variables:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sarkarisaathi"

# Auth
AUTH_SECRET="your-secret-key"
AUTH_GOOGLE_ID="your-google-oauth-id"
AUTH_GOOGLE_SECRET="your-google-oauth-secret"

# Sarvam AI (optional)
SARVAM_API_KEY="your-sarvam-api-key"
```

3. **Database Setup**:
```bash
pnpm run db:push
```

4. **Start Development Server**:
```bash
pnpm run dev
```

Open [http://localhost:3003](http://localhost:3003) to view the application.

## 🗂️ Project Structure

```
SarkariSaathi/
├── apps/
│   └── web/                 # Next.js frontend application
│       ├── src/
│       │   ├── app/         # App router pages
│       │   │   ├── (auth)/  # Authentication pages
│       │   │   ├── profile/ # Profile setup
│       │   │   └── api/     # API routes
│       │   ├── components/  # React components
│       │   └── lib/         # Utilities & configurations
│       └── auth.ts          # NextAuth configuration
├── packages/
│   ├── api/                 # API layer
│   ├── db/                  # Database schema & Prisma
│   └── env/                 # Environment variables
└── README.md
```

## 📋 Available Scripts

### Development
- `pnpm run dev`: Start all applications in development mode
- `pnpm run build`: Build all applications for production
- `pnpm run check-types`: Check TypeScript types across all apps

### Database
- `pnpm run db:push`: Push schema changes to database
- `pnpm run db:studio`: Open Prisma database studio UI
- `pnpm run db:generate`: Generate Prisma client

### Code Quality
- `pnpm run check`: Run Biome formatting and linting
- `pnpm run prepare`: Initialize Git hooks

### PWA (Optional)
- `cd apps/web && pnpm run generate-pwa-assets`: Generate PWA assets

## 🌐 Application Routes

### Public Routes
- `/` - Landing page with bilingual support
- `/login` - User login page (Hindi/English)
- `/register` - User registration page (Hindi/English)
- `/about` - About page with language switching
- `/test-language` - Language switching test page

### Protected Routes (Authentication Required)
- `/dashboard` - Main user dashboard with bilingual interface
- `/dashboard/finder` - AI-powered scheme finder
- `/dashboard/chat` - Bilingual AI chat assistant
- `/dashboard/tracker` - Application status tracker
- `/dashboard/my-schemes` - Personal scheme collection
- `/dashboard/reminders` - Deadline reminders
- `/dashboard/settings` - User settings with language preferences
- `/profile/setup` - Multi-step profile setup

### Admin Routes (Admin Role Required)
- `/admin` - Admin dashboard (coming soon)

### API Routes
- `/api/auth/[...nextauth]` - NextAuth.js endpoints
- `/api/auth/register` - User registration
- `/api/profile` - Profile management
- `/api/dashboard` - Dashboard data with language support
- `/api/schemes/match` - AI scheme matching
- `/api/applications` - Application management
- `/api/tts` - Text-to-speech (Sarvam AI)

## 🎨 Design System

### Colors
- **Primary**: Navy Blue (#1a3a6b)
- **Secondary**: Saffron (#FF6B00)
- **Accent**: India flag colors (orange, white, green)

### Typography
- **Hindi**: Noto Sans Devanagari
- **English**: Inter font family

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌍 Language Switching Implementation

### Architecture
- **Language Context**: Global React context for language state management
- **Translation System**: Custom i18n implementation with Hindi/English support
- **Persistent Storage**: User language preference saved in Zustand store
- **API Integration**: Language-aware API responses

### Features
- **Instant Switching**: Toggle between Hindi and English without page reload
- **Complete Translation**: All UI elements, buttons, labels, and content
- **Date Localization**: Hindi (hi-IN) and English (en-US) date formatting
- **API Responses**: Server returns content in user's preferred language
- **Mobile Support**: Responsive language toggle for all screen sizes

### Usage Example
```typescript
import { useLanguage } from "@/contexts/language-context";

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <p>{t('welcomeMessage')}</p>
      <button onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}>
        {language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
      </button>
    </div>
  );
}
```

## 🔐 Authentication Flow

1. **Registration**: Users create account with email/phone or Google OAuth
2. **Profile Setup**: 4-step comprehensive profile collection
3. **Verification**: Email verification (optional)
4. **Login**: Secure login with session management
5. **Access**: Role-based access to protected routes

## 🤖 AI Features (Phase 3)

- **Voice Search**: Speech-to-text with Sarvam AI
- **Multilingual Support**: 12+ Indian languages
- **Smart Matching**: AI-powered scheme recommendations
- **Text-to-Speech**: Audio output for accessibility

## 📱 Mobile App Features

- **PWA Ready**: Installable on mobile devices
- **Offline Support**: Core functionality available offline
- **Push Notifications**: Scheme deadline reminders
- **Responsive Design**: Optimized for all screen sizes

## 🚀 Deployment

### Environment Variables
```env
# Production
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://your-domain.com"

# Database (Neon, AWS R2, etc.)
DATABASE_URL="your-production-database-url"

# Auth
AUTH_SECRET="your-production-secret"
AUTH_GOOGLE_ID="your-production-google-id"
AUTH_GOOGLE_SECRET="your-production-google-secret"

# AI Services
SARVAM_API_KEY="your-production-sarvam-key"
```

### Build & Deploy
```bash
# Build for production
pnpm run build

# Start production server
pnpm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Government of India** for scheme data
- **Sarvam AI** for multilingual AI capabilities
- **NextAuth.js** for authentication
- **Vercel** for hosting platform

## 📞 Support

For support, email support@sarkarisaathi.in or create an issue on GitHub.

---

**🏛️ SarkariSaathi - Making Government Schemes Accessible to Every Indian**
