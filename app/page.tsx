import type { Metadata } from "next";
import { HeroNew } from "@/components/marketing/HeroNew";
import { VideoShowcase } from "@/components/marketing/VideoShowcase";
import { SocialProof } from "@/components/marketing/SocialProof";
import { FAQ } from "@/components/marketing/FAQ";
import { CTA } from "@/components/marketing/CTA";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { ProblemAgitate } from "@/components/marketing/ProblemAgitate";
import { HowItWorksSimple } from "@/components/marketing/HowItWorksSimple";
import { PriceComparison } from "@/components/marketing/PriceComparison";

export const metadata: Metadata = {
  title: "Stop Wasting Money on Ads That Don't Work | PropertySimple Video Ads",
  description: "$147 gets you professional video ads + AI assistant + 7 days of ad spend. 48-hour money-back guarantee. Join 30,000+ agents getting more leads with less work.",
  keywords: "real estate video ads, AI real estate marketing, Instagram ads for realtors, Facebook ads for real estate, listing videos, real estate ISA, AI inside sales agent",
  openGraph: {
    title: "Stop Wasting Money on Ads That Don't Work | PropertySimple",
    description: "$147 gets you video ads + AI assistant + ad spend. 48hr guarantee. Join 30K+ agents.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Wasting Money on Ads That Don't Work",
    description: "$147 gets you video ads + AI assistant. 48hr guarantee.",
  },
};

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-background grain-texture">
      <MarketingNav />
      <HeroNew />
      <ProblemAgitate />
      <VideoShowcase />
      <HowItWorksSimple />
      <PriceComparison />
      <SocialProof />
      <FAQ />
      <CTA />
      <MarketingFooter />
    </main>
  );
}
