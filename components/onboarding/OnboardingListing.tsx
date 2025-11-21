"use client";

import { Button } from "@/components/ui/button";
import { Home, Plus, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface OnboardingListingProps {
  onNext: () => void;
  onSkip: () => void;
}

export function OnboardingListing({ onNext, onSkip }: OnboardingListingProps) {
  const router = useRouter();

  const handleAddListing = () => {
    // Close onboarding and go to listing manager
    localStorage.setItem("onboarding_completed", "true");
    router.push("/listing-manager?addListing=true");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Home className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Add More Listings?</h2>
        <p className="text-muted-foreground text-sm">
          Want to create campaigns for other properties?
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full h-auto py-4 justify-start gap-3"
          onClick={handleAddListing}
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Plus className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <div className="font-medium">Add a Listing</div>
            <div className="text-sm text-muted-foreground">Import another property</div>
          </div>
        </Button>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-muted" />
      </div>

      {/* Action */}
      <Button
        onClick={onSkip}
        className="w-full gap-2"
        size="lg"
      >
        Skip for Now
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
