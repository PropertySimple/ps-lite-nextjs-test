# Migration Guide: Vite + React Router → Next.js 16 App Router

## Overview

This document outlines the migration of PropertySimple from a Vite-based single-page application (SPA) with React Router to **Next.js 16** with the **App Router**. This migration modernizes the codebase, enables server-side rendering (SSR), and improves performance and developer experience.

**Migration Date**: November 2024
**Next.js Version**: 16.0.1
**React Version**: 19.2.0
**Node.js Requirement**: 18+

---

## What Was Migrated

### From
- **Build Tool**: Vite (fast bundler for development and production)
- **Routing**: React Router v6 (client-side routing)
- **Architecture**: Client-side rendered (CSR) single-page application
- **Configuration**: Vite config with manual route definitions

### To
- **Build Tool**: Next.js built-in bundler (Webpack via Next.js)
- **Routing**: Next.js App Router (file-based routing, server-first)
- **Architecture**: Hybrid SSR/CSR with React Server Components (RSC)
- **Configuration**: File-based routing, convention-based layout system

### Preserved Components
All React components, hooks, utilities, and styling have been preserved. The migration focused on the routing layer and build infrastructure rather than rewriting components.

---

## Key Architectural Changes

### 1. File-Based Routing

**Before (React Router)**:
```typescript
// Router configuration was manually defined
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/campaigns" element={<Campaigns />} />
    <Route path="/campaigns/:id" element={<CampaignDetail />} />
  </Routes>
</BrowserRouter>
```

**After (Next.js App Router)**:
```
/app
  /page.tsx           → "/" (dashboard)
  /campaigns
    /page.tsx         → "/campaigns"
    /[id]
      /page.tsx       → "/campaigns/:id"
```

Routes are now automatically inferred from the file structure. No manual route configuration is needed.

### 2. pages-src Wrapper Pattern

During the migration, a **temporary `pages-src/` directory** was created as a bridge between the old page structure and the new App Router. This pattern allows for incremental migration:

```typescript
// app/campaigns/page.tsx (App Router)
import Campaigns from "@/pages-src/Campaigns";

export default function CampaignsPage() {
  return <Campaigns />;
}
```

The `pages-src/` directory contains the original page-level components from the Vite era. This allows the migration to be completed incrementally without a complete rewrite.

**Current Usage**:
- `pages-src/Campaigns.tsx` → Used by `/app/campaigns/page.tsx`
- `pages-src/CampaignDetail.tsx` → Used by `/app/campaign-detail/[id]/page.tsx`
- `pages-src/ContactDetail.tsx` → Used by `/app/contact/[id]/page.tsx`
- `pages-src/Inbox.tsx` → Used by `/app/inbox/page.tsx`
- `pages-src/Outbox.tsx` → Used by `/app/outbox/page.tsx`
- `pages-src/ListingManager.tsx` → Used by `/app/listing-manager/page.tsx`

### 3. Server vs. Client Components

**Next.js 16 enforces React Server Components (RSC) by default.**

- **Server Components**: Render on the server, reduce JavaScript sent to the client
- **Client Components**: Marked with `"use client"` directive, run in the browser
- **Metadata**: Defined in server components, replaced client-side `<meta>` tags

All pages in `/app/campaigns`, `/app/contacts`, etc., are client components (marked with `"use client"`) because they rely on state management and interactivity. This is intentional for now but can be optimized in future refactoring.

### 4. Metadata and SEO

**Before (Vite + React Router)**:
```typescript
// Manually managed via react-helmet or similar
useEffect(() => {
  document.title = "Campaigns";
  document.meta.description = "...";
}, []);
```

**After (Next.js)**:
```typescript
// app/layout.tsx - Root layout
export const metadata: Metadata = {
  title: "PropertySimple - AI-Powered Real Estate Marketing",
  description: "Run smarter real estate campaigns with AI assistance",
};
```

Metadata is now handled declaratively via the Next.js metadata API, providing better SEO and performance.

### 5. Environment Variables

**Before**: Vite required `VITE_` prefix for client-side access
**After**: Next.js supports both `NEXT_PUBLIC_` and server-only variables

See `.env.example` for current environment variable setup.

---

## Breaking Changes for Developers

### 1. Import Path Changes
**Old**: Path resolution may have differed
**New**: Use the `@/` alias consistently (configured in `tsconfig.json`)

```typescript
// Always use
import { Button } from "@/components/ui/button";

// Never use relative imports for cross-cutting concerns
// ❌ import Button from "../../components/ui/button";
```

### 2. Pages Must Export Default
**All route pages must have a default export:**

```typescript
// ✓ Correct
export default function Page() {
  return <div>Content</div>;
}

// ❌ Incorrect
export const Page = () => {
  return <div>Content</div>;
};
```

### 3. React Router Hooks No Longer Available
**The following hooks are deprecated:**
- `useHistory()` → Use `useRouter()` from `next/router` (or `next/navigation` for App Router)
- `useParams()` → Still available in Next.js App Router from `next/navigation`
- `useLocation()` → Use `usePathname()` and `useSearchParams()` from `next/navigation`
- `useNavigate()` → Use `useRouter()` from `next/navigation`

**Migration Example**:
```typescript
// Before (React Router)
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
navigate("/campaigns/123");

// After (Next.js)
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/campaigns/123");
```

### 4. Layout Component Changes
**Root Layout** (`/app/layout.tsx`) now handles:
- HTML structure
- Metadata
- Global providers (Theme, Query Client, etc.)
- Global styles

Nested layouts are defined in `layout.tsx` files in subdirectories.

### 5. Static Assets
**Public files must be in `/public`**, not inline or from assets folder. Images are optimized via `next/image`.

### 6. Development Server Command
```bash
# Old (Vite)
npm run dev  # Starts on port 5173 by default

# New (Next.js)
npm run dev  # Starts on port 3000 by default
```

---

## Performance Improvements Achieved

### 1. Server-Side Rendering (SSR)
- Initial page load includes full HTML from the server
- Better First Contentful Paint (FCP) and Largest Contentful Paint (LCP)
- Improved SEO: search engines see fully-rendered pages

### 2. Automatic Code Splitting
- Next.js automatically splits code at route boundaries
- Only JavaScript for the current page is loaded
- Lazy loading of dynamic imports works out of the box

### 3. Image Optimization
- Built-in `next/image` component optimizes images
- Automatic WebP conversion
- Responsive images with srcset
- Lazy loading by default

### 4. Font Optimization
- `next/font` with Google Fonts (Inter is integrated)
- Fonts are self-hosted, no external requests to Google's servers
- Zero layout shift (CLS optimization)

### 5. Production Bundle Size
- Tree-shaking is more aggressive
- Server components reduce client-side bundle
- Next.js automatically optimizes builds

### 6. API Routes
- API routes can be colocated with pages
- Built-in request/response handling
- Middleware support for cross-cutting concerns

---

## Known Issues and Limitations

### 1. The pages-src Anti-Pattern (Current Implementation)

**What is it?**
Currently, all route pages in `/app` import and re-export components from `/pages-src`. This creates an unnecessary indirection layer:

```
/app/campaigns/page.tsx → imports → /pages-src/Campaigns.tsx
```

**Why is this a problem?**
- Extra file lookup and indirection
- Confusing for new developers
- Violates Next.js conventions
- Prevents full use of server components and layouts

**Current Status**: This is a **temporary migration artifact**. The architecture was preserved to minimize changes during the initial migration.

**Example**:
```typescript
// app/campaigns/page.tsx (only 5 lines)
import Campaigns from "@/pages-src/Campaigns";

export default function CampaignsPage() {
  return <Campaigns />;
}

// pages-src/Campaigns.tsx (320+ lines of actual logic)
"use client";
export default function Campaigns() { ... }
```

### 2. All Pages Are Client Components

Since the `pages-src/` components handle state and interactivity, they must be marked with `"use client"`. This defeats some of Next.js's SSR advantages.

**Optimal State**: Pages should be server components with selective client components for interactive features.

### 3. No API Route Separation

API logic, if any, should be in `/app/api` routes rather than handled client-side. Currently, the app appears to be fully client-side.

### 4. Missing Route Layouts

Some pages could benefit from intermediate layouts (e.g., `/app/campaign-detail/layout.tsx`), but these are not yet implemented.

### 5. Metadata Generation

Route-specific metadata is defined at the root level. Dynamic metadata for pages like campaign details would be better handled with `generateMetadata()` functions.

---

## Future Refactoring Recommendations

### Phase 1: Eliminate pages-src Anti-Pattern (High Priority)
Integrate the `pages-src/` components directly into `/app` route pages:

```typescript
// Instead of: app/campaigns/page.tsx imports from pages-src
// Do this: Move logic directly into page

// app/campaigns/page.tsx
"use client";
import { useState } from "react";
export default function CampaignsPage() {
  const [tab, setTab] = useState("current");
  // ... rest of logic from pages-src/Campaigns.tsx
}
```

**Timeline**: 1-2 weeks
**Impact**: Cleaner architecture, easier to understand file structure

### Phase 2: Implement Route Layouts (Medium Priority)
Create intermediate layouts for feature areas:

```
/app
  /campaigns
    /layout.tsx         → Shared campaign layout
    /page.tsx
    /[id]
      /layout.tsx       → Campaign detail layout
      /page.tsx
```

**Benefits**: Shared navigation, consistent styling, DRY principle

### Phase 3: Separate Server and Client Components (Medium Priority)
Restructure to maximize server-side rendering:

```
/app/campaigns
  /page.tsx             → Server component
  /CampaignsContent.tsx → Client component (interactive parts only)
```

**Benefits**: Reduced JavaScript, better performance, improved SEO

### Phase 4: Implement API Routes (Low-Medium Priority)
If backend integration is planned, create API routes:

```
/app/api
  /campaigns
    /route.ts           → GET /api/campaigns, POST /api/campaigns
  /contacts
    /[id]
      /route.ts         → GET /api/contacts/[id]
```

### Phase 5: Dynamic Metadata (Low Priority)
Implement `generateMetadata()` for SEO improvements:

```typescript
// app/campaign-detail/[id]/page.tsx
export async function generateMetadata({ params }) {
  const campaign = await fetchCampaign(params.id);
  return {
    title: campaign.title,
    description: campaign.description,
  };
}
```

### Phase 6: Internationalization (i18n) (Future)
Consider adding i18n support using `next-intl` or similar.

---

## Configuration and Build Details

### Build Configuration
- **Next.js Config**: `next.config.ts` (minimal, no custom webpack config needed)
- **TypeScript**: Strict mode enabled (`tsconfig.json`)
- **CSS**: Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- **Styling System**: Shadcn/ui components with Tailwind CSS

### Development Server
```bash
npm run dev
# Starts on http://localhost:3000
# Fast refresh enabled for instant feedback
# TypeScript checking enabled
```

### Production Build
```bash
npm run build
# Optimizes bundle size
# Generates static pages where possible
# Creates optimized production artifacts

npm start
# Starts production server
```

### Environment Variables
- **Public Variables**: Prefix with `NEXT_PUBLIC_` to expose to browser
- **Server-Only Variables**: No prefix, only available on server
- See `.env.example` for current setup

---

## Testing and Deployment

### Local Testing
```bash
npm run dev        # Development with fast refresh
npm run build      # Production build (test locally with npm start)
npm start          # Production mode
```

### Deployment
Currently deployed on **Vercel**, which has first-class Next.js support:
- Automatic deployments on git push
- Edge functions support
- Image optimization at edge
- Middleware support

### Build Output
- `.next/` directory contains production build
- Static pages pre-rendered
- Dynamic pages rendered on-demand
- API routes ready for edge execution

---

## Troubleshooting Common Issues

### Issue: "Module not found" errors
**Solution**: Check `tsconfig.json` for path aliases. Use `@/` prefix for imports.

### Issue: Hydration mismatch errors
**Solution**: Ensure components marked with `"use client"` don't rely on server-only APIs. Use `useEffect` with early return for client-only logic.

### Issue: Image not loading
**Solution**: Images should be in `/public`. Use `next/image` component for optimized loading.

### Issue: Build fails with TypeScript errors
**Solution**: Run `npm run lint` and fix issues before building. Next.js enforces strict TypeScript checking.

### Issue: Slow development server startup
**Solution**: Restart the dev server. Clear `.next/` cache if necessary.

---

## Resources and Further Reading

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app/building-your-application/routing)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Deploying on Vercel](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## Summary

PropertySimple has been successfully migrated from Vite + React Router to Next.js 16 with the App Router. The migration preserves all existing components and functionality while enabling:

1. ✓ Server-side rendering for better performance
2. ✓ Automatic code splitting and optimization
3. ✓ Improved SEO with built-in metadata support
4. ✓ Better developer experience with file-based routing
5. ✓ Production-ready deployment infrastructure

The temporary `pages-src/` wrapper pattern can be eliminated in Phase 1 refactoring, leading to a cleaner and more maintainable architecture.

---

**Last Updated**: November 8, 2024
