"use client";

import { Button } from "@/components/ui/button";
import { Megaphone, ArrowRight } from "lucide-react";

interface OnboardingCampaignProps {
  onNext: () => void;
  onSkip: () => void;
}

export function OnboardingCampaign({ onNext, onSkip }: OnboardingCampaignProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Megaphone className="w-6 h-6 text-primary" />
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Step 3 of 5</div>
          <h2 className="text-xl font-bold">Create Your First Campaign</h2>
        </div>
      </div>

      <p className="text-muted-foreground">
        Our AI creates professional video ads for Facebook and Instagram. You review and approve
        before launch.
      </p>

      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <div className="font-medium">What you get:</div>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>AI-generated video with professional voiceover</li>
          <li>Optimized ad copy for maximum engagement</li>
          <li>Targeted to serious buyers in your area</li>
          <li>Average cost: $120/lead</li>
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
