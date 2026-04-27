# LegalAI CRM

AI-powered CRM for personal injury law firms. Lawyers and investors review work, the AI does the case-handling.

## Stack

- **Next.js 15** (App Router, Server Components, Server Actions)
- **TypeScript** (strict)
- **Tailwind CSS v4** with custom design tokens
- **Supabase** (Postgres + Auth + Storage + RLS)
- **Radix UI** primitives, customized
- **Motion** (Framer Motion successor) for transitions
- **Recharts**, **TanStack Table**, **React Hook Form + Zod**

## Setup

```bash
npm install
cp .env.local.example .env.local
# fill in Supabase credentials
npm run dev
```

Open http://localhost:3000.

## Supabase

Schema migrations live in `/supabase/migrations`. Copy each file's SQL into the Supabase SQL editor in order. RLS policies are bundled with the table definitions.

## Project structure

```
/app
  /(auth)         login, signup, onboarding (Phase 2)
  /(dashboard)    role-aware app shell
    /dashboard
    /leads
    /cases/[id]
    /ai-workspace
    /documents
    /investments     investor-only
    /marketplace     investor-only
    /settings
/components
  /ui             customized primitives
  /shared         sidebar, topbar, etc.
  /dashboard      dashboard widgets
  /cases
  /ai
/lib
  /supabase       client, server, middleware
  /actions        Server Actions
  /ai             AI integration stubs
  /utils
  /types
/supabase/migrations
```

## Build phases

1. ✅ Foundation: design system, layout chrome, demo dashboard
2. ⏳ Auth + onboarding
3. ⏳ Schema + RLS, lawyer/investor dashboards wired to data
4. ⏳ Lead → case flow
5. ⏳ AI workspace (stubs)
6. ⏳ Documents + communications
7. ⏳ Investor marketplace + portfolio
8. ⏳ Polish: empty states, skeletons, animations
