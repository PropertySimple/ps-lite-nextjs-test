"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { OnboardingProfile } from "./OnboardingProfile";
import { OnboardingListing } from "./OnboardingListing";
import { OnboardingComplete } from "./OnboardingComplete";

type OnboardingStep = "profile" | "listing" | "complete";

export function OnboardingWizard() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("profile");

  useEffect(() => {
    // Check if onboarding has been completed
    const completed = localStorage.getItem("onboarding_completed");
    if (!completed) {
      // Async setState to avoid cascading renders
      setTimeout(() => setOpen(true), 0);
    }
  }, []);

  const handleNext = () => {
    const steps: OnboardingStep[] = ["profile", "listing", "complete"];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleComplete = () => {
    localStorage.setItem("onboarding_completed", "true");
    setOpen(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case "profile":
        return <OnboardingProfile onNext={handleNext} />;
      case "listing":
        return <OnboardingListing onNext={handleNext} onSkip={handleNext} />;
      case "complete":
        return <OnboardingComplete onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogTitle className="sr-only">Complete Your Profile</DialogTitle>
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}
