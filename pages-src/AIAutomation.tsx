"use client";

import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import { AIPhoneNumber } from "@/components/concierge/AIPhoneNumber";
import { QualifyingQuestions } from "@/components/concierge/QualifyingQuestions";
import { CustomInstructions } from "@/components/concierge/CustomInstructions";

const AIAutomation = () => {
  return (
    <PageLayout>
      <PageHeader
        title="AI Concierge Configuration"
        description="Configure your AI assistant to automatically handle calls and texts, qualify leads, and route them to you when they're ready"
      />
      
      <div className="space-y-6">
        {/* AI Phone Number */}
        <AIPhoneNumber />

        {/* Qualifying Questions */}
        <QualifyingQuestions />

        {/* Custom Instructions */}
        <CustomInstructions />
      </div>
    </PageLayout>
  );
};

export default AIAutomation;