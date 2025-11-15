import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export const metadata: Metadata = {
  title: "About PropertySimple | 10+ Years of Real Estate Marketing Innovation",
  description: "PropertySimple has been pioneering AI-powered real estate marketing since 2016. Over 30,000 customers served with 5,000+ five-star reviews.",
  keywords: "PropertySimple company, real estate marketing company, AI video ads company",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background grain-texture">
      <MarketingNav />

      {/* Hero */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/30">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Making Real Estate Marketing <span className="gradient-text">Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Since 2016, we've been helping real estate agents close more deals with less effort
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl space-y-16">
          {/* Our Story */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                PropertySimple was founded in 2016 in Los Angeles with a simple mission: make real estate marketing actually work for agents, not against them.
              </p>
              <p>
                We saw agents struggling with expensive, complicated marketing tools that required tech expertise they didn't have. They were paying thousands for ads that didn't convert, hiring expensive videographers, and missing leads because they couldn't answer calls 24/7.
              </p>
              <p>
                So we built something different. A platform that uses AI to do the heavy lifting—creating professional videos, writing compelling ad copy, managing campaigns, and even qualifying leads—while agents focus on what they do best: selling homes.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">2016</div>
              <div className="text-sm text-muted-foreground">Founded</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">30K+</div>
              <div className="text-sm text-muted-foreground">Customers Served</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">5000+</div>
              <div className="text-sm text-muted-foreground">5-Star Reviews</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Years Innovation</div>
            </div>
          </div>

          {/* Innovation */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">10+ Years of Ad Innovation</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                We've been in the social media advertising game since the early days. Over the past decade, we've run millions of dollars in ad spend, tested thousands of creative approaches, and built proprietary AI models trained specifically on real estate marketing.
              </p>
              <p>
                That decade of experience is baked into every video we create and every ad we run. Our AI knows what works because we've been refining it for over 10 years.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <div className="grain-texture bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/20">
              <p className="text-xl leading-relaxed">
                "To empower every real estate agent with enterprise-level marketing technology, so they can compete with the big teams while staying independent."
              </p>
            </div>
          </div>

          {/* Why We're Different */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Why We're Different</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Built for Agents, Not Tech Companies</h3>
                <p className="text-muted-foreground">
                  We don't assume you're a marketing expert or tech guru. Everything is designed to be simple, intuitive, and effective.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">10+ Years of Ad Expertise</h3>
                <p className="text-muted-foreground">
                  Our AI isn't just smart—it's experienced. A decade of real-world data powers every decision we make.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Transparent Pricing</h3>
                <p className="text-muted-foreground">
                  No hidden fees, no surprise charges. You know exactly what you're paying and what you're getting.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Results-Driven</h3>
                <p className="text-muted-foreground">
                  We measure success by your leads and closed deals, not vanity metrics like impressions or likes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain-texture py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary/30 via-background to-primary/5">
        <div className="container mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-4xl font-bold">Join 30,000+ Agents</h2>
          <p className="text-xl text-muted-foreground">
            See why thousands of agents trust PropertySimple for their video advertising
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all hover:scale-105 shadow-lg shadow-primary/20"
            >
              Get Started
            </a>
            <a
              href="/examples"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-primary/30 hover:border-primary hover:bg-primary/10 font-semibold transition-colors"
            >
              See Examples
            </a>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
