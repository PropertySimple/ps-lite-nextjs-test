"use client";

import { Button } from "@/components/ui/button";
import { User, ArrowRight } from "lucide-react";

interface OnboardingProfileProps {
  onNext: () => void;
  onSkip: () => void;
}

export function OnboardingProfile({ onNext, onSkip }: OnboardingProfileProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Step 1 of 5</div>
          <h2 className="text-xl font-bold">Complete Your Profile</h2>
        </div>
      </div>

      <p className="text-muted-foreground">
        Your profile helps potential buyers connect with you. We've pre-filled it with information
        from your brokerage, but feel free to customize.
      </p>

      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <div className="font-medium">What we've added:</div>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Your photo and contact information</li>
          <li>Brokerage details</li>
          <li>Professional bio</li>
        </ul>
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
