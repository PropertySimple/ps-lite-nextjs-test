# PS-Lite Production Build - Complete Plan (Next.js 16)
## PropertySimple AI-Powered Real Estate Marketing Platform

**Last Updated:** November 2025
**Timeline:** 6-8 Weeks (Week 1 Complete ✅)
**Status:** Backend Development In Progress
**Progress:** Frontend 100% | Backend 0% | On Track 🟢

---

## 🎯 Executive Summary

Transform PS-Lite from frontend mockup to full-stack production application that automates real estate ad campaigns with AI.

### Key Specifications
- ✅ **Single Meta Ad Account** - PropertySimple company account
- ✅ **Claude Sonnet 4.5** - Latest AI model (claude-sonnet-4-5-20250929)
- ✅ **Anthropic SDK Agents** - Full agent framework with tool use
- ✅ **Modern Stack** - Latest libraries (Nov 2025)
- ✅ **Next.js 16** - App Router with React Server Components
- ✅ **6-8 Week Timeline** - Accelerated with Claude Code
- ✅ **Zero UI Refactoring** - Backend fits existing UI perfectly

---

## 🏗️ System Architecture

### High-Level Flow
```
Property API Webhook → Email Magic Link → Stripe Checkout → AI Ad Builder → Meta Ads → Lead CRM → AI Concierge
```

### Technology Stack

**Frontend**
- **Framework**: Next.js 16.0.1 (App Router) ✅
- **Runtime**: React 19.2.0 ✅
- **Language**: TypeScript 5.x ✅
- **Styling**: Tailwind CSS + shadcn/ui (Radix) ✅
- **Typography**: Cabinet Grotesk (display) + Outfit (body) ✅
- **Color Palette**: Warm terracotta/gold/cream aesthetic ✅
- **Icons**: Lucide React ✅
- **Charts**: Recharts ✅
- **Forms**: React Hook Form + Zod ✅
- **Animations**: Framer Motion with orchestrated reveals ✅

**Backend**
- **Database & Auth**: Supabase (Postgres, RLS, Auth, Storage)
- **API Layer**: Next.js API Routes + Server Actions
- **Edge Functions**: Supabase Edge Functions (Deno)
- **AI**: Anthropic SDK + Claude Sonnet 4.5
- **Payments**: Stripe
- **Ads**: Meta Ads API
- **Phone/SMS**: Twilio
- **Email**: Resend

**State Management**
- Tanstack Query 5.90.7 ✅ (server state)
- Zustand (client state - to be installed)
- Server Components (default state) ✅

**Deployment**
- Vercel (Frontend + API Routes)
- Supabase Cloud (Database + Edge Functions)

---

## 🏛️ Next.js Architecture Advantages

### Why Next.js 16 App Router?

**1. Server Components by Default**
- Reduces client JavaScript bundle
- Faster initial page loads
- Better SEO
- Components can directly access backend

**2. Built-in API Routes**
- `/app/api` routes for REST endpoints
- Server Actions for mutations
- Middleware for auth/CORS
- Edge runtime support

**3. File-based Routing**
- `/app/campaigns/page.tsx` → `/campaigns`
- `/app/campaign-detail/[id]/page.tsx` → `/campaign-detail/123`
- Automatic code splitting per route

**4. Streaming & Suspense**
- Progressive rendering
- Loading states built-in
- Optimal UX for AI operations

**5. Image & Font Optimization**
- `next/image` auto-optimizes images
- `next/font` self-hosts fonts
- Zero configuration needed

### Server vs Client Components Strategy

```typescript
// Server Component (default) - can fetch data directly
// app/campaigns/page.tsx
import { db } from '@/lib/db'

export default async function CampaignsPage() {
  const campaigns = await db.campaign.findMany() // Direct DB access
  return <CampaignsList campaigns={campaigns} />
}

// Client Component - interactive UI
// components/CampaignsList.tsx
'use client'
export function CampaignsList({ campaigns }) {
  const [tab, setTab] = useState('active')
  return <Tabs>...</Tabs>
}
```

---

## 🎨 Completed Frontend Work

### Marketing Site Redesign ✅
**Status:** Complete (Warm Aesthetic)
- Professional warm color palette (terracotta, gold, cream)
- Cabinet Grotesk + Outfit typography
- Grain texture for premium feel
- Conversion-optimized homepage with direct response marketing
- All marketing pages redesigned (pricing, how-it-works, examples, about)
- WCAG AA compliant color contrast
- Orchestrated animations with staggered reveals

**New Components:**
- `HeroNew` - Asymmetric hero with problem-focused headline
- `ProblemAgitate` - Direct response marketing technique
- `HowItWorksSimple` - Ultra-simple 4-step process
- `PriceComparison` - Value comparison showing savings

### Application UX Improvements ✅
**Status:** 20+ Enhancements Complete
- Reduced information density with cleaner card layouts
- Comprehensive tooltips with industry benchmarks
- Guided onboarding wizard for new users (`OnboardingWizard`)
- Simplified inbox actions (removed confusing inline editors)
- AI automation templates and preview simulator
- Campaign status badges and banners
- Auto-save indicators in AdBuilder and Profile
- Progress tracking in multi-step workflows
- Professional Lucide icons throughout (replaced emojis)
- Filter result counts ("Showing X of Y contacts")
- Colorful avatar generation from names
- Keyboard shortcuts (C/T/E/?)
- Performance benchmarks vs averages
- Skip navigation for accessibility
- Improved semantic HTML and ARIA labels

---

## 🤖 Four Core AI Agents

### Agent 1: Ad Copy Generator
**Model:** Claude Sonnet 4.5
**Purpose:** Generate compelling ad copy from property data
**Tools:**
- `analyze_property_features` - Extract selling points
- `generate_variations` - Create A/B test options

**Input:** Property details (address, price, features, images)
**Output:** 3 ad copy variations with headlines, primary text, CTA

**Cost:** ~$0.03 per generation

**Implementation:** Server Action
```typescript
// app/actions/generate-ad-copy.ts
'use server'
export async function generateAdCopy(propertyId: string) {
  const agent = new AdCopyAgent()
  return await agent.generate(propertyId)
}
```

---

### Agent 2: Lead Response Bot (AI Concierge)
**Model:** Claude Sonnet 4.5
**Purpose:** Intelligent lead conversation with escalation
**Tools:**
- `get_property_details` - Fetch property info
- `check_showing_availability` - Available times
- `calculate_mortgage` - Payment estimates
- `qualify_lead` - Score lead readiness
- `escalate_to_agent` - Flag for human attention

**Input:** Lead message + conversation history
**Output:** Response or escalation to Inbox

**Cost:** ~$0.01 per response (with prompt caching)

**Implementation:** Supabase Edge Function + Webhook
```typescript
// supabase/functions/handle-sms/index.ts
Deno.serve(async (req) => {
  const { from, body } = await req.json()
  const agent = new LeadResponseAgent()
  const response = await agent.respond(from, body)
  return new Response(JSON.stringify(response))
})
```

---

### Agent 3: Image Analyzer
**Model:** Claude Sonnet 4.5 (Vision)
**Purpose:** Rank photos and select best cover image
**Input:** Array of property photos
**Output:** Ranked images with quality scores, recommended cover photo, ordering

**Cost:** ~$0.03 per analysis

**Implementation:** Server Action
```typescript
// app/actions/analyze-images.ts
'use server'
export async function analyzeImages(imageUrls: string[]) {
  const agent = new ImageAnalyzerAgent()
  return await agent.analyze(imageUrls)
}
```

---

### Agent 4: Targeting & Budget Advisor
**Model:** Claude Sonnet 4.5
**Purpose:** Recommend Meta ad targeting and budget
**Tools:**
- `validate_fair_housing_compliance` - Legal check

**Input:** Property data + campaign goal
**Output:** Age ranges, interests, locations, budget recommendation, expected performance

**Cost:** ~$0.04 per suggestion

**Implementation:** Server Action
```typescript
// app/actions/suggest-targeting.ts
'use server'
export async function suggestTargeting(campaignId: string) {
  const agent = new TargetingAgent()
  return await agent.suggest(campaignId)
}
```

---

## 📁 Next.js Project Structure

```
/app
  /api                    # API Routes
    /ai                   # AI agent endpoints
      /generate-ad-copy
        /route.ts
      /analyze-images
        /route.ts
    /webhooks             # External webhooks
      /stripe
        /route.ts
      /meta
        /route.ts
      /twilio
        /route.ts
  /actions                # Server Actions
    /generate-ad-copy.ts
    /analyze-images.ts
    /suggest-targeting.ts
  /(auth)                 # Auth routes
    /login
      /page.tsx
    /magic-link
      /page.tsx
  /(dashboard)            # Authenticated routes
    /layout.tsx           # Sidebar layout
    /campaigns
      /page.tsx
    /campaign-detail
      /[id]
        /page.tsx
    /contacts
      /page.tsx
    /inbox
      /page.tsx
  /layout.tsx             # Root layout
  /page.tsx               # Landing page

/components
  /ui                     # shadcn components
  /campaigns              # Campaign components
  /contacts               # Contact components
  /onboarding             # OnboardingWizard component
  /marketing              # Marketing site components (HeroNew, CTA, etc.)

/lib
  /ai                     # AI agent classes
    /AdCopyAgent.ts
    /LeadResponseAgent.ts
    /ImageAnalyzerAgent.ts
    /TargetingAgent.ts
  /db.ts                  # Supabase client
  /meta-api.ts            # Meta Ads API client
  /stripe.ts              # Stripe client
  /utils.ts               # Utilities

/supabase
  /migrations             # Database migrations
  /functions              # Edge Functions
    /handle-sms
    /handle-property-webhook
```

---

## 📅 8-Week Implementation Timeline

### 🎯 Current Focus: Week 1 → Week 2 Transition
**Next Steps:**
1. Install and configure Supabase
2. Design database schema (12 tables)
3. Set up AI agent framework
4. Begin Ad Copy Agent implementation

---

### Week 1: Foundation & Infrastructure (COMPLETED ✅)
**Days 1-2: Next.js Setup & TypeScript** ✅
- ~~Already migrated to Next.js 16~~ ✅
- ~~Update all packages to latest versions~~ ✅
- ~~Enable TypeScript strict mode~~ ✅
- ~~Marketing site redesign with warm aesthetic~~ ✅
- ~~Application UX redesign with 20+ improvements~~ ✅
- ~~OnboardingWizard component implemented~~ ✅
- Install @anthropic-ai/sdk@0.32.0 (pending)
- ~~Set up path aliases (@/)~~ ✅

**Days 3-4: Supabase Setup**
- Design database schema (12 tables)
- Create migrations
- Set up Row Level Security policies
- Implement Auth with magic links
- Create Supabase client utilities

**Day 5: Agent Framework**
- Create base agent classes in `/lib/ai`
- Configure prompt caching
- Build testing utilities
- Set up environment variables

---

### Week 2: AI Agent Development
**Days 1-2: Ad Copy Agent**
- Implement AdCopyAgent class
- Define system prompt & tools
- Create Server Action: `generateAdCopy()`
- Create API endpoint: POST /api/ai/generate-ad-copy
- Integrate into ad builder step 1

**Day 3: Image Analyzer Agent**
- Implement ImageAnalyzerAgent
- Vision API integration
- Create Server Action: `analyzeImages()`
- Create API endpoint: POST /api/ai/analyze-images
- Auto-rank photos in step 2

**Day 4: Targeting Agent**
- Implement TargetingAgent
- Fair Housing compliance validation
- Create Server Action: `suggestTargeting()`
- Create API endpoint: POST /api/ai/suggest-targeting
- Pre-fill targeting recommendations

**Day 5: Lead Response Agent (Part 1)**
- Implement LeadResponseAgent skeleton
- Define conversation tools
- Build context-aware system prompt
- Test multi-turn conversations

---

### Week 3: Backend Services & State Management
**Days 1-2: Replace Mock Data with Server Components**
- Convert pages to Server Components where possible
- Create database queries in Server Components
- Set up Tanstack Query for client-side data
- Replace all mock imports with real data
- Test loading states with Suspense

**Day 3: Zustand Stores**
- useAdBuilderStore for ad creation flow
- useUIStore for modals/drawers
- Persist critical state to localStorage

**Days 4-5: Webhook System**
- Supabase Edge Function for property events
- Email notification trigger (Resend)
- Magic link generation with property context
- Next.js API route for webhook receiver
- Test end-to-end notification flow

---

### Week 4: Payments & Sales Flow
**Days 1-2: Stripe Integration**
- Set up products/prices
- Create checkout session endpoint: POST /api/stripe/create-checkout
- Implement webhook handler: POST /api/webhooks/stripe
- Store payments in database

**Days 3-4: Sales Page Flow**
- Magic link → auto-login → sales page
- Pre-populate property details with Server Component
- Stripe checkout button
- Success redirect to ad builder

**Day 5: Post-Payment**
- Payment confirmed → create campaign draft
- Load ad builder with property data
- Test full flow: email → checkout → builder

---

### Week 5: Meta Ads Integration
**Days 1-2: Meta API Client**
- PropertySimple Business Manager setup
- Access token management
- Creative upload functions in `/lib/meta-api.ts`
- Campaign creation functions

**Days 3-4: Campaign Publishing**
- Ad builder → Server Action → Meta API flow
- Upload images to Meta CDN
- Create campaign, ad set, ad
- Store Meta IDs in database

**Day 5: Campaign Tracking**
- Meta webhook: POST /api/webhooks/meta
- Store impressions, clicks, spend
- Update dashboard with real-time data
- Lead form webhook integration

---

### Week 6: CRM & AI Concierge
**Days 1-2: Twilio Integration**
- Purchase Twilio number
- SMS webhook handler: POST /api/webhooks/twilio/sms
- Call webhook handler: POST /api/webhooks/twilio/voice
- Call recording storage in Supabase Storage

**Days 3-4: Lead Response Agent (Part 2)**
- SMS auto-response via Supabase Edge Function
- Email auto-response
- Call transcription (Whisper API)
- Escalation logic to Inbox

**Day 5: CRM Real-Time Updates**
- Replace mock contacts with Server Components
- Live activity timeline
- Inbox escalation display with Server Actions
- AI-generated summaries

---

### Week 7: Testing & Polish
**Days 1-3: Comprehensive Testing**
- Unit tests for agents (60% coverage)
- Integration tests for Server Actions
- E2E tests with Playwright
- Load testing

**Days 4-5: Performance Optimization**
- Route-level code splitting (automatic)
- Image optimization with next/image
- Bundle size analysis
- Database query optimization
- Implement prompt caching
- Server Component optimization

---

### Week 8: Security & Launch
**Days 1-2: Security Audit**
- Review RLS policies
- Secrets management (env vars)
- Rate limiting on API routes
- TCPA compliance
- Fair Housing compliance
- CSRF protection (built-in)

**Days 3-4: Production Deployment**
- Deploy to Vercel (auto-scaling)
- Configure custom domain & SSL
- Set up monitoring (Sentry)
- Configure alerting
- Set up logging (Axiom)

**Day 5: Beta Launch**
- Final smoke tests
- Invite beta users
- Monitor metrics
- 🚀 LAUNCH

---

## 🗄️ Database Schema

### Core Tables
- **users** - User accounts and profiles (Supabase Auth)
- **properties** - Listings from webhook
- **campaigns** - Ad campaigns and metrics
- **contacts** - Leads and CRM data
- **conversations** - SMS, calls, emails
- **payments** - Stripe transactions
- **magic_links** - Temporary auth tokens
- **ai_settings** - Concierge configuration
- **actors** - AI actor library (seeded)
- **music_tracks** - Music library (seeded)

### Example: Campaigns Table
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id),
  meta_campaign_id TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  ad_copy TEXT NOT NULL,
  selected_photos TEXT[],
  targeting JSONB,
  budget INTEGER,
  metrics JSONB DEFAULT '{}'::jsonb,
  ai_recommendations JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own campaigns"
  ON campaigns FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own campaigns"
  ON campaigns FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

## 💰 Cost Breakdown

### Monthly Operating Costs
- **Supabase Pro:** $25/mo
- **Claude API:** $60-80/mo (with prompt caching)
- **Twilio:** $15-30/mo (number + usage)
- **Resend:** $20/mo (50k emails)
- **Vercel Pro:** $20/mo (includes auto-scaling)
- **Sentry:** $26/mo
- **Stripe:** 2.9% + $0.30 per transaction
- **Total:** ~$170-220/mo + transaction fees

### Claude API Cost Detail
- Ad copy generation: $0.03 each (500/mo = $15)
- Lead responses: $0.01 each (5000/mo = $50)
- Image analysis: $0.03 each (500/mo = $15)
- Targeting: $0.04 each (500/mo = $20)
- **Total:** $100/mo
- **With caching:** $60-80/mo (40% savings)

---

## 🔄 Complete User Journey

### 1. Property Event Triggered
- New listing, price drop, or open house
- External API sends webhook to Supabase Edge Function
- Property stored in database

### 2. Email Sent
- Resend triggers email to agent
- Subject: "New Listing at 123 Main St - Run Your Ad Now"
- Contains magic link with property_id token

### 3. Agent Clicks Link
- Token verified via Next.js API route
- Auto-login (create account if new)
- Redirect to sales page (Server Component)
- Property details pre-loaded

### 4. Stripe Checkout
- Agent clicks "Create Ad for $149"
- Server Action creates Stripe checkout session
- Redirect to Stripe hosted page
- Agent completes payment

### 5. Payment Confirmed
- Stripe webhook to Next.js API route
- Payment stored in database
- Campaign draft created via Server Action
- Redirect to ad builder

### 6. AI Ad Builder
**Step 1: Ad Copy**
- Call Server Action `generateAdCopy()`
- Agent #1 generates 3 copy variations
- Agent selects favorite or edits
- Call-to-action dropdown
- Open house scheduler

**Step 2: Photos**
- Call Server Action `analyzeImages()`
- Agent #3 analyzes and ranks photos
- Recommended cover photo highlighted
- Agent can reorder or override

**Step 3: Actor & Script**
- Select AI actor
- Review auto-generated script
- Agent can edit script

**Step 4: Music**
- Select background music
- Preview audio

**Click "Publish Campaign"**

### 7. Backend Processing
- Server Action calls Agent #4 for targeting
- Upload creative assets to Meta via API route
- Create Meta campaign via Meta API
- Store meta_campaign_id in database
- Campaign goes live

### 8. Campaign Runs
- Meta webhook to Next.js API route
- Store impressions, clicks, spend in real-time
- Server Component auto-updates dashboard
- Lead forms submitted

### 9. Leads Captured
- Meta webhook sends lead to Next.js API
- Lead stored in database
- Lead assigned to AI Concierge
- Edge Function triggers Agent #2
- Responds within 30 seconds via SMS/email

### 10. Ongoing Conversations
- Lead texts/calls Twilio number
- Webhook to Supabase Edge Function
- Agent #2 handles conversation
- Qualifies lead automatically
- Escalates to Inbox if needed

### 11. Agent Reviews Inbox
- Server Component loads escalated conversations
- See AI summary
- Take over manually or approve AI action
- Full CRM with activity timeline

---

## ✅ Success Metrics

### Performance Targets
- [ ] Magic link to login: <3 seconds
- [ ] Ad copy generation (streaming): <8 seconds
- [ ] Image analysis: <10 seconds
- [ ] Full ad builder flow: <3 minutes
- [ ] Meta ad publish: <20 seconds
- [ ] Lead auto-response: <20 seconds
- [ ] Dashboard load (Server Component): <1.5 seconds

### Business Metrics
- [ ] Escalation accuracy: >90%
- [ ] Checkout completion: >70%
- [ ] Meta publish success: >95%
- [ ] Lead qualification accuracy: >85%

---

## 🚧 Risk Mitigation

### Technical Risks
1. **Meta API Rate Limits**
   - Mitigation: Exponential backoff, queue system via Supabase

2. **AI Hallucinations**
   - Mitigation: Structured outputs, validation layers

3. **Webhook Failures**
   - Mitigation: Retry logic in Edge Functions, dead letter queue

4. **Vercel Serverless Limits**
   - Mitigation: Use Edge Runtime for long-running tasks
   - Mitigation: Offload heavy processing to Supabase Edge Functions

### Business Risks
1. **Fair Housing Violations**
   - Mitigation: Compliance validation tool in Agent #4

2. **TCPA Violations**
   - Mitigation: Opt-in tracking, recording consent

---

## 📚 Documentation Deliverables

- [ ] API documentation (OpenAPI spec for API routes)
- [ ] Database schema docs
- [ ] Agent behavior documentation
- [ ] Deployment runbook (Vercel + Supabase)
- [ ] Monitoring playbook
- [ ] User guides

---

## 🎓 Training & Handoff

### Developer Training (2 days)
- Next.js App Router architecture
- Server Components vs Client Components
- Server Actions best practices
- Supabase integration
- Agent system deep dive
- Meta API integration
- Debugging tools

### Operations Training (1 day)
- Vercel monitoring dashboards
- Supabase logs and analytics
- Error triage
- Common fixes
- Escalation procedures

---

## 🔮 Post-Launch Roadmap

### Month 2: Optimization
- A/B testing for ad variations
- Campaign performance predictions
- Automated budget optimization
- Lead scoring ML model
- Server Component optimizations

### Month 3: Scale Features
- Bulk campaign creation
- Multi-property campaigns
- Custom audience building
- Advanced analytics dashboard
- White-label for agencies
- ISR for static pages

---

## 🚀 Getting Started

### Prerequisites
1. Supabase account + project
2. Anthropic API key
3. Stripe account + API keys
4. Meta developer account + Business Manager access
5. Twilio account + phone number
6. Resend account + API key
7. Vercel account

### First Steps
1. Clone repository: `git clone <repo>`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local`
4. Fill in API keys
5. Link Supabase: `npx supabase link`
6. Run migrations: `npx supabase db push`
7. Start dev server: `npm run dev`

### Environment Variables (.env.local)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Anthropic
ANTHROPIC_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Meta
META_APP_ID=
META_APP_SECRET=
META_ACCESS_TOKEN=
META_BUSINESS_MANAGER_ID=

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Resend
RESEND_API_KEY=
```

---

## 🆕 Next.js-Specific Improvements

### 1. Server Actions for Mutations
```typescript
// app/actions/create-campaign.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function createCampaign(formData: FormData) {
  const campaign = await db.campaign.create({
    data: {
      name: formData.get('name'),
      // ...
    }
  })

  revalidatePath('/campaigns')
  return campaign
}
```

### 2. Streaming Server Components
```typescript
// app/campaigns/page.tsx
import { Suspense } from 'react'

export default function CampaignsPage() {
  return (
    <Suspense fallback={<CampaignsSkeleton />}>
      <CampaignsList />
    </Suspense>
  )
}
```

### 3. Route Handlers with Edge Runtime
```typescript
// app/api/ai/stream/route.ts
export const runtime = 'edge'

export async function POST(req: Request) {
  const stream = await anthropic.messages.stream({...})

  return new Response(stream.toReadableStream())
}
```

### 4. Middleware for Auth
```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { session } } = await supabase.auth.getSession()

  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}
```

---

## 📊 What's Different in Next.js Version?

### Compared to Original Plan
This plan has been updated from a potential separate frontend/backend architecture to a **unified Next.js App Router** approach:

**Before (Hypothetical):**
- Separate React SPA + Node.js/Express backend
- Client-side routing with React Router
- REST API with separate server
- More complex deployment (2 services)

**After (Next.js 16):**
- Unified Next.js App Router application
- File-based routing (automatic code splitting)
- Server Components + Server Actions (no separate API needed for many operations)
- API Routes for webhooks and third-party integrations
- Single deployment to Vercel
- Better performance (RSC, streaming, ISR)
- Simpler architecture

### Key Architectural Benefits
1. **Server Components** - Direct database access, zero client JS for static content
2. **Server Actions** - Type-safe mutations without REST boilerplate
3. **Streaming** - Progressive rendering for AI operations
4. **Middleware** - Built-in auth/redirect layer
5. **Edge Runtime** - Faster webhook responses, global distribution
6. **Automatic Optimization** - Images, fonts, bundles handled by Next.js

### What Stays the Same
- ✅ Supabase for database, auth, storage
- ✅ Claude Sonnet 4.5 AI agents
- ✅ Meta Ads API integration
- ✅ Twilio for SMS/calls
- ✅ Stripe for payments
- ✅ All UI/UX features
- ✅ Same business logic and user flows

---

**Ready for Week 2: Backend Development!** 🎯

*Built by PropertySimple for Next.js 16 App Router with React Server Components*
