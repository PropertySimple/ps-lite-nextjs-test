# PropertySimple - AI-Powered Real Estate Marketing

A modern Next.js application for real estate professionals to manage marketing campaigns, contacts, and listings with AI assistance.

## Tech Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **Runtime**: React 19.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **UI Components**: Radix UI primitives
- **Charts**: Recharts
- **Date Utilities**: date-fns
- **Icons**: Lucide React

## Features

- AI-powered campaign creation and management
- Contact and lead management
- Listing management with detailed property information
- Real-time analytics and performance tracking
- Inbox/Outbox messaging
- Dark mode support
- Responsive design

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
/components       - Reusable React components
  /ui             - shadcn/ui components
  /dashboard      - Dashboard-specific components
  /campaign-detail - Campaign detail components
  /contact-detail - Contact detail components
/pages-src        - Page-level components (legacy from migration)
/hooks            - Custom React hooks
/lib              - Utility functions and helpers
/data             - Mock data and types
/types            - TypeScript type definitions
/public           - Static assets
```

## Development

This project uses:
- **next/font** for optimized font loading (Inter font)
- **Error boundaries** for graceful error handling
- **Loading states** with Next.js loading.tsx files
- **Metadata generation** for SEO optimization
- **TypeScript** with strict type checking
- **Logger utility** for development logging

## Environment Variables

See `.env.example` for required environment variables.

## Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
