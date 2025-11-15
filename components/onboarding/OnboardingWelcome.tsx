"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

interface OnboardingWelcomeProps {
  onNext: () => void;
  onSkip: () => void;
}

export function OnboardingWelcome({ onNext, onSkip }: OnboardingWelcomeProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold">Welcome to PropertySimple!</h2>
        <p className="text-muted-foreground text-lg">
          Let's get you set up in just a few minutes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-3xl font-bold text-primary">1</div>
          <div className="text-sm font-medium mt-2">Setup Profile</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-3xl font-bold text-primary">2</div>
          <div className="text-sm font-medium mt-2">Add Listings</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-3xl font-bold text-primary">3</div>
          <div className="text-sm font-medium mt-2">Launch Campaign</div>
        </div>
      </div>

      <div className="flex gap-3 justify-end mt-8">
        <Button variant="ghost" onClick={onSkip}>
          Skip for now
        </Button>
        <Button onClick={onNext} className="gap-2">
          Get Started
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
