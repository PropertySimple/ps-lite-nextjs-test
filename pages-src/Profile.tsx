"use client";

import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import ProfilePreview from "@/components/profile/ProfilePreview";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { logger } from "@/lib/logger";

const Profile = () => {
  const handleApprove = () => {
    // TODO: Save profile and mark as approved
    logger.log("Profile approved");
  };

  const headerActions = (
    <Button onClick={handleApprove} className="gap-2">
      <CheckCircle className="w-4 h-4" />
      <span className="hidden sm:inline">Looks Good</span>
      <span className="sm:hidden">Approve</span>
    </Button>
  );

  return (
    <PageLayout headerActions={headerActions}>
      <PageHeader
        title="Your Profile"
        description="This is how you appear to leads and on your campaigns. Click any field to edit. Sarah auto-filled this using your brokerage and listing history."
      />

      <div className="border-t border-border my-8" />

      <div className="space-y-6">
        <ProfilePreview />
      </div>
    </PageLayout>
  );
};

export default Profile;