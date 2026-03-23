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
