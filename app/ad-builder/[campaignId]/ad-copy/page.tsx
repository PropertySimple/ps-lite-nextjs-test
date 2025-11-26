"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import Logo from "@/components/Logo";
import AdCopyEditor from "@/components/ad-builder/AdCopyEditor";
import { OpenHouseEvent } from "@/components/ad-builder/OpenHouseScheduler";
import { campaignData } from "@/data/mockData";

/**
 * Ad Copy Editor Page
 * Allows editing of ad copy text and creative elements
 */
export default function AdCopyEditorPage() {
  const router = useRouter();
  const { campaignId } = useParams();
  const searchParams = useSearchParams();

  // Get ad type from URL parameter (e.g., ?type=openhouse)
  const adType = searchParams.get('type') === 'openhouse' ? 'openhouse' : 'standard';

  // Load campaign data
  const campaign = campaignData[campaignId as keyof typeof campaignData] || campaignData["1"];

  // State for ad copy form
  const [adCopy, setAdCopy] = useState(
    "🏡 Open House This Weekend! 123 Main St, Anytown, USA\n\n" +
    "Join us for an exclusive showing of this stunning property featuring:\n" +
    "✨ 3 spacious bedrooms\n" +
    "✨ 2 modern bathrooms\n" +
    "✨ Beautiful backyard perfect for entertaining\n\n" +
    "Schedule your private tour today! 📱 Call or text"
  );
  const [callToAction, setCallToAction] = useState("Schedule Your Tour");
  const [openHouses, setOpenHouses] = useState<OpenHouseEvent[]>([]);

  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(() => Date.now());

  // Update current time every second for "saved X seconds ago" display
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = async () => {
    setSaveStatus('saving');

    // Simulate API save
    setTimeout(() => {
      setSaveStatus('saved');
      setLastSaved(new Date());

      // Auto-clear saved status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }, 500);
  };

  const handleSaveAndClose = async () => {
    await handleSave();
    // Wait a moment for the save to complete
    setTimeout(() => {
      router.push(`/campaign-detail/${campaignId}`);
    }, 600);
  };

  const handleCancel = () => {
    router.push(`/campaign-detail/${campaignId}`);
  };

  const getTimeSinceLastSave = () => {
    if (!lastSaved) return null;
    const seconds = Math.floor((currentTime - lastSaved.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Logo />
            </div>

            <div className="flex items-center gap-3">
              {saveStatus && (
                <div className="flex items-center gap-2 text-sm">
                  {saveStatus === 'saving' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
                      <span className="text-gray-600">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">
                        Saved {getTimeSinceLastSave()}
                      </span>
                    </>
                  )}
                </div>
              )}

              <Button
                size="sm"
                onClick={handleSaveAndClose}
                disabled={saveStatus === 'saving'}
              >
                Save & Close
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Ad Copy</h1>
          <p className="text-gray-600">
            Review and customize your ad copy and creative elements
          </p>
        </div>

        <AdCopyEditor
          adCopy={adCopy}
          callToAction={callToAction}
          openHouses={openHouses}
          adType={adType}
          onAdCopyChange={setAdCopy}
          onCallToActionChange={setCallToAction}
          onOpenHousesChange={setOpenHouses}
          onContinue={handleSaveAndClose}
        />
      </main>
    </div>
  );
}
