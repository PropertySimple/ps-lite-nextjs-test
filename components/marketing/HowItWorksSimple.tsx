"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HowItWorksSimple() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto max-w-4xl">
        {/* Headline */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Here's How <span className="gradient-text">PropertySimple</span> Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Literally 4 steps. No tech skills. No video editing. No ad management.
          </p>
        </div>

        {/* Steps - SUPER simple */}
        <div className="space-y-8">
          {[
            {
              step: "1",
              title: "You Upload Your Listing Photos",
              description: "Just the basics: address, price, photos. Takes 2 minutes.",
            },
            {
              step: "2",
              title: "We Create Professional Video Ads",
              description: "Our AI makes both a property tour AND an influencer-style video. Ready in 5 minutes.",
            },
            {
              step: "3",
              title: "We Post Them on Facebook & Instagram",
              description: "Ads go live targeting buyers in your area. Ad spend included for 7 days.",
            },
            {
              step: "4",
              title: "Our AI Assistant Handles All Inquiries",
              description: "24/7 phone & text answering. Qualifies leads. You only get hot prospects ready to view.",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-6 group">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center text-3xl font-black group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                <p className="text-lg text-muted-foreground">{item.description}</p>
              </div>
              {index < 3 && (
                <div className="hidden md:block ml-auto">
                  <ArrowRight className="w-6 h-6 text-primary rotate-90 opacity-30" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* That's it callout */}
        <div className="mt-16 text-center space-y-6 bg-primary/5 border-2 border-primary/20 rounded-2xl p-8">
          <p className="text-3xl font-bold text-foreground">
            That's It. <span className="gradient-text">Seriously.</span>
          </p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            You don't touch Facebook Ads Manager. You don't edit videos. You don't answer every tire-kicker call at midnight.
            <br />
            <strong className="text-foreground">You just upload your listing and watch the qualified leads come in.</strong>
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg font-bold rounded-full shadow-xl shadow-primary/30"
          >
            Start Your First Campaign Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
