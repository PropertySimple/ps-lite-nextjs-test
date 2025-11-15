import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { PricingTiers } from "@/components/marketing/PricingTiers";
import { PricingFAQ } from "@/components/marketing/PricingFAQ";

export const metadata: Metadata = {
  title: "Pricing - PropertySimple Video Ads | $147 Per Listing or $97/mo Subscription",
  description: "Simple, transparent pricing for AI-powered video ads. Pay-per-listing at $147 or subscribe for $97/mo and save 25% on every ad. 48-hour money-back guarantee.",
  keywords: "real estate video ad pricing, AI ad costs, real estate marketing prices, video ad subscription",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background grain-texture">
      <MarketingNav />

      {/* Hero */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/30">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business. No hidden fees, no surprises.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 backdrop-blur-sm">
            <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold text-success">
              48-Hour Money-Back Guarantee
            </span>
          </div>
        </div>
      </section>

      <PricingTiers />
      <PricingFAQ />

      <MarketingFooter />
    </main>
  );
}
