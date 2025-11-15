"use client";


import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import { AIPhoneNumber } from "@/components/concierge/AIPhoneNumber";
import { QualifyingQuestions } from "@/components/concierge/QualifyingQuestions";
import { CustomInstructions } from "@/components/concierge/CustomInstructions";
import { TemplateSelector } from "@/components/concierge/TemplateSelector";
import { AIPreview } from "@/components/concierge/AIPreview";
import { useToast } from "@/hooks/use-toast";

const AIAutomation = () => {
  const { toast } = useToast();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleApplyTemplate = (template: any) => {
    toast({
      title: "Template Applied",
      description: `${template.name} template has been applied. Qualifying questions and instructions have been updated.`,
    });
    // In a real app, this would update the QualifyingQuestions and CustomInstructions components
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="AI Concierge Configuration"
          description="Configure your AI assistant to automatically handle calls and texts, qualify leads, and route them to you when they're ready"
        />
        <AIPreview />
      </div>

      <div className="space-y-6">
        {/* Template Selector */}
        <TemplateSelector onApplyTemplate={handleApplyTemplate} />

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