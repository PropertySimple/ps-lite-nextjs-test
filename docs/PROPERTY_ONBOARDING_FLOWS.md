# Property Onboarding Flows - Architecture Design Document

**Status:** 🚧 Under Discussion - Questions Need Answers
**Created:** November 15, 2025
**Last Updated:** November 15, 2025

---

## Overview

Two distinct ways properties and users enter the PropertySimple platform, each optimized for different user acquisition channels.

---

## Flow 1: API Webhook (Zero-Friction Partner Integration)

### High-Level Flow
```
External API Partner
    ↓
Our Webhook Endpoint (Supabase Edge Function)
    ↓
Create User Account + Property Record
    ↓
Generate Ad Preview (AI agents run automatically?)
    ↓
Send Resend Email with Supabase Magic Link
    ↓
Agent Clicks Email Link
    ↓
Auto-Login via Supabase Auth
    ↓
Landing Page Showing THEIR Ad Preview
    ↓
"Buy This Ad for $149" Button
    ↓
Stripe Checkout
    ↓
Payment Confirmed → Campaign Goes Live
```

### Key Characteristics
- **Zero friction** - Agent never manually creates account
- **Instant preview** - Ad is ready to view when they click email
- **Magic link login** - No password, no signup form
- **Partner-driven** - External platform sends us the leads

### Technical Components Needed
- `POST /api/webhooks/property` - Receives property data from partner API
- Supabase Edge Function to process webhook
- Auto-generate Supabase Auth user
- Auto-generate PropertySimple users table record
- AI agent execution (copy, images, targeting) before email?
- Resend email template with magic link
- `/preview/[propertyId]` or `/preview/[token]` landing page
- Stripe checkout session creation

---

## Flow 2: Self-Service (Homepage → Firecrawl → Ad Builder)

### High-Level Flow
```
PropertySimple Homepage
    ↓
"Create Your Ad" CTA
    ↓
Stripe Checkout ($149)
    ↓
Payment Success → Create Account
    ↓
"Paste Your Property URL" Page
    ↓
User Pastes Zillow/Realtor.com/Personal Site URL
    ↓
Firecrawl AI Scrapes URL
    ↓
Extract Property Data (address, price, beds, baths, images, description)
    ↓
Create Property Record
    ↓
Redirect to AdBuilder (or Review Scraped Data first?)
    ↓
AI Agents Generate Ad Copy, Rank Images, Suggest Targeting
    ↓
User Reviews/Edits
    ↓
Publish Campaign → Meta Ads
```

### Key Characteristics
- **Self-service** - No API partner required
- **AI-powered data entry** - Firecrawl extracts listing details
- **Payment first** - Commit before building ad
- **Direct to consumer** - Agents find us organically

### Technical Components Needed
- Homepage CTA → `/create-ad` or `/get-started`
- Stripe checkout page (no property yet)
- Webhook: `POST /api/webhooks/stripe` (payment success)
- `/onboarding/paste-url` page (post-payment)
- Firecrawl API integration
- Property data extraction logic
- Fallback to manual entry if Firecrawl fails
- AdBuilder integration (start at Step 1)

---

## Critical Questions to Answer

### Flow 1: API Webhook Questions

#### Q1: User Identification & Account Linking
**Question:** When the API sends agent info, what identifies a unique agent?
- Email address?
- MLS ID or license number?
- Phone number?
- If the same agent sends multiple properties over time, how do we know it's the same person?

**Why it matters:** Determines how we deduplicate users and link properties to existing accounts.

---

#### Q2: Ad Preview Generation Timing
**Question:** Do we AUTOMATICALLY generate the ad creative (copy, ranked images, targeting) via AI BEFORE they even click the email link?

**Options:**
- **Option A:** Webhook triggers immediate AI generation
  - Pros: Instant "wow" factor when they click
  - Cons: Costs $0.04 per property even if they never click
  - Time: 15-20 seconds of processing before email sends

- **Option B:** Generate ad preview on first page load (after click)
  - Pros: Only pay for engaged users
  - Cons: 15-20 second loading screen when they first land

- **Option C:** Just show property details formatted nicely, no AI yet
  - Pros: Instant load, no AI cost upfront
  - Cons: Less impressive preview, might reduce conversions

**Follow-up:** If Option A, what's in the "preview"?
- Just ad copy + ranked images?
- Full campaign preview with targeting suggestions?
- Mock Meta ad creative rendering?

---

#### Q3: Email Timing
**Question:** When do we send the Resend email?
- Immediately after webhook receives property (0-2 seconds)?
- After AI generates preview (15-20 seconds)?
- Delayed/batched (e.g., 5 minutes later to avoid rate limits)?

**Why it matters:** Affects perceived responsiveness and webhook timeout handling.

---

#### Q4: Landing Page Design
**Question:** What does the landing page look like and what's the route?

**Route options:**
- `/preview/[propertyId]` - Simple, but property ID might be guessable
- `/preview/[token]` - Secure token, but need token management
- `/preview/[magicLinkToken]` - Supabase auth token doubles as preview token

**Page content options:**
- Just property details + "Buy Ad" button
- Full ad preview (copy, images, targeting) + "Buy Ad" button
- Ad preview + "Edit First" option + "Buy As-Is" button

**Pre-purchase editing:**
- Can they edit the AI-generated ad BEFORE buying?
- Or is it "buy to unlock editing"?

---

#### Q5: Supabase Auth Linking
**Question:** How do we connect the webhook-created user record to Supabase Auth?

**The problem:**
- Webhook creates `users` table record (our app data)
- Magic link creates `auth.users` record (Supabase auth)
- These need to be linked via `user_id`

**Options:**
- **Option A:** Webhook creates Supabase Auth user via Admin API
  - `supabase.auth.admin.createUser({ email, email_confirm: true })`
  - Get user ID back, store in our `users` table
  - Magic link uses this existing auth user

- **Option B:** Webhook only creates `users` record with `pending_auth: true`
  - Magic link creates auth user on first click
  - Trigger updates `users.user_id` with new auth ID

- **Option C:** Use email as linking key
  - Both records have same email
  - Application logic links them on first login

**Security consideration:** How do we prevent someone else from claiming the account if they know the email?

---

### Flow 2: Self-Service Questions

#### Q6: Payment Timing
**Question:** Do they pay BEFORE or AFTER we scrape the property URL?

**Option A: Pay First**
```
Homepage → Stripe Checkout → Paste URL → Firecrawl → AdBuilder
```
- Pros: Guaranteed revenue, commit mechanism
- Cons: Risk if Firecrawl fails (bad URL, paywall, etc.) - customer paid but can't proceed

**Option B: Scrape First**
```
Homepage → Paste URL → Firecrawl → Preview Data → "Buy Ad" → Stripe → AdBuilder
```
- Pros: They see what they're buying, no refunds needed
- Cons: Firecrawl costs incurred for tire-kickers, no payment commitment

**Option C: Hybrid**
```
Homepage → Paste URL → Free Firecrawl Preview → "Looks Good? Buy Ad" → Stripe → Full AdBuilder
```
- Pros: Best UX, they validate data first
- Cons: Need rate limiting on free Firecrawl calls

**Recommendation needed:** Which option aligns with business model?

---

#### Q7: Firecrawl Integration & Fallbacks
**Question:** What's the Firecrawl strategy and error handling?

**Integration questions:**
- Have you used Firecrawl before, or is this new?
- Do we need to handle different URL types differently?
  - Zillow: Structured, likely reliable
  - Realtor.com: Structured, likely reliable
  - Personal websites: Unstructured, might fail
  - Behind login/MLS paywall: Will fail

**Fallback strategy when Firecrawl fails:**
- **Option A:** Show error, ask for different URL
- **Option B:** Fallback to manual entry form (like Listing Manager)
- **Option C:** Partial scrape (get what we can) + manual entry for missing fields
- **Option D:** Refund and cancel

**Rate limiting:**
- Firecrawl has per-minute limits
- Need queue system if multiple users paste URLs at once?

---

#### Q8: Account Creation Timing
**Question:** In Flow 2, when does the user create their account?

**Options:**
- **Before payment:** Traditional signup form → Stripe → Paste URL
  - Pros: Have their info, can send emails, clear user identity
  - Cons: Friction, might abandon before payment

- **After payment:** Stripe checkout (guest) → Auto-create account with Stripe email → Paste URL
  - Pros: Less friction upfront
  - Cons: They might use different email in Stripe vs want to use for login

- **After Firecrawl:** Paste URL → Scrape → "Create account to continue" → Stripe
  - Pros: Qualified lead (good URL), less friction
  - Cons: Complex flow, might lose them

**Recommendation needed:** Which order maximizes conversion?

---

#### Q9: Property Ownership Verification
**Question:** How do we verify they own/represent this property they're scraping?

**Options:**
- **Option A:** Trust-based (no verification)
  - Pros: Zero friction
  - Cons: Someone could advertise properties they don't represent

- **Option B:** Email verification to listing agent
  - Extract agent email from scraped data
  - Send verification email
  - Pros: Prevents fraud
  - Cons: Adds friction, email might be wrong/missing

- **Option C:** MLS license verification (later)
  - Let them create ad, but require license upload before publishing
  - Pros: Balances UX and compliance
  - Cons: More complex, might lose customers at verification step

- **Option D:** Domain verification (if personal site)
  - If URL is from their domain, send verification to admin@domain
  - Pros: Proves domain ownership
  - Cons: Only works for personal sites, not Zillow URLs

**Recommendation needed:** What level of verification is required?

---

#### Q10: AdBuilder Entry Point
**Question:** After Firecrawl populates the property, what happens next?

**Options:**
- **Option A:** Review scraped data page
  - Show all fields extracted by Firecrawl
  - "Edit" buttons to fix incorrect data
  - "Looks Good" → AdBuilder Step 1

- **Option B:** Direct to AdBuilder
  - Skip review, trust Firecrawl
  - AdBuilder Step 1 shows property details in sidebar
  - Can edit during ad creation if needed

- **Option C:** Wizard: Review → AdBuilder → Publish
  - Multi-step process with clear progress bar
  - Review Data (Step 1) → Ad Copy (Step 2) → Photos (Step 3) → etc.

**Recommendation needed:** How much control vs speed?

---

### Cross-Flow Questions

#### Q11: Pricing Difference
**Question:** Is pricing the same for both flows?

**Flow 1 (API Webhook):**
- Who pays: The agent or the API partner?
- If agent pays: Same $149?
- If partner pays: Wholesale pricing? Subscription?

**Flow 2 (Self-Service):**
- Agent pays $149 upfront

**Scenarios:**
- **Scenario A:** Both flows are $149, agent always pays
  - API partner is just a lead source

- **Scenario B:** API partner pays wholesale ($99?), agent gets free trial
  - Partner subsidizes to drive adoption

- **Scenario C:** API flow is free/trial, self-service is $149
  - API partner pays us separately, agent doesn't pay

**Recommendation needed:** What's the business model?

---

#### Q12: Property Editing
**Question:** Can agents edit property details after creation?

**Scenarios where this matters:**
- Flow 1: API webhook sends bad/outdated data
- Flow 2: Firecrawl extracts incorrect information
- Both: Price drops, open house added, new photos uploaded

**Options:**
- **Option A:** Read-only after creation
  - Pros: Simple, data integrity
  - Cons: Frustrating if data is wrong

- **Option B:** Full editing via Listing Manager
  - Pros: Flexible, agents can keep data current
  - Cons: Might break running campaigns if data changes

- **Option C:** Edit only before first campaign publish
  - Pros: Balance flexibility and stability
  - Cons: Once published, stuck with it

**Recommendation needed:** How flexible should property editing be?

---

#### Q13: Multiple Properties Per Agent
**Question:** How do we handle agents with multiple properties over time?

**Flow 1 (API Webhook):**
- Same agent, multiple properties sent via API over weeks/months
- Do we recognize returning agent and add to existing account?
- Or create separate preview/purchase flows each time?

**Flow 2 (Self-Service):**
- Agent buys first ad for Property A
- Later wants to create ad for Property B
- Do they:
  - **Option A:** Login and click "Create New Ad" (no payment yet)
  - **Option B:** Go to homepage again, pay another $149, create new ad
  - **Option C:** Subscription model (pay once, unlimited ads)

**Dashboard implications:**
- Need "My Properties" page showing all properties
- Need "Create Another Ad" button
- Each property can have multiple campaigns over time

**Recommendation needed:** One-time purchase per ad, or subscription?

---

#### Q14: Video Generation Timing
**Question:** When does the AI video get generated?

**Options:**
- **Option A:** During "preview" generation (Flow 1 only)
  - Webhook triggers video generation immediately
  - Email preview includes video
  - Pros: Impressive preview, faster AdBuilder later
  - Cons: Expensive ($X per video), slow webhook processing

- **Option B:** During AdBuilder (both flows)
  - Generate video in AdBuilder Step 3 (after copy and photos selected)
  - Pros: Only generate if they actually build ad
  - Cons: Longer AdBuilder flow time

- **Option C:** After payment (both flows)
  - Payment confirmed → Queue video generation in background
  - AdBuilder shows "Generating video..." with progress
  - Pros: Don't block user flow, pay-gated
  - Cons: They can't preview video before publishing

- **Option D:** After campaign publish
  - Publish campaign → Video generates → Automatically updates ad
  - Pros: Campaign goes live fastest
  - Cons: Initial ad has no video (less effective?)

**Video API cost:** How much does your custom video API charge per video?

**Recommendation needed:** When to generate, considering cost and UX?

---

## Architecture Decisions Needed

### Database Schema Additions

**Current schema (10 tables):**
1. users
2. properties
3. campaigns
4. campaign_metrics
5. contacts
6. conversations
7. conversation_messages
8. activities
9. payments
10. api_keys

**Potential additions for these flows:**

**Property Preview Tokens (Flow 1):**
```sql
CREATE TABLE property_previews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),
  token TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  expires_at TIMESTAMPTZ NOT NULL,
  viewed_at TIMESTAMPTZ,
  purchased_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Firecrawl Jobs (Flow 2):**
```sql
CREATE TABLE firecrawl_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  status TEXT CHECK (status IN ('pending', 'scraping', 'success', 'failed')),
  scraped_data JSONB,
  error TEXT,
  property_id UUID REFERENCES properties(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);
```

**Questions:**
- Do we need preview tokens table, or can we use Supabase auth tokens?
- Do we need firecrawl jobs table, or handle synchronously?

---

### API Endpoints Needed

**Flow 1:**
- `POST /api/webhooks/property` - Receive property from partner API
- `GET /preview/[token]` - Landing page to view ad preview
- `POST /api/preview/purchase` - Convert preview to paid campaign

**Flow 2:**
- `POST /api/onboarding/scrape-url` - Trigger Firecrawl scrape
- `GET /api/onboarding/scrape-status/[jobId]` - Poll scrape progress
- `POST /api/onboarding/create-property` - Create property from scraped data

**Questions:**
- Should webhook be Supabase Edge Function or Next.js API route?
- Should Firecrawl be synchronous (blocking) or async (polling)?

---

### Supabase Auth Flow Design

**Flow 1: Magic Link After Webhook**
```typescript
// Webhook creates user
const { data: authUser } = await supabase.auth.admin.createUser({
  email: webhookData.agentEmail,
  email_confirm: true,
  user_metadata: {
    name: webhookData.agentName,
    phone: webhookData.agentPhone
  }
})

// Create our users record
await supabase.from('users').insert({
  id: authUser.user.id, // Link to auth.users
  email: webhookData.agentEmail,
  name: webhookData.agentName,
  phone: webhookData.agentPhone,
  source: 'api_webhook',
  partner_id: webhookData.partnerId
})

// Generate magic link
const { data: magicLink } = await supabase.auth.admin.generateLink({
  type: 'magiclink',
  email: webhookData.agentEmail,
  options: {
    redirectTo: `${APP_URL}/preview/${propertyPreviewToken}`
  }
})

// Send email with magic link
await resend.emails.send({
  to: webhookData.agentEmail,
  subject: `Your ad is ready for ${property.address}`,
  html: `Click here to preview: ${magicLink.properties.action_link}`
})
```

**Flow 2: Account Creation After Payment**
```typescript
// Stripe webhook receives payment
const email = stripeSession.customer_email

// Create Supabase auth user
const { data: authUser } = await supabase.auth.admin.createUser({
  email,
  email_confirm: true
})

// Create our users record
await supabase.from('users').insert({
  id: authUser.user.id,
  email,
  source: 'self_service',
  stripe_customer_id: stripeSession.customer
})

// Create payment record
await supabase.from('payments').insert({
  user_id: authUser.user.id,
  stripe_payment_id: stripeSession.payment_intent,
  amount: 14900, // $149
  status: 'completed'
})

// Generate magic link for auto-login
const { data: magicLink } = await supabase.auth.admin.generateLink({
  type: 'magiclink',
  email,
  options: {
    redirectTo: `${APP_URL}/onboarding/paste-url`
  }
})

// Send confirmation email
await resend.emails.send({
  to: email,
  subject: 'Payment confirmed - Create your ad now',
  html: `Click to start: ${magicLink.properties.action_link}`
})
```

**Questions:**
- Is this the right way to use Supabase Auth admin API?
- Should we use magic links or create passwords automatically?

---

### Firecrawl Integration Details

**Firecrawl API (hypothetical):**
```typescript
// app/actions/scrape-property.ts
'use server'

import { FirecrawlApp } from '@mendable/firecrawl-js'

export async function scrapePropertyUrl(url: string) {
  const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY })

  // Scrape the URL
  const scrapeResult = await firecrawl.scrapeUrl(url, {
    formats: ['markdown', 'html', 'screenshot'],
    onlyMainContent: true
  })

  // Extract structured data using GPT-5.1
  const extractResult = await openai.chat.completions.create({
    model: 'gpt-5.1',
    messages: [
      {
        role: 'system',
        content: `Extract property listing data from this scraped content.
        Return JSON with: address, price, bedrooms, bathrooms, sqft, description, images[]`
      },
      {
        role: 'user',
        content: scrapeResult.markdown
      }
    ],
    response_format: { type: 'json_object' }
  })

  return JSON.parse(extractResult.choices[0].message.content)
}
```

**Questions:**
- Is Firecrawl the right tool, or should we use something else?
- Do we need GPT-5.1 to extract structured data, or can Firecrawl do it?
- What's the fallback if scraping fails?

---

### Cost Analysis

**Flow 1 (API Webhook) - Cost Per Property:**
- Firecrawl scrape: N/A (API sends structured data)
- AI preview generation (if immediate):
  - AdCopyAgent: $0.0213
  - ImageAnalyzerAgent: $0.0125
  - TargetingAgent: $0.0269
  - Video generation: $X (unknown)
  - **Total: ~$0.06 + video cost**
- Email (Resend): $0.0004
- **Total cost if they never click:** ~$0.06
- **Total cost if they click but don't buy:** ~$0.06
- **Revenue if they buy:** $149
- **Conversion rate needed to break even:** 0.04%

**Flow 2 (Self-Service) - Cost Per Property:**
- Firecrawl scrape: ~$0.50-1.00 (estimate)
- GPT-5.1 extraction: ~$0.01
- AdBuilder AI generation (after payment):
  - AdCopyAgent: $0.0213
  - ImageAnalyzerAgent: $0.0125
  - TargetingAgent: $0.0269
  - Video generation: $X
- **Total cost before payment:** ~$0.51-1.01 (Firecrawl)
- **Total cost after payment:** ~$0.06 + video
- **Revenue:** $149
- **Risk:** If they abandon after Firecrawl preview, lost ~$0.51-1.01

**Questions:**
- What's your custom video API cost per video?
- Is Firecrawl cost estimate accurate?
- Should we limit free Firecrawl previews (Flow 2)?

---

## Implementation Priority

**Week 2-3: Flow 1 (API Webhook) - Higher Priority?**
- Enables partner integrations
- Zero user acquisition cost
- Predictable flow

**Week 4-5: Flow 2 (Self-Service) - Lower Priority?**
- Requires marketing to drive traffic
- More complex (Firecrawl integration)
- Higher risk (pre-payment scraping failures)

**Or reverse priority?**
- Flow 2 first to validate core product with paying customers
- Flow 1 once we have proven product-market fit

**Recommendation needed:** Which flow to build first?

---

## Next Steps

1. **Answer all questions above** (numbered Q1-Q14)
2. **Finalize database schema** for both flows
3. **Design Supabase Auth flow** with exact implementation
4. **Choose Firecrawl or alternative** scraping solution
5. **Update production plan** with chosen flows
6. **Design error handling** for both flows
7. **Create wireframes** for landing pages (/preview/[token], /onboarding/paste-url)

---

## Open Questions Summary

### Must Answer Before Implementation:
1. ✅ What identifies unique agent in webhook? (Email, MLS ID, phone?)
2. ✅ Generate AI preview before or after email click?
3. ✅ When to send email? (Immediate vs after AI generation)
4. ✅ Landing page route and content design?
5. ✅ How to link webhook user to Supabase Auth?
6. ✅ Payment before or after Firecrawl?
7. ✅ Firecrawl error handling strategy?
8. ✅ Account creation timing in Flow 2?
9. ✅ Property ownership verification level?
10. ✅ Post-Firecrawl: Review data or direct to AdBuilder?
11. ✅ Pricing for Flow 1 vs Flow 2?
12. ✅ Allow property editing after creation?
13. ✅ Multiple properties per agent: UX and pricing?
14. ✅ Video generation timing and cost?

### Can Decide Later:
- Exact email templates
- Landing page designs
- Error message copy
- Monitoring and alerting strategy
- A/B testing variants

---

**Status:** 🚧 Awaiting answers to proceed with detailed implementation plan
