"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";

export function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-background">
      {/* Background video placeholder - would be actual video */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/60 to-background" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-blue-300">AI-Powered Real Estate Marketing</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-white">Get More Buyer Leads</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Without Lifting a Finger
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We create stunning video ads for your listings, post them on Instagram & Facebook, and give you an AI assistant to answer every call. You just close deals.
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm sm:text-base text-blue-200">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Videos Made For You</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Ads Placed Automatically</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>AI Answers Your Calls</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-400/30 hover:border-blue-400 bg-transparent hover:bg-blue-500/10 text-white px-8 py-6 text-lg rounded-full backdrop-blur-sm"
              onClick={() => setIsVideoPlaying(true)}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo (60s)
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 text-blue-300/80 text-sm">
            <p>48-hour money-back guarantee • Setup in 5 minutes • Keep your videos forever</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-400/30 rounded-full p-1">
          <div className="w-1.5 h-3 bg-blue-400 rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}
