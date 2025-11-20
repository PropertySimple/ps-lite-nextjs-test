"use client";

import { Button } from "@/components/ui/button";
import { Upload, Wand2, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Listing",
    description: "Just add your property photos and basic details. Takes 2 minutes, tops.",
    visual: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    icon: Wand2,
    title: "AI Creates & Posts",
    description: "We turn it into stunning video ads and post them to Facebook & Instagram automatically.",
    visual: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Get Qualified Leads",
    description: "Interested buyers fill out your lead forms. You get notifications with serious buyers ready to view.",
    visual: "from-green-500 to-emerald-500",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-950/10 via-background to-background">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            So Simple, It Feels Like <span className="text-blue-500">Magic</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three steps to more leads. No tech skills required.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={index} className="relative">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left: Visual */}
                  <div className={`order-2 md:order-${index % 2 === 0 ? '1' : '2'}`}>
                    <div className={`relative aspect-video rounded-2xl bg-gradient-to-br ${step.visual} p-1`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/80 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-24 h-24 text-white opacity-20" />
                      </div>
                      <div className="relative h-full flex items-center justify-center">
                        <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${step.visual} flex items-center justify-center shadow-2xl`}>
                          <Icon className="w-16 h-16 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className={`order-1 md:order-${index % 2 === 0 ? '2' : '1'} space-y-4`}>
                    <div className="inline-flex items-center gap-3">
                      <div className={`text-6xl font-bold bg-gradient-to-br ${step.visual} bg-clip-text text-transparent`}>
                        {step.number}
                      </div>
                      <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    </div>

                    <h3 className="text-3xl font-bold">{step.title}</h3>

                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Time indicator */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>
                        {index === 0 && "~2 minutes"}
                        {index === 1 && "~5 minutes (automated)"}
                        {index === 2 && "Ongoing (automated)"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Connector Arrow */}
                {!isLast && (
                  <div className="flex justify-center my-8">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col gap-6 items-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Ready to get started?</h3>
              <p className="text-muted-foreground">Join hundreds of agents getting more leads</p>
            </div>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all hover:scale-105"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground">
              No credit card required • First campaign free • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
