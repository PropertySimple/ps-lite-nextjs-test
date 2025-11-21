"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Edit3 } from "lucide-react";

interface OnboardingCompleteProps {
  onComplete: () => void;
}

export function OnboardingComplete({ onComplete }: OnboardingCompleteProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold">You're All Set!</h2>
        <p className="text-muted-foreground text-sm">
          Here's what happens next
        </p>
      </div>

      {/* Next steps */}
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
          <Mail className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <div className="font-medium text-sm">Check your email</div>
            <div className="text-xs text-muted-foreground">
              We'll notify you when your campaign is ready to review
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
          <Edit3 className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <div className="font-medium text-sm">Edit before launch</div>
            <div className="text-xs text-muted-foreground">
              You can customize your videos before they go live
            </div>
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
        onClick={onComplete}
        className="w-full"
        size="lg"
      >
        Go to My Campaigns
      </Button>
    </div>
  );
}
