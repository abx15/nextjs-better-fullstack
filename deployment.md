# SarkariSaathi Deployment Guide

This guide provides step-by-step instructions for deploying SarkariSaathi on Vercel and Render platforms.

## 🚀 Prerequisites

- Node.js 18+ installed
- Git repository with your code
- Environment variables configured
- Database (PostgreSQL) ready for production

## 📋 Environment Variables

Create these environment variables in your deployment platform:

```bash
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Next.js
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secret-key"

# External APIs
SARVAM_API_KEY="your-sarvam-api-key"
REDIS_URL="your-redis-url"

# App Configuration
NODE_ENV="production"
```

## 🚀 Vercel Manual Deployment

### Step 1: Prepare Your Project
```bash
# Ensure your code is pushed to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub/GitLab/Bitbucket or email
3. Verify your email address

### Step 3: Import Project
1. Click **"New Project"** on Vercel dashboard
2. Select your GitHub repository
3. Click **"Import"**

### Step 4: Configure Build Settings
```
Framework Preset: Next.js
Root Directory: ./apps/web
Build Command: cd apps/web && npm run build
Output Directory: apps/web/.next
Install Command: pnpm install
```

### Step 5: Add Environment Variables
In Vercel dashboard, go to **Settings → Environment Variables** and add:

```bash
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
DATABASE_URL=postgresql://user:pass@host:port/db
SARVAM_API_KEY=your-sarvam-key
REDIS_URL=your-redis-url
NODE_ENV=production
```

### Step 6: Deploy
1. Click **"Deploy"** button
2. Wait for build to complete (2-5 minutes)
3. Your app will be live at `https://your-project-name.vercel.app`

### Step 7: Custom Domain (Optional)
1. Go to **Settings → Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update NEXTAUTH_URL to your custom domain

## 🎨 Render Manual Deployment

### Step 1: Prepare Your Project
```bash
# Ensure all files are committed to Git
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub/GitLab
3. Connect your GitHub account

### Step 3: Create Web Service
1. Click **"New +" → "Web Service"**
2. Select your repository
3. Configure service settings:

```
Name: sarkari-saathi-web
Environment: Node 18
Build Command: cd apps/web && npm run build
Start Command: cd apps/web && npm start
Instance Type: Free (or paid for production)
Auto-Deploy: Yes
```

### Step 4: Add Environment Variables
In your web service settings, add these environment variables:

```bash
NODE_ENV=production
NEXTAUTH_URL=https://your-service-name.onrender.com
NEXTAUTH_SECRET=your-secret-key-here
DATABASE_URL=postgresql://user:pass@host:port/db
SARVAM_API_KEY=your-sarvam-key
REDIS_URL=your-redis-url
```

### Step 5: Create PostgreSQL Database
1. Click **"New +" → "PostgreSQL"**
2. Configure database:
   ```
   Name: sarkari-saathi-db
   Database Name: sarkarisaathi
   User: postgres
   Instance Type: Free (or paid)
   ```
3. Copy the connection string
4. Add it as DATABASE_URL in your web service

### Step 6: Create Redis (Optional)
1. Click **"New +" → "Redis"**
2. Configure:
   ```
   Name: sarkari-saathi-redis
   Plan: Free
   ```
3. Copy the Redis URL
4. Add it as REDIS_URL in your web service

### Step 7: Deploy and Test
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Your app will be live at `https://your-service-name.onrender.com`

### Step 8: Database Setup
Once deployed, you need to run migrations:

```bash
# Connect to your service's shell (via Render dashboard)
cd apps/web
npx prisma migrate deploy
npx prisma generate
```

## 🔧 Build Commands

### Package.json Scripts

Ensure your `package.json` has these scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate deploy",
    "db:seed": "prisma db seed"
  }
}
```

## 📝 Deployment Checklist

### Before Deployment:
- [ ] All code pushed to GitHub
- [ ] Environment variables ready
- [ ] Database connection string available
- [ ] API keys obtained (Sarvam, Redis)
- [ ] Domain name decided (if using custom domain)
- [ ] SSL certificates configured (if needed)

### Vercel Specific:
- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Build settings configured
- [ ] Environment variables added
- [ ] Custom domain configured (optional)

### Render Specific:
- [ ] Render account created
- [ ] GitHub connected to Render
- [ ] Web service created
- [ ] PostgreSQL database created
- [ ] Redis instance created (optional)
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] All environment variables set
- [ ] Database connection working
- [ ] Prisma schema up to date
- [ ] Build process works locally
- [ ] API routes tested
- [ ] Static assets optimized

### After Deployment:
- [ ] Test all pages load correctly
- [ ] Check API endpoints
- [ ] Verify database connectivity
- [ ] Test authentication flow
- [ ] Check mobile responsiveness
- [ ] Monitor error logs

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Fails**:
   ```bash
   # Check Node.js version
   node --version  # Should be 18+
   
   # Clear cache
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. **Database Connection**:
   ```bash
   # Test connection string
   npx prisma db pull
   
   # Regenerate client
   npx prisma generate
   ```

3. **Environment Variables**:
   - Double-check variable names
   - Ensure no trailing spaces
   - Verify URL formats

4. **API Routes Not Working**:
   - Check `next.config.ts` for API configuration
   - Verify route exports are correct
   - Check server logs

## 🚀 Quick Deploy Commands

### Vercel:
```bash
# One-command deployment
vercel --prod --env DATABASE_URL=$DATABASE_URL --env NEXTAUTH_SECRET=$NEXTAUTH_SECRET
```

### Render:
```bash
# Using CLI (if configured)
render deploy
```

## 📊 Monitoring

### Vercel:
- Dashboard: https://vercel.com/dashboard
- Logs: Available in project dashboard
- Analytics: Built-in performance metrics

### Render:
- Dashboard: https://dashboard.render.com
- Logs: Real-time logs in service dashboard
- Metrics: CPU, memory, and response time

## 🔒 Security Considerations

1. **Environment Variables**: Never commit secrets to Git
2. **Database**: Use SSL connections
3. **API Keys**: Rotate regularly
4. **HTTPS**: Ensure all traffic uses HTTPS
5. **Rate Limiting**: Implement for API endpoints

## 📱 Post-Deployment Testing

Test these critical flows:
- User registration/login
- Dashboard loading
- Scheme search functionality
- AI chat interface
- Application tracking
- Mobile responsiveness

## 🆘 Support

If you encounter issues:
1. Check platform-specific documentation
2. Review deployment logs
3. Test with a minimal reproduction
4. Contact platform support if needed

---

**Happy Deploying! 🎉**
