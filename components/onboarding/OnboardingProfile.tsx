"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, ArrowRight } from "lucide-react";

interface OnboardingProfileProps {
  onNext: () => void;
}

export function OnboardingProfile({ onNext }: OnboardingProfileProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [brokerage, setBrokerage] = useState("");

  const isValid = firstName.trim() && lastName.trim() && phone.trim() && brokerage.trim();

  const handleSubmit = () => {
    if (isValid) {
      // TODO: Save profile data
      localStorage.setItem("user_profile", JSON.stringify({
        firstName,
        lastName,
        phone,
        brokerage
      }));
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Phone className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Quick Setup</h2>
        <p className="text-muted-foreground text-sm">
          Great! Your campaign is being created. Let's finish setting up your profile so buyers can reach you.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            This is where interested buyers will call you
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="brokerage">Brokerage Name</Label>
          <Input
            id="brokerage"
            placeholder="ABC Realty"
            value={brokerage}
            onChange={(e) => setBrokerage(e.target.value)}
          />
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-muted" />
        <div className="w-2 h-2 rounded-full bg-muted" />
      </div>

      {/* Action */}
      <Button
        onClick={handleSubmit}
        className="w-full gap-2"
        size="lg"
        disabled={!isValid}
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
