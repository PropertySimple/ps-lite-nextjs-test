import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { ExamplesGallery } from "@/components/marketing/ExamplesGallery";

export const metadata: Metadata = {
  title: "Video Ad Examples - PropertySimple | See Real Estate Video Ads in Action",
  description: "Watch real examples of AI-generated video ads for real estate. See property tours and influencer-style videos that get results.",
  keywords: "real estate video examples, property ad samples, AI video ads, listing video examples",
};

export default function ExamplesPage() {
  return (
    <main className="min-h-screen bg-background grain-texture">
      <MarketingNav />

      {/* Hero */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/30">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            See Our <span className="gradient-text">Videos</span> in Action
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real examples of AI-generated video ads that stop the scroll and generate leads
          </p>
        </div>
      </section>

      <ExamplesGallery />

      <MarketingFooter />
    </main>
  );
}
