"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ResponsiveCommunicationDrawer } from "@/components/ui/responsive-communication-drawer";
import { Phone } from "lucide-react";

interface CallRecordingConsentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactName: string;
  onStartCall: (recordCall: boolean) => void;
}

export function CallRecordingConsent({
  open,
  onOpenChange,
  contactName,
  onStartCall,
}: CallRecordingConsentProps) {
  const [recordCall, setRecordCall] = useState(false);

  const handleStartCall = () => {
    onStartCall(recordCall);
    onOpenChange(false);
    // Reset state for next time
    setRecordCall(false);
  };

  return (
    <ResponsiveCommunicationDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={`Call ${contactName}`}
      description="If recorded, the transcript will be ready within minutes after your call ends."
    >
      <div className="space-y-6">
        {/* Call Recording Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="record-call"
              checked={recordCall}
              onCheckedChange={(checked) => setRecordCall(checked as boolean)}
            />
            <Label htmlFor="record-call" className="text-sm font-medium">
              Record this call and save my transcript
            </Label>
          </div>
          
          <p className="text-xs text-muted-foreground ml-6">
            By recording this call you agree to the{" "}
            <Link
              href="/terms"
              className="underline hover:text-foreground transition-colors"
            >
              terms and conditions
            </Link>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleStartCall}
            className="flex-1 gap-2"
          >
            <Phone className="w-4 h-4" />
            Start Call
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </ResponsiveCommunicationDrawer>
  );
}