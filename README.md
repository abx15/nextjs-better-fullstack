# full-stack-nextjs

This project was created with [Better Fullstack](https://github.com/Marve10s/Better-Fullstack), a modern TypeScript stack that combines Next.js, Self, TRPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - CSS framework
- **shadcn/ui** - UI components
- **tRPC** - End-to-end type-safe APIs
- **Prisma** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Authentication** - NextAuth.js
- **Turborepo** - Optimized monorepo build system
- **Biome** - Linting and formatting
- **Husky** - Git hooks for code quality
- **TanStack Query** - Async state management & data fetching
- **TanStack Table** - Headless table with sorting, filtering & pagination
- **MSW** - Mock Service Worker for API mocking
- **PWA** - Progressive Web App support

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

## Database Setup

This project uses PostgreSQL with Prisma.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/web/.env` file with your PostgreSQL connection details.

3. Apply the schema to your database:

```bash
pnpm run db:push
```

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the fullstack application.

## Git Hooks and Formatting

- Initialize hooks: `pnpm run prepare`
- Format and lint fix: `pnpm run check`

## Project Structure

```
full-stack-nextjs/
├── apps/
│   └── web/         # Fullstack application (Next.js)
├── packages/
│   ├── api/         # API layer / business logic
│   ├── auth/        # Authentication configuration & logic
│   └── db/          # Database schema & queries
```

## Available Scripts

- `pnpm run dev`: Start all applications in development mode
- `pnpm run build`: Build all applications
- `pnpm run check-types`: Check TypeScript types across all apps
- `pnpm run db:push`: Push schema changes to database
- `pnpm run db:studio`: Open database studio UI
- `pnpm run check`: Run Biome formatting and linting
- `cd apps/web && pnpm run generate-pwa-assets`: Generate PWA assets
