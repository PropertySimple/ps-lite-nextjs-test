"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface OnboardingTestProps {
  onComplete: () => void;
}

export function OnboardingTest({ onComplete }: OnboardingTestProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div className="text-center space-y-3">
        <div className="text-sm text-muted-foreground">Step 5 of 5</div>
        <h2 className="text-2xl font-bold">You're All Set!</h2>
        <p className="text-muted-foreground">
          Ready to start generating leads with AI-powered campaigns
        </p>
      </div>

      <div className="bg-primary/10 rounded-lg p-4 space-y-2">
        <div className="font-medium">Next steps:</div>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Review your profile (5 minutes)</li>
          <li>Add your first listing (10 minutes)</li>
          <li>Create a campaign (15 minutes)</li>
          <li>Test the AI assistant (optional)</li>
        </ul>
      </div>

      <div className="flex gap-3 justify-center mt-8">
        <Button onClick={onComplete} size="lg" className="gap-2">
          Start Using PropertySimple
          <CheckCircle className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
