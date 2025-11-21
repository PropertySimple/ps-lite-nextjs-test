"use client";

import dynamic from "next/dynamic";
import { HeroNew } from "@/components/marketing/HeroNew";
import { SocialProof } from "@/components/marketing/SocialProof";
import { CTA } from "@/components/marketing/CTA";
import { ProblemAgitate } from "@/components/marketing/ProblemAgitate";
import { HowItWorksSimple } from "@/components/marketing/HowItWorksSimple";
import { ListingModalProvider } from "@/components/marketing/ListingModalContext";

// Lazy load below-the-fold heavy components for better initial page load
const VideoShowcase = dynamic(() => import("@/components/marketing/VideoShowcase").then(mod => ({ default: mod.VideoShowcase })), {
  loading: () => <div className="h-[600px] bg-muted/30 animate-pulse" />,
  ssr: true,
});

const PriceComparison = dynamic(() => import("@/components/marketing/PriceComparison").then(mod => ({ default: mod.PriceComparison })), {
  loading: () => <div className="h-[400px] bg-muted/30 animate-pulse" />,
  ssr: true,
});

const FAQ = dynamic(() => import("@/components/marketing/FAQ").then(mod => ({ default: mod.FAQ })), {
  loading: () => <div className="h-[500px] bg-muted/30 animate-pulse" />,
  ssr: true,
});

export function MarketingPageContent() {
  return (
    <ListingModalProvider>
      <HeroNew />
      <ProblemAgitate />
      <VideoShowcase />
      <HowItWorksSimple />
      <PriceComparison />
      <SocialProof />
      <FAQ />
      <CTA />
    </ListingModalProvider>
  );
}
