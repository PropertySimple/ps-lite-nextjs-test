"use client";

import { Button } from "@/components/ui/button";
import { Rocket, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface OnboardingCompleteProps {
  onComplete: () => void;
}

export function OnboardingComplete({ onComplete }: OnboardingCompleteProps) {
  const router = useRouter();

  const handleViewCampaign = () => {
    onComplete();
    router.push("/campaign-detail/1");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Rocket className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Your Campaign is Being Created!</h2>
        <p className="text-muted-foreground text-sm">
          We're building your videos now
        </p>
      </div>

      {/* Info box */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
        <Sparkles className="w-5 h-5 text-primary mt-0.5" />
        <div>
          <div className="font-medium text-sm">Videos ready in minutes</div>
          <div className="text-xs text-muted-foreground">
            Your campaign will auto-launch in 24 hours, or you can go live sooner
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>

      {/* Action */}
      <Button
        onClick={handleViewCampaign}
        className="w-full"
        size="lg"
      >
        View Your Campaign
      </Button>
    </div>
  );
}
