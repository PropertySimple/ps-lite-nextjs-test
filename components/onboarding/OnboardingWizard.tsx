"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { OnboardingWelcome } from "./OnboardingWelcome";
import { OnboardingProfile } from "./OnboardingProfile";
import { OnboardingListing } from "./OnboardingListing";
import { OnboardingCampaign } from "./OnboardingCampaign";
import { OnboardingAI } from "./OnboardingAI";
import { OnboardingTest } from "./OnboardingTest";

type OnboardingStep = "welcome" | "profile" | "listing" | "campaign" | "ai" | "test";

export function OnboardingWizard() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");

  useEffect(() => {
    // Check if onboarding has been completed
    const completed = localStorage.getItem("onboarding_completed");
    if (!completed) {
      setOpen(true);
    }
  }, []);

  const handleNext = (nextStep?: OnboardingStep) => {
    const steps: OnboardingStep[] = ["welcome", "profile", "listing", "campaign", "ai", "test"];
    const currentIndex = steps.indexOf(currentStep);

    if (nextStep) {
      setCurrentStep(nextStep);
    } else if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem("onboarding_completed", "true");
    setOpen(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case "welcome":
        return <OnboardingWelcome onNext={() => handleNext()} onSkip={handleSkip} />;
      case "profile":
        return <OnboardingProfile onNext={() => handleNext()} onSkip={handleSkip} />;
      case "listing":
        return <OnboardingListing onNext={() => handleNext()} onSkip={handleSkip} />;
      case "campaign":
        return <OnboardingCampaign onNext={() => handleNext()} onSkip={handleSkip} />;
      case "ai":
        return <OnboardingAI onNext={() => handleNext()} onSkip={handleSkip} />;
      case "test":
        return <OnboardingTest onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}
