"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Check } from "lucide-react";
import Logo from "@/components/Logo";
import PhotoSelector from "@/components/ad-builder/PhotoSelector";
import MusicSelector from "@/components/ad-builder/MusicSelector";
import AgentInfoSection from "@/components/ad-builder/AgentInfoSection";
import { campaignData } from "@/data/mockData";

/**
 * Basic Video Editor Page
 * Allows editing of photos and background music for the basic video
 */
export default function BasicVideoEditorPage() {
  const router = useRouter();
  const { campaignId } = useParams();

  // Load campaign data
  const campaign = campaignData[campaignId as keyof typeof campaignData] || campaignData["1"];

  // State for basic video form
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([0, 1, 2]);
  const [coverPhotoIndex, setCoverPhotoIndex] = useState<number | null>(0);
  const [selectedMusicId, setSelectedMusicId] = useState<string>("upbeat-1");
  const [phoneNumber, setPhoneNumber] = useState("(555) 123-4567");
  const [headshotUrl, setHeadshotUrl] = useState("/lovable-uploads/77fc09a9-0935-441f-8a01-7084396253a9.png");

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

  const handlePhotoSelect = (photoIndex: number) => {
    if (selectedPhotos.includes(photoIndex)) {
      // Deselect
      setSelectedPhotos(prev => prev.filter(i => i !== photoIndex));
      if (coverPhotoIndex === photoIndex) {
        setCoverPhotoIndex(null);
      }
    } else {
      // Select (max 9)
      if (selectedPhotos.length < 9) {
        setSelectedPhotos(prev => [...prev, photoIndex]);
      }
    }
  };

  const handleSetCoverPhoto = (photoIndex: number) => {
    if (selectedPhotos.includes(photoIndex)) {
      setCoverPhotoIndex(photoIndex);
    }
  };

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
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Basic Video</h1>
          <p className="text-gray-600">
            Select photos and background music for your basic video
          </p>
        </div>

        <div className="space-y-8">
          {/* Photo Selection */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Choose Photos</h2>
            <PhotoSelector
              selectedPhotos={selectedPhotos}
              coverPhotoIndex={coverPhotoIndex}
              onPhotoSelect={handlePhotoSelect}
              onSetCoverPhoto={handleSetCoverPhoto}
            />
          </section>

          {/* Music Selection */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Choose Background Music</h2>
            <MusicSelector
              selectedMusicId={selectedMusicId}
              onMusicSelect={setSelectedMusicId}
            />
          </section>

          {/* Agent Information */}
          <section>
            <AgentInfoSection
              phoneNumber={phoneNumber}
              headshotUrl={headshotUrl}
              onPhoneNumberChange={setPhoneNumber}
              onHeadshotUrlChange={setHeadshotUrl}
            />
          </section>

          {/* Save Button */}
          <section className="pt-4">
            <Button
              size="lg"
              onClick={handleSaveAndClose}
              disabled={saveStatus === 'saving'}
              className="w-full sm:w-auto"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
}
