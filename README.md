# 🏛️ SarkariSaathi - सरकारी योजनाएं अब आसान

A comprehensive government scheme discovery platform that helps Indian citizens find and apply for relevant government schemes using AI-powered matching and multilingual support.

## 🌟 Features

### 🚀 Phase 2 Complete - Authentication & Profile Setup

- **🔐 Complete Authentication System**
  - NextAuth.js with Google OAuth & Email/Password login
  - Hindi language interface with localized validation messages
  - Split layout design (branding left, form right) for auth pages
  - Password strength indicators and secure registration

- **👤 Multi-Step Profile Setup**
  - 4-step comprehensive user onboarding with GSAP animations
  - Location & Basic Info (state, district, age, gender)
  - Economic Information (income, BPL card, caste category)
  - Occupation & Special Categories (farmer, student, disability, etc.)
  - Review & Submit with edit functionality

- **🛡️ Advanced Security & Middleware**
  - Route protection with role-based access control
  - Admin and operator route restrictions
  - Secure password hashing with bcryptjs
  - Session management with database strategy

- **🎨 Modern UI/UX Design**
  - Mobile-first responsive design
  - Navy Blue (#1a3a6b) and Saffron (#FF6B00) color scheme
  - Hindi language interface throughout
  - GSAP animations for smooth transitions
  - shadcn/ui components with Radix UI primitives

- **🤖 AI Integration Ready**
  - Sarvam AI configuration for voice features
  - Speech-to-text and text-to-speech capabilities
  - Support for 12+ Indian languages

### 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 18, TypeScript
- **Styling**: TailwindCSS, shadcn/ui, Radix UI
- **Authentication**: NextAuth.js v5 (beta)
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand, React Hook Form
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
- `/` - Landing page (coming in Phase 3)
- `/login` - User login page
- `/register` - User registration page
- `/about` - About page (coming in Phase 3)

### Protected Routes (Authentication Required)
- `/dashboard` - User dashboard (coming in Phase 3)
- `/profile/setup` - Multi-step profile setup
- `/schemes` - Scheme browsing (coming in Phase 3)

### Admin Routes (Admin Role Required)
- `/admin` - Admin dashboard (coming in Phase 3)

### API Routes
- `/api/auth/[...nextauth]` - NextAuth.js endpoints
- `/api/auth/register` - User registration
- `/api/profile` - Profile management

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
