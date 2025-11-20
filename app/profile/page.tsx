"use client";

import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import ProfilePreview from "@/components/profile/ProfilePreview";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Info, Check, Clock } from "lucide-react";
import { logger } from "@/lib/logger";

export default function ProfilePage() {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const handleApprove = () => {
    // TODO: Save profile and mark as approved
    logger.log("Profile approved");
  };

  // Simulate auto-save
  useEffect(() => {
    if (hasChanges) {
      // Set saving status immediately but asynchronously to avoid cascading renders
      const savingTimer = setTimeout(() => setSaveStatus('saving'), 0);
      const saveTimer = setTimeout(() => {
        setLastSaved(new Date());
        setSaveStatus('saved');
        setHasChanges(false);
      }, 1000);
      return () => {
        clearTimeout(savingTimer);
        clearTimeout(saveTimer);
      };
    }
  }, [hasChanges]);

  const headerActions = (
    <div className="flex items-center gap-3">
      {/* Auto-save status */}
      {saveStatus && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {saveStatus === 'saving' ? (
            <>
              <Clock className="w-4 h-4 animate-pulse" />
              <span className="hidden md:inline">Saving...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="hidden md:inline">
                Saved {lastSaved && new Date().getTime() - lastSaved.getTime() < 60000
                  ? `${Math.floor((new Date().getTime() - lastSaved.getTime()) / 1000)}s ago`
                  : 'just now'}
              </span>
            </>
          )}
        </div>
      )}
      <Button onClick={handleApprove} className="gap-2">
        <CheckCircle className="w-4 h-4" />
        <span className="hidden sm:inline">Looks Good</span>
        <span className="sm:hidden">Approve</span>
      </Button>
    </div>
  );

  return (
    <PageLayout headerActions={headerActions}>
      <PageHeader
        title="Your Profile"
        description="This is how you appear on your campaigns. Click any field to edit."
      />

      <Alert className="my-6 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-sm">
          <strong>This is how you appear to leads.</strong> Make sure your profile accurately represents you and your expertise. Changes are saved automatically.
        </AlertDescription>
      </Alert>

      <div className="border-t border-border my-8" />

      <div className="space-y-6">
        <ProfilePreview />
      </div>
    </PageLayout>
  );
}
