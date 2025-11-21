# PS Ads - Technical Architecture Plan

> AI-assisted development with Claude Code | Last updated: Nov 2024

## Overview

PS Ads is a streamlined ad creation and campaign management tool for real estate agents. This document outlines the technical architecture for production implementation.

---

## Core Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 16 (App Router) | React 19, Server Components |
| **Database** | Supabase Postgres | Primary data store with RLS |
| **Auth** | Supabase Auth | Magic Links, session management |
| **Storage** | Supabase Storage | Property images, video assets |
| **Payments** | Stripe | Subscriptions, one-time payments |
| **Email** | Resend | Transactional emails with React Email |
| **Hosting** | Vercel | Frontend + API routes |

---

## Pre-Built Integrations (Ready to Wire Up)

- **Meta Ads API** - Approved, accounts configured
- **Video API** - Complete, ready to integrate
- **Property Feed** - Complete, ready to connect

---

## Data Fetching Strategy

### Server Components (Default)

Most pages should be Server Components that fetch data directly from Supabase:

```typescript
// app/campaigns/page.tsx
export default async function CampaignsPage() {
  const supabase = await createServerClient();
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });

  return <CampaignList campaigns={campaigns} />;
}
```

**Benefits:**
- No loading spinners (data arrives with HTML)
- Smaller JS bundle
- SEO friendly
- No hydration issues

### TanStack Query (Interactive Features Only)

Use for features requiring client-side interactivity:

- Forms with optimistic updates
- Real-time search/filtering
- Polling for async status (video generation)
- Infinite scroll

```typescript
'use client'

export function VideoStatus({ campaignId }: { campaignId: string }) {
  const { data } = useQuery({
    queryKey: ['video-status', campaignId],
    queryFn: () => checkVideoStatus(campaignId),
    refetchInterval: 3000, // Poll every 3s
  });

  return <StatusBadge status={data?.status} />;
}
```

### Server Actions (All Mutations)

All data mutations use Server Actions:

```typescript
// app/actions/campaigns.ts
'use server'

export async function createCampaign(formData: FormData) {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('campaigns')
    .insert({
      property_id: formData.get('propertyId'),
      status: 'draft',
    })
    .select()
    .single();

  if (error) throw error;

  revalidatePath('/campaigns');
  redirect(`/campaign-detail/${data.id}`);
}
```

---

## Database Schema

### Core Tables

```sql
-- Users (extends Supabase auth.users)
create table profiles (
  id uuid references auth.users primary key,
  full_name text,
  phone text,
  brokerage text,
  license_number text,
  created_at timestamptz default now()
);

-- Properties
create table properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  address jsonb not null,
  price numeric,
  bedrooms int,
  bathrooms numeric,
  sqft int,
  images text[],
  status text default 'active',
  mls_id text,
  created_at timestamptz default now()
);

-- Campaigns
create table campaigns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  property_id uuid references properties(id),
  status text default 'draft',
  video_urls jsonb,
  meta_campaign_id text,
  budget numeric,
  start_date date,
  end_date date,
  created_at timestamptz default now()
);

-- Campaign Metrics
create table campaign_metrics (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id),
  impressions int default 0,
  clicks int default 0,
  spend numeric default 0,
  date date not null,
  created_at timestamptz default now()
);

-- Payments
create table payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  campaign_id uuid references campaigns(id),
  stripe_payment_id text,
  amount numeric,
  status text,
  created_at timestamptz default now()
);
```

### Row Level Security

```sql
-- Users can only see their own data
alter table profiles enable row level security;
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

alter table properties enable row level security;
create policy "Users can manage own properties"
  on properties for all using (auth.uid() = user_id);

alter table campaigns enable row level security;
create policy "Users can manage own campaigns"
  on campaigns for all using (auth.uid() = user_id);
```

---

## Authentication Flow

### Magic Link Auth

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Sign in
const { error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    emailRedirectTo: `${origin}/auth/callback`,
  },
});
```

### Auth Middleware

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: /* cookie handlers */ }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protect dashboard routes
  if (!user && request.nextUrl.pathname.startsWith('/campaigns')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/campaigns/:path*', '/profile/:path*', '/ad-builder/:path*'],
};
```

---

## Payment Integration

### Stripe Checkout

```typescript
// app/api/checkout/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { campaignId, priceId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/campaign-welcome/${campaignId}`,
    cancel_url: `${origin}/campaigns`,
    metadata: { campaignId },
  });

  return Response.json({ url: session.url });
}
```

### Stripe Webhooks (Supabase Edge Function)

```typescript
// supabase/functions/stripe-webhook/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';

serve(async (req) => {
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
  const signature = req.headers.get('stripe-signature')!;

  const event = stripe.webhooks.constructEvent(
    await req.text(),
    signature,
    Deno.env.get('STRIPE_WEBHOOK_SECRET')!
  );

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Update campaign status, create payment record
  }

  return new Response(JSON.stringify({ received: true }));
});
```

---

## API Routes Structure

```
app/api/
├── auth/
│   └── callback/route.ts       # Supabase auth callback
├── checkout/route.ts           # Stripe checkout session
├── webhooks/
│   ├── stripe/route.ts         # Stripe events (or Edge Function)
│   └── meta/route.ts           # Meta Ads callbacks
├── video/
│   └── generate/route.ts       # Trigger video generation
└── campaigns/
    └── publish/route.ts        # Publish to Meta Ads
```

---

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Meta Ads
META_APP_ID=
META_APP_SECRET=
META_ACCESS_TOKEN=

# Video API
VIDEO_API_URL=
VIDEO_API_KEY=

# Email
RESEND_API_KEY=

# Other
NEXT_PUBLIC_APP_URL=
MAPBOX_TOKEN=
```

---

## Implementation Timeline

### Phase 1: Foundation (2-3 days)

- [ ] Install Supabase packages
- [ ] Create database schema + RLS policies
- [ ] Set up auth with Magic Links
- [ ] Create middleware for protected routes
- [ ] Replace mock data with Supabase queries
- [ ] Convert key pages to Server Components

### Phase 2: Core Features (3-4 days)

- [ ] Stripe checkout integration
- [ ] Payment webhook handling
- [ ] Wire up property feed to Supabase
- [ ] Campaign CRUD with Server Actions
- [ ] File uploads to Supabase Storage

### Phase 3: Integrations (2-3 days)

- [ ] Connect Video API to campaign creation
- [ ] Connect Meta Ads API for publishing
- [ ] Email notifications with Resend
- [ ] Campaign metrics syncing

### Total Estimate: ~1-2 weeks with Claude Code

---

## Dependencies

```bash
# Install all at once
npm install @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js
```

Already installed:
- `@tanstack/react-query` - Client-side data fetching
- `@react-email/components` - Email templates
- `zod` - Schema validation

---

## What's NOT Included

The following features have been removed from scope:

- ~~AI text/voice assistant~~
- ~~Lead response bot~~
- ~~Voice concierge~~
- ~~CRM/Lead management~~
- ~~Vercel AI SDK~~

This is a focused ad creation + campaign management tool with a lean, maintainable stack.

---

## Key Architectural Decisions

1. **Server Components First** - Fetch on server, minimize client JS
2. **Supabase All-in-One** - Database, auth, storage in one service
3. **Server Actions for Mutations** - Type-safe, colocated with forms
4. **Edge Functions for Webhooks** - Keep Next.js routes clean
5. **TanStack Query Sparingly** - Only for truly interactive features

---

## File Structure

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── auth/callback/route.ts
├── (dashboard)/
│   ├── campaigns/page.tsx
│   ├── campaign-detail/[id]/page.tsx
│   ├── listing-manager/page.tsx
│   └── profile/page.tsx
├── (marketing)/
│   ├── page.tsx
│   ├── pricing/page.tsx
│   └── how-it-works/page.tsx
├── api/
│   ├── checkout/route.ts
│   └── webhooks/...
└── actions/
    ├── campaigns.ts
    ├── properties.ts
    └── profile.ts

lib/
├── supabase/
│   ├── client.ts
│   ├── server.ts
│   └── middleware.ts
├── stripe.ts
└── utils.ts

supabase/
├── migrations/
│   └── 001_initial_schema.sql
└── functions/
    └── stripe-webhook/index.ts
```
