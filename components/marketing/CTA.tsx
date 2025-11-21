"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";

export function CTA() {
  return (
    <section className="grain-texture py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center space-y-8">
          {/* Badge - Urgency */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm animate-pulse">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">Limited Time: First 100 Agents This Month Get Bonus Features</span>
          </div>

          {/* Headline - Direct */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
            Ready to Stop Wasting Money
            <br />
            on Ads That Don't Work?
          </h2>

          {/* Subheadline - Benefit focused */}
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-medium">
            Join 30,000+ agents who stopped overpaying for marketing and started getting <strong className="text-white">3x more qualified leads</strong> for a fraction of the cost.
          </p>

          {/* Risk reversal - Front and center */}
          <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-1">$147</div>
                <div className="text-sm text-white/80">One-time payment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-1">48hrs</div>
                <div className="text-sm text-white/80">Money-back guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-1">2 min</div>
                <div className="text-sm text-white/80">Setup time</div>
              </div>
            </div>
          </div>

          {/* CTA Button - HUGE */}
          <div className="pt-8 space-y-4">
            <Button
              size="lg"
              className="bg-white hover:bg-white/90 text-primary px-12 py-8 text-2xl font-black rounded-full shadow-2xl hover:scale-105 transition-all"
            >
              Get My Videos
              <ArrowRight className="ml-3 h-7 w-7" />
            </Button>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2 text-white/90">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Videos ready in 5 minutes • 7 days ad spend included • Keep videos forever</span>
              </div>
            </div>
          </div>

          {/* Final risk reversal */}
          <div className="pt-6 text-white/90 text-lg">
            <p className="font-semibold">
              Still not sure? Try it for 48 hours.
            </p>
            <p className="text-white/70">
              If you don't love it, we'll refund every penny. And you still keep the videos.
              <br />
              <strong className="text-white">That's how confident we are.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
