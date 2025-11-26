"use client";

import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";

interface OnboardingListingProps {
  onNext: () => void;
  onSkip: () => void;
}

export function OnboardingListing({ onNext }: OnboardingListingProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Home className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Multiple Listings?</h2>
        <p className="text-muted-foreground text-sm">
          You can add more listings at any time from the Listings tab.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-muted" />
      </div>

      {/* Action */}
      <Button
        onClick={onNext}
        className="w-full gap-2"
        size="lg"
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
