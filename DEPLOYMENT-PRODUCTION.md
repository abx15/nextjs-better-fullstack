# 🚀 SarkariSaathi Deployment Guide

Complete guide to deploy your role-based SarkariSaathi application to production.

## 📋 **Prerequisites**

### Required Accounts
- **Vercel/Netlify/Railway** - Hosting platform
- **Neon/Supabase/PlanetScale** - PostgreSQL database
- **GitHub/GitLab** - Git repository
- **Domain** (Optional) - Custom domain

### Environment Variables Needed
```bash
# Database
DATABASE_URL="postgresql://username:password@host:5432/database"

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers (Optional)
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
```

## 🛠️ **Deployment Steps**

### Method 1: Vercel (Recommended)

#### 1. Prepare for Production
```bash
# Build the application
npm run build

# Test production build locally
npm run start
```

#### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### 3. Configure Environment Variables in Vercel
1. Go to Vercel Dashboard → Your Project → Settings
2. Add all environment variables from above
3. Redeploy: `vercel --prod`

### Method 2: Netlify

#### 1. Build for Production
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build application
npm run build

# Login to Netlify
netlify login
```

#### 2. Deploy to Netlify
```bash
# Deploy
netlify deploy --prod --dir=.next

# Or drag-and-drop .next folder to Netlify dashboard
```

### Method 3: Railway/Render

#### 1. Connect GitHub Repository
1. Create new account on Railway/Render
2. Connect your GitHub repository
3. Select branch (usually `main`)

#### 2. Configure Service
```yaml
# railway.toml (for Railway)
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm start"
healthcheckPath = "/api/health"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

# render.yaml (for Render)
services:
  - type: web
    name: sarkarisaathi
    env: node
    plan: free
    buildCommand: npm run build
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        sync: false
```

## 🗄️ **Database Setup**

### Neon Database (Recommended)
```bash
# Install Neon CLI
npm i -g neon

# Login to Neon
neonctl auth login

# Create database
neonctl projects create

# Get connection string
neonctl connection-string
```

### Database Migration
```bash
# Run migrations on production
npx prisma migrate deploy

# Seed production database (optional)
npx prisma db seed
```

## 🔧 **Production Configuration**

### 1. Update NextAuth for Production
```typescript
// apps/web/src/lib/auth.ts
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  providers: [
    // Configure production OAuth
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      // ... existing credentials provider
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // ... existing callbacks
  },
  trustHost: true, // Important for production
})
```

### 2. Environment-Specific Config
```typescript
// apps/web/src/lib/env.ts
export const env = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  databaseUrl: process.env.DATABASE_URL!,
  nextAuthUrl: process.env.NEXTAUTH_URL!,
}
```

## 🚀 **Quick Deploy Commands**

### Vercel (One Command)
```bash
# Deploy everything at once
vercel --prod --env DATABASE_URL,NEXTAUTH_URL,NEXTAUTH_SECRET
```

### Railway with GitHub
```bash
# Connect and deploy
railway login
railway link
railway up
```

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/public ./public

ENV NODE_ENV production
ENV PORT 3000
ENV NEXTAUTH_URL https://yourdomain.com

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
```

```bash
# Build and push Docker image
docker build -t sarkarisaathi .
docker run -p 3000:3000 sarkarisaathi
```

## 🔍 **Post-Deployment Checklist**

### ✅ **Verify Functionality**
- [ ] Login works with all roles
- [ ] Role-based redirects working
- [ ] Database connected
- [ ] All dashboards load correctly
- [ ] API endpoints responding
- [ ] OAuth providers working (if configured)

### ✅ **Security Checks**
- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] Database connection secure
- [ ] CORS configured properly
- [ ] Rate limiting considered
- [ ] Session security enabled

### ✅ **Performance**
- [ ] Build optimized
- [ ] Images optimized
- [ ] Caching configured
- [ ] CDN enabled (if applicable)
- [ ] Bundle size analyzed

## 🌐 **Domain Setup**

### Custom Domain (Optional)
```bash
# 1. Point DNS to your hosting
A Record: @ → your-hosting-ip
CNAME: www → your-hosting-domain.com

# 2. Update NEXTAUTH_URL
NEXTAUTH_URL=https://yourdomain.com

# 3. Redeploy
vercel --prod
```

## 📊 **Monitoring & Analytics**

### Add Monitoring
```typescript
// Add to your app for production monitoring
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  return (
    <>
      <Analytics />
      <YourApp />
    </>
  )
}
```

### Error Tracking
```bash
# Add Sentry for error tracking
npm install @sentry/nextjs
```

## 🔄 **CI/CD Pipeline**

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🆘 **Troubleshooting**

### Common Issues
1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Verify database is running
   - Check IP whitelist

2. **Auth Callback Errors**
   - Verify NEXTAUTH_URL matches domain
   - Check OAuth redirect URIs
   - Ensure HTTPS in production

3. **Build Errors**
   - Check Node.js version (18+)
   - Verify all dependencies installed
   - Check environment variables

4. **Role-Based Routing Not Working**
   - Verify middleware is properly configured
   - Check session data structure
   - Ensure database seeded correctly

## 📞 **Support**

### Deployment Help
- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **NextAuth Docs**: https://next-auth.js.org
- **Next.js Deployment**: https://nextjs.org/docs/deployment

### Quick Commands Reference
```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm run start

# Database operations
npx prisma migrate dev
npx prisma generate
npx prisma db seed

# Deploy
vercel --prod
netlify deploy --prod
railway up
```

---

## 🎯 **Production URL**

After successful deployment, your SarkariSaathi app will be available at:
- **Primary**: `https://yourdomain.com`
- **Login**: `https://yourdomain.com/login`
- **Admin**: `https://yourdomain.com/admin`
- **Operator**: `https://yourdomain.com/operator`
- **Dashboard**: `https://yourdomain.com/dashboard`

## 🔐 **Default Admin Access**

After deployment, create your first admin:
```bash
# Use seeded credentials
Email: superadmin@sarkarisaathi.in
Password: password123
```

**Important**: Change default passwords in production!

---

🚀 **Happy Deploying! Your role-based SarkariSaathi is ready for production!**
