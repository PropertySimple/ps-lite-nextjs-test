"use client";

import { Button } from "@/components/ui/button";
import { Bot, ArrowRight } from "lucide-react";

interface OnboardingAIProps {
  onNext: () => void;
  onSkip: () => void;
}

export function OnboardingAI({ onNext, onSkip }: OnboardingAIProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Step 4 of 5</div>
          <h2 className="text-xl font-bold">Meet Your AI Assistant</h2>
        </div>
      </div>

      <p className="text-muted-foreground">
        Sarah automatically handles initial lead conversations 24/7, answering questions about
        properties, scheduling showings, and qualifying prospects.
      </p>

      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
        <div className="font-medium">How it works:</div>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-sm font-bold">
              1
            </div>
            <div>
              <div className="font-medium text-sm">Lead contacts you</div>
              <div className="text-sm text-muted-foreground">
                Via SMS, email, or phone call
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-sm font-bold">
              2
            </div>
            <div>
              <div className="font-medium text-sm">AI responds instantly</div>
              <div className="text-sm text-muted-foreground">
                Answers questions, provides details
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-sm font-bold">
              3
            </div>
            <div>
              <div className="font-medium text-sm">You take over when needed</div>
              <div className="text-sm text-muted-foreground">
                AI escalates serious buyers to you
              </div>
            </div>
          </div>
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
