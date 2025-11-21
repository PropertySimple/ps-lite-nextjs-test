'use client';

import { AdReadyEmailPreview } from '@/components/email/AdReadyEmailPreview';

export default function EmailPreviewPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">Email Preview: Ad Ready</h1>
          <p className="text-gray-600 mb-4">
            This is how the email will look when sent to agents
          </p>
          <div className="flex gap-4">
            <a
              href="/ad-preview/demo-campaign-123"
              className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              View Landing Page →
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Preview version without email wrapper tags */}
          <AdReadyEmailPreview
            agentName="Sarah Johnson"
            propertyAddress="345 Rim Shadows Dr, Sedona, AZ 86336"
            campaignId="demo-campaign-123"
            expiresInHours={24}
          />
        </div>
      </div>
    </div>
  );
}
