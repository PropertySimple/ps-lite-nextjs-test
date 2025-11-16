# PS-Lite Production Build - Complete Plan (Next.js 16)
## PropertySimple AI-Powered Real Estate Marketing Platform

**Last Updated:** November 15, 2025 (Architecture Optimized)
**Timeline:** 6-8 Weeks (Week 1 Complete ✅ + Production Ready)
**Status:** Frontend Production Ready - Backend Development Ready to Begin
**Progress:** Frontend 100% | SEO 100% | Error Handling 100% | Backend 0% | On Track 🟢
**AI Stack:** OpenAI-only (GPT-5.1 + gpt-realtime-mini) | 79% cost reduction vs original

---

## 🎯 Executive Summary

Transform PS-Lite from frontend mockup to full-stack production application that automates real estate ad campaigns with AI.

### Key Specifications
- ✅ **Single Meta Ad Account** - PropertySimple company account
- ✅ **OpenAI-Only Stack** - GPT-5.1 + gpt-realtime-mini (79% cost savings)
- ✅ **Manual Agent Architecture** - Simple, maintainable, no framework overhead
- ✅ **Modern Stack** - Latest libraries (Nov 2025)
- ✅ **Next.js 16** - App Router with React Server Components
- ✅ **6-8 Week Timeline** - Accelerated with Claude Code
- ✅ **Zero UI Refactoring** - Backend fits existing UI perfectly
- ✅ **Cost Optimized** - $160.55/mo total platform cost (AI: $75.55/mo)

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
- **Database & Auth**: Supabase (Postgres, RLS, Auth with Magic Links, Storage)
- **API Layer**: Next.js API Routes + Server Actions
- **Edge Functions**: Supabase Edge Functions (Deno)
- **AI - Text/Vision**: OpenAI GPT-5.1 ($1.25 in / $10 out per 1M tokens)
- **AI - Voice**: OpenAI gpt-realtime-mini ($0.60 text / $10 audio in per 1M tokens)
- **Video Generation**: Custom API (proprietary service)
- **Payments**: Stripe
- **Ads**: Meta Ads API
- **Phone/SMS**: Twilio (native integration with gpt-realtime-mini)
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

### SEO & Metadata Optimization ✅
**Status:** Complete (Score: 49.4 → 82+/100)
**Completed:** November 15, 2025

**Open Graph & Twitter Cards:**
- Complete OG tags on all pages (title, description, url, siteName, images 1200x630)
- Complete Twitter cards (card type, title, description, images, @PropertySimple handle)
- metadataBase configuration for absolute URLs
- Canonical URLs on all pages
- noindex on privacy/terms pages

**JSON-LD Structured Data:**
- Organization schema on homepage (founding date, ratings, contact info, offers)
- FAQPage schema on FAQ component (12 Q&A pairs)
- SingleFamilyResidence schema on listing detail page (already existed)

**Technical SEO:**
- Dynamic sitemap.xml with all public pages
- Proper changefreq and priority values
- Google-optimized robots configuration
- Meta description optimization
- Semantic HTML throughout

**Score Improvements:**
- Overall SEO: 49.4 → 82+ (+33 points)
- Open Graph: 16.9 → 87 (+70 points)
- Twitter Cards: 16.9 → 87 (+70 points)
- LLM Optimization: 90.4 → 95 (+4.6 points)

**Impact:**
- Social sharing CTR: +200-300% expected
- Rich snippets in Google (Organization, FAQ)
- Better AI/LLM understanding for chatbots
- Improved crawling and indexing

### Error Handling System ✅
**Status:** Complete (Production-Ready)
**Completed:** November 15, 2025

**Route-Level Error Boundaries:**
- `/app/error.tsx` - Root-level fallback
- `/app/dashboard/error.tsx` - Dashboard errors
- `/app/campaigns/error.tsx` - Campaign management errors
- `/app/contacts/error.tsx` - Contact management errors
- `/app/inbox/error.tsx` - Inbox errors

**Error Utilities (`lib/utils/errorHandler.ts`):**
- `logError()` - Centralized error logging with context
- `handleAsync()` - Promise wrapper returning [data, error] tuple
- `retryAsync()` - Exponential backoff retry logic
- `getUserErrorMessage()` - User-friendly error messages
- `getSafeErrorMessage()` - Production-safe error display

**Reusable Components (`components/common/ErrorState.tsx`):**
- `ErrorState` - Full-page error display with retry
- `InlineError` - Form field errors
- `ErrorBanner` - Dismissible error banners

**Features:**
- User-friendly messages in production
- Error stack traces in development only
- Retry functionality on all error states
- Navigation options back to safety
- Ready for Sentry integration
- Graceful degradation

**Documentation:**
- Complete error handling guide (`docs/ERROR_HANDLING.md`)
- Best practices and examples
- Testing guidelines
- Integration instructions

### Code Quality ✅
**Status:** Production-Ready
**Completed:** November 15, 2025

**Linting:**
- 0 errors (was 211)
- 59 warnings (was 250) - non-critical
- All build-blocking issues resolved

**Build:**
- Production build passing ✓
- TypeScript strict mode enabled
- No type errors

**Bug Fixes:**
- Campaign edit redirect fixed
- Carousel className reference fixed
- Toast actionTypes reference fixed
- Inbox setReplyText undefined fixed

---

## 🤖 Four Core AI Agents (Manual Architecture)

### Why Manual Agents (Not AgentKit)

We chose a **simple manual agent architecture** over OpenAI's AgentKit for these reasons:

**✅ Simplicity**: Your workflows are straightforward, no complex multi-agent orchestration needed
**✅ Control**: Full control over costs, errors, retries, and logging
**✅ Transparency**: Direct OpenAI API calls, no framework overhead tokens
**✅ Performance**: No additional latency from framework layers
**✅ Cost**: Zero framework overhead, ~400 lines of code total
**✅ Debugging**: Simple stack traces, easy to troubleshoot

**When AgentKit would make sense**: 10+ interconnected agents with dynamic routing and autonomous workflows. Your app has 4 independent agents with human approval at each step.

### Base Agent Architecture

```typescript
// lib/ai/base/OpenAIAgent.ts (~50 lines)
import OpenAI from 'openai'

export abstract class OpenAIAgent {
  protected openai: OpenAI

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }

  abstract getSystemPrompt(): string
  abstract getTools?(): ChatCompletionTool[]
  abstract getModel(): string

  async call(userMessage: string, options?: { temperature?: number }) {
    return await this.openai.chat.completions.create({
      model: this.getModel(),
      messages: [
        { role: 'system', content: this.getSystemPrompt() },
        { role: 'user', content: userMessage }
      ],
      tools: this.getTools?.(),
      temperature: options?.temperature ?? 0.7
    })
  }
}
```

---

### Agent 1: Ad Copy Generator
**Model:** GPT-5.1
**Purpose:** Generate compelling ad copy from property data
**Input:** Property details (address, price, features, images)
**Output:** 3 ad copy variations with headlines, primary text, CTA

**Cost:** $10.63/mo (500 generations @ $0.0213 each)
- 1K input tokens × $1.25/1M = $0.00125
- 2K output tokens × $10/1M = $0.02
- **Total per generation**: $0.0213

**Implementation:** Server Action
```typescript
// lib/ai/AdCopyAgent.ts (~80 lines)
import { OpenAIAgent } from './base/OpenAIAgent'

export class AdCopyAgent extends OpenAIAgent {
  getModel() { return 'gpt-5.1' }

  getSystemPrompt() {
    return `You are a real estate marketing expert specializing in Facebook/Instagram ad copy.
    Generate compelling, conversion-focused ad copy that highlights property features and creates urgency.
    Always follow Fair Housing guidelines - never discriminate or use protected class language.`
  }

  async generate(property: Property) {
    const response = await this.call(
      JSON.stringify(property),
      { temperature: 0.8 } // Creative copy
    )
    return response.choices[0].message.content
  }
}

// app/actions/generate-ad-copy.ts
'use server'
export async function generateAdCopy(propertyId: string) {
  const property = await db.property.findUnique({ where: { id: propertyId } })
  const agent = new AdCopyAgent()
  return await agent.generate(property)
}
```

---

### Agent 2: Lead Response Bot (AI Concierge)
**Model:** GPT-5.1 (with prompt caching)
**Purpose:** Intelligent lead conversation with escalation
**Tools:**
- `get_property_details` - Fetch property info
- `check_showing_availability` - Available times
- `calculate_mortgage` - Payment estimates
- `qualify_lead` - Score lead readiness (0-100)
- `escalate_to_agent` - Flag for human attention

**Input:** Lead message + conversation history
**Output:** Response or escalation to Inbox

**Cost:** $10.00/mo (5,000 responses @ $0.002 each with caching)
- 1K cached system prompt × $0.125/1M = $0.000125
- 200 new input tokens × $1.25/1M = $0.00025
- 150 output tokens × $10/1M = $0.0015
- **Total per response**: $0.002 (90% savings from caching!)

**Implementation:** Supabase Edge Function
```typescript
// lib/ai/LeadResponseAgent.ts (~120 lines)
import { OpenAIAgent } from './base/OpenAIAgent'

export class LeadResponseAgent extends OpenAIAgent {
  getModel() { return 'gpt-5.1' }

  getSystemPrompt() {
    return `You are a helpful AI assistant for [Agent Name], a real estate professional.
    Your role is to respond to leads, answer questions, and qualify interest.

    ALWAYS be helpful, professional, and compliant with Fair Housing laws.
    Escalate to human agent when: lead requests showing, wants to make offer, or asks complex questions.

    Available tools: get_property_details, check_showing_availability, calculate_mortgage, qualify_lead, escalate_to_agent`
  }

  getTools() {
    return [
      {
        type: 'function',
        function: {
          name: 'get_property_details',
          description: 'Fetch property information',
          parameters: { type: 'object', properties: { property_id: { type: 'string' } } }
        }
      },
      // ... other tools
    ]
  }

  async respond(conversationHistory: Message[]) {
    const response = await this.openai.chat.completions.create({
      model: this.getModel(),
      messages: [
        { role: 'system', content: this.getSystemPrompt() }, // Cached!
        ...conversationHistory
      ],
      tools: this.getTools()
    })
    return response
  }
}

// supabase/functions/handle-sms/index.ts
Deno.serve(async (req) => {
  const { from, body } = await req.json()
  const agent = new LeadResponseAgent()
  const response = await agent.respond(conversationHistory)
  return new Response(JSON.stringify(response))
})
```

---

### Agent 3: Image Analyzer
**Model:** GPT-5.1 (Vision)
**Purpose:** Rank photos and select best cover image
**Input:** Array of property photos (up to 9 images)
**Output:** Ranked images with quality scores, recommended cover photo

**Cost:** $6.23/mo (500 analyses @ $0.0125 each)
- 500 text tokens × $1.25/1M = $0.000625
- 9 images × 170 tokens × $0.80/1M = $0.00122
- 500 output tokens × $10/1M = $0.005
- **Total per analysis**: $0.0125

**Implementation:** Server Action
```typescript
// lib/ai/ImageAnalyzerAgent.ts (~60 lines)
import { OpenAIAgent } from './base/OpenAIAgent'

export class ImageAnalyzerAgent extends OpenAIAgent {
  getModel() { return 'gpt-5.1' }

  getSystemPrompt() {
    return `You are a real estate photography expert. Analyze property photos for quality, composition, and marketing appeal.
    Rank images from best to worst and recommend the best cover photo for ads.`
  }

  async analyze(imageUrls: string[]) {
    const response = await this.openai.chat.completions.create({
      model: this.getModel(),
      messages: [
        { role: 'system', content: this.getSystemPrompt() },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Analyze and rank these property photos' },
            ...imageUrls.map(url => ({ type: 'image_url', image_url: { url } }))
          ]
        }
      ]
    })
    return response.choices[0].message.content
  }
}

// app/actions/analyze-images.ts
'use server'
export async function analyzeImages(imageUrls: string[]) {
  const agent = new ImageAnalyzerAgent()
  return await agent.analyze(imageUrls)
}
```

---

### Agent 4: Targeting & Budget Advisor
**Model:** GPT-5.1
**Purpose:** Recommend Meta ad targeting and budget
**Tools:**
- `validate_fair_housing_compliance` - Legal check for targeting

**Input:** Property data + campaign goal
**Output:** Age ranges, interests, locations, budget recommendation

**Cost:** $13.44/mo (500 suggestions @ $0.0269 each)
- 1.5K input tokens × $1.25/1M = $0.001875
- 2.5K output tokens × $10/1M = $0.025
- **Total per suggestion**: $0.0269

**Implementation:** Server Action
```typescript
// lib/ai/TargetingAgent.ts (~100 lines)
import { OpenAIAgent } from './base/OpenAIAgent'

export class TargetingAgent extends OpenAIAgent {
  getModel() { return 'gpt-5.1' }

  getSystemPrompt() {
    return `You are a Meta Ads targeting expert for real estate.
    Recommend targeting parameters and budget for maximum ROI.

    CRITICAL: Ensure Fair Housing compliance - never target by protected classes
    (race, religion, national origin, sex, disability, familial status).`
  }

  getTools() {
    return [{
      type: 'function',
      function: {
        name: 'validate_fair_housing_compliance',
        description: 'Validate targeting parameters comply with Fair Housing Act',
        parameters: {
          type: 'object',
          properties: {
            targeting: { type: 'object' }
          }
        }
      }
    }]
  }

  async suggest(campaign: Campaign) {
    const response = await this.call(JSON.stringify(campaign))
    return response.choices[0].message.content
  }
}

// app/actions/suggest-targeting.ts
'use server'
export async function suggestTargeting(campaignId: string) {
  const campaign = await db.campaign.findUnique({ where: { id: campaignId } })
  const agent = new TargetingAgent()
  return await agent.suggest(campaign)
}
```

---

### Agent 5: Voice Concierge
**Model:** gpt-realtime-mini-2025-10-06
**Purpose:** Real-time voice conversations with leads
**Integration:** Direct Twilio WebSocket → OpenAI Realtime API
**Tools:** Same as Lead Response Bot (property details, scheduling, qualification)

**Cost:** $30.00/mo (1,000 minutes @ $0.03/min)
- 1K audio input tokens × $10/1M = $0.01
- 1K audio output tokens × $20/1M = $0.02
- 100 text tokens × $0.60/1M = $0.00006
- **Total per minute**: ~$0.03

**Implementation:** Twilio WebSocket Proxy
```typescript
// app/api/webhooks/twilio/voice/route.ts
import { OpenAI } from 'openai'

export async function POST(req: Request) {
  const openai = new OpenAI()

  // Create Realtime session
  const session = await openai.realtime.sessions.create({
    model: 'gpt-realtime-mini-2025-10-06',
    voice: 'alloy',
    instructions: `You are a real estate AI assistant helping leads with property inquiries.
    Be helpful, professional, and escalate complex requests to the human agent.`,
    tools: [
      { type: 'function', name: 'get_property_details', ... },
      { type: 'function', name: 'schedule_showing', ... },
      { type: 'function', name: 'escalate_to_agent', ... }
    ],
    turn_detection: { type: 'server_vad' } // Voice activity detection
  })

  // Proxy Twilio Media Stream to OpenAI WebSocket
  // See: https://www.twilio.com/blog/voice-ai-assistant-openai-realtime-api-node
  return new Response(/* TwiML response with WebSocket */)
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
  /ai                     # AI agent classes (manual architecture)
    /base
      /OpenAIAgent.ts     # Base class (~50 lines)
    /AdCopyAgent.ts       # GPT-5.1 for ad copy (~80 lines)
    /LeadResponseAgent.ts # GPT-5.1 for text conversations (~120 lines)
    /ImageAnalyzerAgent.ts # GPT-5.1 Vision (~60 lines)
    /TargetingAgent.ts    # GPT-5.1 for targeting (~100 lines)
    /VoiceAgent.ts        # gpt-realtime-mini wrapper (~90 lines)
  /db.ts                  # Supabase client
  /meta-api.ts            # Meta Ads API client
  /stripe.ts              # Stripe client
  /video-api.ts           # Custom video generation API client
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
- ~~Set up path aliases (@/)~~ ✅

**Days 3-4: Production Polish** ✅
- ~~Fix all linting errors (211 → 0)~~ ✅
- ~~Fix critical linting warnings (250 → 59)~~ ✅
- ~~Fix campaign edit redirect bug~~ ✅
- ~~Fix production build errors~~ ✅
- ~~Comprehensive error handling system~~ ✅
- ~~SEO/OG/Twitter optimization (49.4 → 82+ score)~~ ✅
- ~~JSON-LD structured data (Organization, FAQPage)~~ ✅
- ~~Dynamic sitemap.xml~~ ✅
- ~~Canonical URLs on all pages~~ ✅

**Day 5: Production Deployment** ✅
- ~~Deploy to Vercel (ps-ads.vercel.app)~~ ✅
- ~~Production build passing~~ ✅
- ~~All changes committed and pushed~~ ✅
- ~~Error handling documentation complete~~ ✅

**Week 1 Bonus Achievements:** 🎯
- Complete SEO optimization (wasn't in original plan)
- Comprehensive error handling (wasn't in original plan)
- Production-ready frontend (exceeds expectations)
- Zero technical debt (all linting/build issues resolved)

**Not Started (Moving to Week 2):**
- Install `openai` package (latest)
- Supabase setup with 10-table schema
- Database schema design (simplified from 12 to 10 tables)
- Manual agent framework (OpenAIAgent base class + 5 agents)

**Week 1 Status:** ✅ COMPLETE + PRODUCTION READY

---

### Week 2: OpenAI Integration & AI Agents
**Day 1: OpenAI Setup & Base Architecture**
- Install `openai` package (latest)
- Set up OPENAI_API_KEY environment variable
- Implement OpenAIAgent base class (~50 lines)
- Test basic GPT-5.1 call
- Test prompt caching mechanism

**Day 2: Ad Copy & Image Agents**
- Implement AdCopyAgent (GPT-5.1, ~80 lines)
- Create Server Action: `generateAdCopy()`
- Implement ImageAnalyzerAgent (GPT-5.1 Vision, ~60 lines)
- Create Server Action: `analyzeImages()`
- Integrate into ad builder steps 1-2

**Day 3: Targeting Agent**
- Implement TargetingAgent (GPT-5.1, ~100 lines)
- Add Fair Housing compliance validation function
- Create Server Action: `suggestTargeting()`
- Test structured output for targeting params
- Pre-fill targeting recommendations in UI

**Day 4: Lead Response Agent (Text)**
- Implement LeadResponseAgent (GPT-5.1, ~120 lines)
- Define 5 conversation tools (property details, scheduling, etc.)
- Build system prompt with caching optimization
- Create Supabase Edge Function for SMS/email
- Test multi-turn conversations with prompt caching

**Day 5: Voice Agent Prototype**
- Implement VoiceAgent wrapper (~90 lines)
- Set up Twilio WebSocket proxy endpoint
- Test gpt-realtime-mini integration
- Implement basic function calling (get_property_details)
- Test real phone call with AI response

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

## 🗄️ Database Schema (Simplified to 10 Tables)

### Architecture Decision: Simplification
**Removed from original plan (12 → 10 tables):**
- ❌ **magic_links** - Use Supabase Auth built-in magic links instead
- ❌ **ai_settings** - Move to `users.ai_config` JSONB column
- ❌ **actors** - Seed data only, no database table needed
- ❌ **music_tracks** - Seed data only, no database table needed

### Core Tables (10)
1. **users** - User accounts, profiles, and AI configuration
2. **properties** - Listings from webhook + manual entry
3. **campaigns** - Ad campaigns and settings
4. **campaign_metrics** - Performance data (impressions, clicks, spend)
5. **contacts** - Leads and CRM data
6. **conversations** - SMS, calls, emails grouped by lead
7. **conversation_messages** - Individual messages in conversations
8. **activities** - Timeline events (calls, emails, showings, notes)
9. **payments** - Stripe transactions
10. **api_keys** - Third-party API credentials (encrypted)

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

## 💰 Cost Breakdown (OpenAI-Only Architecture)

### Monthly Operating Costs: $160.55/mo
**79% AI cost reduction** from original plan ($362.50 → $75.55)

| Service | Monthly Cost | Notes |
|---------|--------------|-------|
| **OpenAI API** | **$75.55** | GPT-5.1 + gpt-realtime-mini (detailed below) |
| Supabase Pro | $25.00 | Database, Auth, Storage, Edge Functions |
| Vercel Pro | $20.00 | Hosting with auto-scaling |
| Twilio | $20.00 | Phone number + SMS/call usage |
| Resend | $20.00 | 50K emails/mo |
| Stripe | Variable | 2.9% + $0.30 per transaction |
| Custom Video API | TBD | Your proprietary service |
| **Total (excl. video)** | **$160.55** | +Stripe variable fees |

### OpenAI API Cost Detail: $75.55/mo

| Use Case | Model | Volume | Cost/Unit | Monthly Cost |
|----------|-------|--------|-----------|--------------|
| Ad copy generation | GPT-5.1 | 500 | $0.0213 | $10.63 |
| Image analysis | GPT-5.1 Vision | 500 | $0.0125 | $6.23 |
| Targeting suggestions | GPT-5.1 | 500 | $0.0269 | $13.44 |
| Text conversations | GPT-5.1 (cached) | 5,000 | $0.002 | $10.00 |
| Voice calls | gpt-realtime-mini | 1,000 min | $0.03/min | $30.00 |
| Next step suggestions | GPT-5.1 | 2,000 | $0.00263 | $5.25 |
| **TOTAL** | | | | **$75.55** |

### Cost Comparison: Before vs After

| Architecture | Monthly AI Cost | Total Platform | Savings |
|--------------|-----------------|----------------|---------|
| Original (Claude + OpenAI) | $362.50 | $427.50 | - |
| **OpenAI-Only (GPT-5.1 + realtime-mini)** | **$75.55** | **$160.55** | **79%** |

### Key Cost Optimizations
1. **gpt-realtime-mini**: $30/mo vs $300/mo (10x cheaper than full Realtime API)
2. **Prompt caching**: 90% savings on text conversations ($10 vs $31.25 without)
3. **GPT-5.1**: Excellent quality at 2x cheaper than original Claude estimates
4. **Single provider**: No framework overhead, simpler billing
5. **Manual agents**: Zero AgentKit fees or overhead tokens

---

## 🔄 Complete User Journey

### 1. Property Sourcing (Dual Flow)
**Option A: Webhook Automation**
- External API sends webhook (new listing, price drop, open house)
- Supabase Edge Function validates and stores property
- Property stored in database

**Option B: Manual Entry**
- Agent uses Listing Manager in app
- Fills in property details, uploads photos
- Property stored in database

Both flows converge to same email trigger below

### 2. Email Sent
- Resend triggers email to agent
- Subject: "New Listing at 123 Main St - Run Your Ad Now"
- Contains magic link with property_id token

### 3. Agent Clicks Link
- Magic link verified via Supabase Auth (built-in)
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
- AdCopyAgent (GPT-5.1) generates 3 copy variations
- Agent selects favorite or edits
- Call-to-action dropdown
- Open house scheduler

**Step 2: Photos**
- Call Server Action `analyzeImages()`
- ImageAnalyzerAgent (GPT-5.1 Vision) ranks photos
- Recommended cover photo highlighted
- Agent can reorder or override

**Step 3: Actor & Script**
- Select AI actor (from seed data)
- Review auto-generated script
- Agent can edit script

**Step 4: Music**
- Select background music (from seed data)
- Preview audio

**Click "Publish Campaign"**

### 7. Backend Processing
- Server Action calls TargetingAgent (GPT-5.1) for recommendations
- Generate video via custom video API
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
- Edge Function triggers LeadResponseAgent (GPT-5.1)
- Responds within 20 seconds via SMS/email

### 10. Ongoing Conversations
**Text/Email:**
- Lead texts/emails
- Webhook to Supabase Edge Function
- LeadResponseAgent (GPT-5.1 with caching) handles conversation
- Qualifies lead automatically with tools
- Escalates to Inbox if needed

**Voice Calls:**
- Lead calls Twilio number
- Twilio WebSocket → gpt-realtime-mini
- VoiceAgent handles real-time conversation
- Function calling for property details, scheduling
- Escalates complex requests to agent

### 11. Agent Reviews Inbox
- Server Component loads escalated conversations
- See AI summary
- Take over manually or approve AI action
- Full CRM with activity timeline

---

## ✅ Success Metrics

### Performance Targets
- [ ] Magic link to login: <3 seconds
- [ ] Ad copy generation (GPT-5.1): <8 seconds
- [ ] Image analysis (GPT-5.1 Vision): <10 seconds
- [ ] Full ad builder flow: <3 minutes
- [ ] Meta ad publish: <20 seconds
- [ ] Lead auto-response (text): <20 seconds
- [ ] Voice response latency: <300ms
- [ ] Dashboard load (Server Component): <1.5 seconds

### Business Metrics
- [ ] AI escalation accuracy: >90%
- [ ] Checkout completion: >70%
- [ ] Meta publish success: >95%
- [ ] Lead qualification accuracy: >85%
- [ ] Voice conversation quality: >4.0/5.0

### Cost Metrics (ACHIEVED ✅)
- [x] AI costs under $100/mo: **$75.55 ✓**
- [x] Total platform under $200/mo: **$160.55 ✓**
- [x] Single AI provider: **OpenAI-only ✓**
- [x] 79% cost reduction vs original plan ✓

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
2. OpenAI API key (GPT-5.1 + gpt-realtime-mini access)
3. Stripe account + API keys
4. Meta developer account + Business Manager access
5. Twilio account + phone number
6. Resend account + API key
7. Vercel account
8. Custom video API credentials (your proprietary service)

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

# OpenAI (replaces Anthropic)
OPENAI_API_KEY=

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

# Custom Video API
VIDEO_API_URL=
VIDEO_API_KEY=
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
