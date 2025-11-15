"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function HeroNew() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="grain-texture relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Asymmetric layout - content left, visual right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">

          {/* LEFT: Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Eyebrow - Social proof */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 backdrop-blur-sm transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <Sparkles className="w-4 h-4 text-success" />
              <span className="text-sm font-semibold text-success">Join 30,000+ Agents Getting More Leads</span>
            </div>

            {/* Headline - Problem-focused */}
            <div className="space-y-4">
              <h1
                className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <span className="text-foreground">Tired of Spending</span>{' '}
                <span className="gradient-text inline-block">$1000s on Ads</span>{' '}
                <span className="text-foreground">That Don't Work?</span>
              </h1>

              <p
                className={`text-xl sm:text-2xl text-muted-foreground leading-relaxed transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                We create scroll-stopping <strong className="text-foreground">video ads</strong> for your listings,
                run them on Facebook & Instagram, and give you an <strong className="text-foreground">AI assistant</strong> to
                qualify every lead—all for less than one dinner out.
              </p>
            </div>

            {/* Value bullets - Benefit focused */}
            <div
              className={`space-y-3 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {[
                { text: "Videos created in 5 minutes", sub: "Both property tours & influencer-style" },
                { text: "Ads posted automatically to FB & IG", sub: "Ad spend included for 7 days" },
                { text: "AI answers calls & texts 24/7", sub: "Only sends you hot, ready-to-buy leads" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 transition-all duration-500`}
                  style={{ transitionDelay: `${700 + i * 100}ms` }}
                >
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-foreground">{item.text}</div>
                    <div className="text-sm text-muted-foreground">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons - Direct response */}
            <div
              className={`flex flex-col sm:flex-row items-start gap-4 pt-4 transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: '1000ms',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-10 py-7 text-lg font-bold rounded-full shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105"
                >
                  Get Your First Ad FREE
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground pl-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>48-hour money-back guarantee • Keep the videos</span>
                </div>
              </div>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/30 hover:border-primary bg-transparent hover:bg-primary/10 text-foreground px-8 py-7 text-lg rounded-full backdrop-blur-sm font-semibold"
              >
                <Play className="mr-2 h-5 w-5" />
                See How It Works (90s)
              </Button>
            </div>

            {/* Trust indicators - Risk reversal */}
            <div
              className={`grid grid-cols-3 gap-4 pt-6 border-t border-border transition-all duration-700 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$147</div>
                <div className="text-xs text-muted-foreground">One-time payment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">48hrs</div>
                <div className="text-xs text-muted-foreground">Money-back</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5★</div>
                <div className="text-xs text-muted-foreground">5,000+ reviews</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Video showcase with phones */}
          <div
            className={`relative transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-12 rotate-6'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="relative flex items-center justify-center gap-6 lg:gap-8">
              {/* Left video - Property Tour */}
              <div
                className="relative w-44 sm:w-52 lg:w-60 transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                style={{ transformOrigin: 'center center' }}
              >
                <div className="bg-foreground/5 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border-2 border-foreground/10">
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black">
                    <video
                      src="/video/basic-video.mp4"
                      loop
                      muted
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-primary text-white text-sm font-bold whitespace-nowrap shadow-lg">
                  Property Tour
                </div>
              </div>

              {/* Right video - AI Influencer */}
              <div
                className="relative w-44 sm:w-52 lg:w-60 transform rotate-6 translate-y-8 hover:rotate-0 transition-transform duration-500"
                style={{ transformOrigin: 'center center' }}
              >
                <div className="bg-foreground/5 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border-2 border-foreground/10">
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black">
                    <video
                      src="/video/upgrade-video.mp4"
                      loop
                      muted
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-accent text-foreground text-sm font-bold whitespace-nowrap shadow-lg">
                  AI Influencer
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            <div className="absolute -left-4 top-1/4 bg-card border-2 border-primary/20 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
              <div className="text-3xl font-bold text-primary">10x</div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">More Engagement</div>
            </div>

            <div className="absolute -right-4 bottom-1/4 bg-card border-2 border-success/20 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
              <div className="text-3xl font-bold text-success">3x</div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">More Leads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full p-1">
          <div className="w-1.5 h-3 bg-primary rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}
