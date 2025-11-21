"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Video, Target, Clapperboard, BarChart3, Sparkles, Shield } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "AI Video Creation",
    description: "We turn your listings into scroll-stopping videos. Choose from walkthrough tours or influencer-style content. All created in minutes, not days.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Target,
    title: "Smart Ad Placement",
    description: "We post your videos on Facebook & Instagram, targeting the exact buyers looking in your area. You don't touch a thing.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Clapperboard,
    title: "Multiple Video Styles",
    description: "Property walkthroughs, AI influencer presentations, photo slideshows, and more. Pick the style that fits your listing and brand.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "See exactly how your ads perform. Track views, clicks, and leads. Know which listings attract the most buyers.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Sparkles,
    title: "Optimized Ad Copy",
    description: "AI writes headlines and descriptions that stop the scroll and get clicks. Tested on thousands of real estate ads.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Shield,
    title: "Done-For-You",
    description: "No video editing. No ad management. No tech skills needed. We handle everything while you focus on selling homes.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-blue-950/10">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Everything You Need to <span className="text-blue-500">Win More Listings</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            All the tools to attract buyers, without the tech headaches
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
              >
                <CardContent className="p-6 space-y-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all pointer-events-none" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Setup takes less than 5 minutes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
