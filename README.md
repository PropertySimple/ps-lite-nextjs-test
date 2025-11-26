# PropertySimple Ads - Real Estate Video Ad Platform

A modern Next.js application for real estate professionals to create video ads and manage marketing campaigns.

## Tech Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **Runtime**: React 19.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **UI Components**: Radix UI primitives
- **Charts**: Recharts
- **Date Utilities**: date-fns
- **Icons**: Lucide React
- **Fonts**: Cabinet Grotesk (display), Outfit (body)
- **Analytics**: Facebook Pixel integration
- **Image Galleries**: react-swipeable

## Features

### Marketing & Public Pages
- Modern marketing website with conversion-optimized design
- Public listing detail pages with:
  - Photo galleries with fullscreen mode and swipe gestures
  - Contact forms for lead capture
  - Mortgage calculators and property details
  - School ratings and neighborhood information
  - Interactive maps (Mapbox ready)
  - Similar properties showcase
  - Open house scheduling

### Application Features
- Video ad creation and management
- Campaign creation and performance tracking
- Listing management with detailed property information
- Campaign analytics dashboards
- Dark mode support
- Responsive design with mobile-first approach

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (see .env.example)

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/app              - Next.js App Router pages and layouts
  /listing/[id]   - Public listing detail pages
  /campaigns      - Campaign management
  /ad-builder     - Ad creation wizard
  /about          - Marketing about page
  /how-it-works   - Marketing features page
  /pricing        - Marketing pricing page
  /examples       - Marketing examples page
/components       - Reusable React components
  /ui             - shadcn/ui components
  /marketing      - Marketing site components (nav, footer, hero, etc.)
  /listing        - Listing detail page components
  /listing-manager - Listing management components
  /campaign-detail - Campaign detail components
  /ad-builder     - Ad creation components
  /profile        - Profile and settings components
  /common         - Shared components (PageHelper, SectionHeader, etc.)
/hooks            - Custom React hooks
/lib              - Utility functions and helpers
/data             - Mock data and types
/types            - TypeScript type definitions
/public           - Static assets (images, videos, fonts)
/docs             - Project documentation
```

## Development

This project uses:
- **next/font** for optimized font loading (Cabinet Grotesk, Outfit, Geist)
- **Error boundaries** for graceful error handling
- **Loading states** with Next.js loading.tsx files
- **Metadata generation** for SEO optimization
- **JSON-LD Schema** for rich snippets on listing pages
- **TypeScript** with strict type checking
- **Logger utility** for development logging
- **Turbopack** for fast development builds
- **React Server Components** for optimal performance

## Environment Variables

Required environment variables:
- `NEXT_PUBLIC_FB_PIXEL_ID` - Facebook Pixel ID for tracking (optional)
- `MAPBOX_TOKEN` - Mapbox API key for maps (optional)

See `.env.example` for the complete list of environment variables.

## Design System

The application uses a warm, modern design system:
- **Colors**: Terracotta primary (#C65D41), Gold accent (#E8B923), Warm cream background
- **Typography**: Cabinet Grotesk for headings, Outfit for body text
- **Components**: Custom shadcn/ui components with Radix UI primitives
- **Grain Texture**: Subtle grain overlay for premium feel
- **Dark Mode**: Full support with separate light/dark mode logos

## Key Pages

- **Marketing Site**: `/` (homepage), `/pricing`, `/how-it-works`, `/examples`, `/about`
- **Application**: `/campaigns`, `/listing-manager`, `/profile`, `/ad-builder`
- **Public Listings**: `/listing/[id]` - SEO-optimized property detail pages
- **Campaign Details**: `/campaign-detail/[id]`

## URL Parameter Variants

The application supports URL parameters to enable different form variants:

### Ad Copy Editor - Open House Mode
**URL:** `/ad-builder/[campaignId]/ad-copy?type=openhouse`

When the `type=openhouse` parameter is present, the ad copy editor displays:
- Standard ad copy editing fields
- **Open House Scheduler** - date/time selector for open house events

Without the parameter, the standard ad copy editor is shown without open house scheduling.

### Launch Page - Subscribe & Save Toggle
**URL:** `/launch/[id]?plan=sub`

When the `plan=sub` parameter is present, the checkout page displays:
- **Pricing toggle** - Choose between Subscribe & Save ($117/ad with 20% savings) or One-time ($147/ad)
- Default selection is Subscribe & Save

Without the parameter, only the one-time $147 pricing is shown.

## Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new).

Current deployment: **https://ps-ads.vercel.app**

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Documentation

- `docs/ARCHITECTURE_PLAN.md` - Technical architecture and implementation plan
- `docs/FULL_PRODUCTION_PLAN.md` - Production roadmap
- `docs/PROPERTY_ONBOARDING_FLOWS.md` - Property import flows
- `docs/ERROR_HANDLING.md` - Error handling patterns
