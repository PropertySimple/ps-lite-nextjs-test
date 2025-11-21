'use client';

import { JobsEmailPreview } from "@/components/email/JobsEmailPreview";

export default function JobsEmailPreviewPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">Jobs Email Preview</h1>
          <p className="text-gray-600 mb-4">
            Ultra-minimal, Apple-inspired email design
          </p>
          <a
            href="/launch/demo"
            className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            View Landing Page →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <JobsEmailPreview
            agentName="Sarah"
            propertyAddress="345 Rim Shadows Dr"
            propertyCity="Sedona"
            campaignId="demo"
          />
        </div>
      </div>
    </div>
  );
}
