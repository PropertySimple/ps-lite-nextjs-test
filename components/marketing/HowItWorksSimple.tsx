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
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Two steps. That's it.
          </p>
        </div>

        {/* Steps - TWO steps only */}
        <div className="space-y-8">
          {[
            {
              step: "1",
              title: "Upload Your Listing",
              description: "Address, price, photos. Takes 2 minutes.",
            },
            {
              step: "2",
              title: "We Handle Everything Else",
              description: "We create your videos, write the ad copy, post to Facebook & Instagram, and include 7 days of ad spend. Your ad is live by tomorrow.",
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
            </div>
          ))}
        </div>

        {/* That's it callout */}
        <div className="mt-16 text-center space-y-6 bg-primary/5 border-2 border-primary/20 rounded-2xl p-8">
          <p className="text-3xl font-bold text-foreground">
            That's It. <span className="gradient-text">Seriously.</span>
          </p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            You don't touch Facebook Ads Manager. You don't edit videos. You don't manage ad budgets.
            <br />
            <strong className="text-foreground">You upload your listing and get back to selling homes.</strong>
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg font-bold rounded-full shadow-xl shadow-primary/30"
          >
            Get My Videos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
