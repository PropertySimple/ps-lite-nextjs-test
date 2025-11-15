import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Wand2, MessageSquare, BarChart3 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works - PropertySimple | Simple AI Video Ads in 4 Steps",
  description: "See how easy it is to create AI-powered video ads for your listings. Buy, create, AI handles everything, you close deals. That's it!",
  keywords: "how video ads work, AI real estate marketing process, automated video ads",
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-background grain-texture">
      <MarketingNav />

      {/* Hero */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/30">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            So Simple, It's <span className="gradient-text">Effortless</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps. No tech skills. No video editing. Just more leads.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-24">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary to-accent p-1 shadow-lg shadow-primary/20">
                  <div className="h-full bg-background rounded-xl flex items-center justify-center">
                    <Upload className="w-24 h-24 text-primary" />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 space-y-4">
                <div className="inline-flex items-center gap-3">
                  <div className="text-6xl font-bold gradient-text">
                    01
                  </div>
                  <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>
                <h3 className="text-3xl font-bold">You Buy the Ad</h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Choose Pay-Per-Ad ($147) or subscribe to AutoAds ($97/mo). Upload your listing photos and basic details. Takes about 2 minutes.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-accent to-primary p-1 shadow-lg shadow-accent/20">
                  <div className="h-full bg-background rounded-xl flex items-center justify-center">
                    <Wand2 className="w-24 h-24 text-accent" />
                  </div>
                </div>
              </div>
              <div className="order-1 space-y-4">
                <div className="inline-flex items-center gap-3">
                  <div className="text-6xl font-bold gradient-text">
                    02
                  </div>
                  <div className="h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full" />
                </div>
                <h3 className="text-3xl font-bold">We Create & Place</h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Our AI creates stunning video ads (property tour + influencer style), writes optimized ad copy, and posts them on Facebook & Instagram. All done automatically in about 5 minutes.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-success to-primary p-1 shadow-lg shadow-success/20">
                  <div className="h-full bg-background rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-24 h-24 text-success" />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 space-y-4">
                <div className="inline-flex items-center gap-3">
                  <div className="text-6xl font-bold gradient-text">
                    03
                  </div>
                  <div className="h-1 w-12 bg-gradient-to-r from-success to-primary rounded-full" />
                </div>
                <h3 className="text-3xl font-bold">AI Answers Everything</h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Your AI assistant handles every call and text 24/7. Qualifies leads, answers questions, books showings. You only hear from serious buyers ready to move forward.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary to-success p-1 shadow-lg shadow-primary/20">
                  <div className="h-full bg-background rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-24 h-24 text-primary" />
                  </div>
                </div>
              </div>
              <div className="order-1 space-y-4">
                <div className="inline-flex items-center gap-3">
                  <div className="text-6xl font-bold gradient-text">
                    04
                  </div>
                  <div className="h-1 w-12 bg-gradient-to-r from-primary to-success rounded-full" />
                </div>
                <h3 className="text-3xl font-bold">You Close Deals</h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Jump in anytime to see your leads, export your list, or respond personally. All conversations are in your simple CRM. You focus on what matters: closing deals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain-texture py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary/30 via-background to-primary/5">
        <div className="container mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-4xl font-bold">That's It. Really.</h2>
          <p className="text-xl text-muted-foreground">
            No complicated setup. No tech headaches. No video editing. Just upload, and we handle the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/pricing">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                View Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/examples">
              <Button size="lg" variant="outline" className="border-2 border-primary/30 hover:border-primary hover:bg-primary/10">
                See Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
