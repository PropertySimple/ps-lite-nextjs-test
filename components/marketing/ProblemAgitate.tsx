"use client";

import { Card } from "@/components/ui/card";
import { X, TrendingDown, Clock, DollarSign } from "lucide-react";

const problems = [
  {
    icon: TrendingDown,
    problem: "Losing listings to agents with better marketing",
    pain: "...sellers choose the agent who looks like they can actually sell their home",
  },
  {
    icon: DollarSign,
    problem: "Spending $500-2000/month on ads that don't work",
    pain: "...and getting maybe 2-3 lukewarm leads (if you're lucky)",
  },
  {
    icon: Clock,
    problem: "Wasting hours learning Facebook Ads Manager",
    pain: "...when you should be showing homes and closing deals",
  },
];

export function ProblemAgitate() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-destructive/5">
      <div className="container mx-auto max-w-6xl">
        {/* Headline */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Sound Familiar?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Most agents are throwing money at ads that don't convert, missing leads, and losing listings to competitors with better marketing.
          </p>
        </div>

        {/* Problem grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="p-6 border-2 border-destructive/20 bg-card relative overflow-hidden">
                {/* X mark in corner */}
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="w-5 h-5 text-destructive" />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-foreground">{item.problem}</h3>
                    <p className="text-muted-foreground">{item.pain}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Agitate */}
        <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 text-center space-y-4">
          <p className="text-xl sm:text-2xl font-semibold text-foreground">
            Here's the truth: <span className="text-primary">You don't have time to become a marketing expert.</span>
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            You're a real estate agent, not a videographer or ad manager.
            <br />
            <strong className="text-foreground">You need professional marketing that just works—without the learning curve or massive budget.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
