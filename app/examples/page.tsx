import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

// Lazy load examples gallery for better initial page load
const ExamplesGallery = dynamic(() => import("@/components/marketing/ExamplesGallery").then(mod => ({ default: mod.ExamplesGallery })), {
  loading: () => <div className="h-[1000px] bg-muted/30 animate-pulse" />,
  ssr: true, // Keep SSR for SEO
});

export const metadata: Metadata = {
  title: "Video Ad Examples - PropertySimple | See Real Estate Video Ads in Action",
  description: "Watch real examples of AI-generated video ads for real estate. See property tours and influencer-style videos that get results.",
  keywords: "real estate video examples, property ad samples, AI video ads, listing video examples",
  alternates: {
    canonical: "/examples",
  },
  openGraph: {
    title: "Real Estate Video Ad Examples | PropertySimple",
    description: "Watch real examples of AI-generated video ads for real estate. Property tours and influencer-style videos that stop the scroll and generate leads.",
    url: "/examples",
    siteName: "PropertySimple",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PropertySimple Video Ad Examples - See Real Estate Videos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Video Examples | PropertySimple",
    description: "Watch AI-generated property tours and influencer-style videos that get results. See real examples that stop the scroll.",
    images: ["/og-image.png"],
    site: "@PropertySimple",
    creator: "@PropertySimple",
  },
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
