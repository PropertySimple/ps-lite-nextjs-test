"use client";

import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";

interface OnboardingListingProps {
  onNext: () => void;
  onSkip: () => void;
}

export function OnboardingListing({ onNext, onSkip }: OnboardingListingProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Home className="w-6 h-6 text-primary" />
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Step 2 of 5</div>
          <h2 className="text-xl font-bold">Import Your Listings</h2>
        </div>
      </div>

      <p className="text-muted-foreground">
        Connect to your MLS or manually add properties to start creating campaigns.
      </p>

      <div className="grid grid-cols-1 gap-4">
        <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
          <h3 className="font-medium mb-2">Connect MLS</h3>
          <p className="text-sm text-muted-foreground">
            Automatically sync your active listings
          </p>
        </div>
        <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
          <h3 className="font-medium mb-2">Add Manually</h3>
          <p className="text-sm text-muted-foreground">
            Enter property details yourself
          </p>
        </div>
      </div>

      <div className="flex gap-3 justify-end mt-8">
        <Button variant="ghost" onClick={onSkip}>
          Skip
        </Button>
        <Button onClick={onNext} className="gap-2">
          Continue
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
