"use client";


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Save, X, Sparkles, CheckCircle2, Check, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/Logo";
import PhotoSelector from "@/components/ad-builder/PhotoSelector";
import AdCopyEditor from "@/components/ad-builder/AdCopyEditor";
import ActorScriptEditor from "@/components/ad-builder/ActorScriptEditor";
import MusicSelector from "@/components/ad-builder/MusicSelector";
import { AddListingModal } from "@/components/ad-builder/AddListingModal";
import { ListingCard } from "@/components/ad-builder/ListingCard";
import { useAdBuilder } from "@/hooks/useAdBuilder";
import type { ListingData } from "@/types/adBuilder";
import { campaignData } from "@/data/mockData";

/**
 * AdBuilder page component
 * Main orchestrator for the ad campaign creation and editing process
 *
 * Modes:
 * - Creation: Build new campaign from scratch
 * - Edit: Modify existing AI-generated campaign
 *
 * Steps:
 * 1. Review Ad Copy - Edit AI-generated ad copy
 * 2. Choose Photos - Select up to 9 photos for the campaign
 * 3. Actor & Script - Review and edit AI video script
 * 4. Choose Music - Pick background music for videos
 */
const AdBuilder = () => {
  const router = useRouter();
  const { state, isEditMode, campaignId, actions } = useAdBuilder();
  const [isAddListingModalOpen, setIsAddListingModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<ListingData | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>(null);

  // Auto-save simulation
  useEffect(() => {
    if (state.adCopy || state.selectedPhotos.length > 0) {
      setSaveStatus('saving');
      const timer = setTimeout(() => {
        setLastSaved(new Date());
        setSaveStatus('saved');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.adCopy, state.selectedPhotos, state.selectedActors, state.selectedMusicId]);

  // Get campaign property name for edit mode
  const campaign = isEditMode && campaignId ? campaignData[campaignId as keyof typeof campaignData] : null;
  const propertyName = campaign?.property || "Your Property";

  // Calculate progress
  const totalSteps = 4;
  const completedSteps = [
    state.adCopy ? 1 : 0,
    state.selectedPhotos.length > 0 ? 1 : 0,
    state.selectedActors.length > 0 ? 1 : 0,
    state.selectedMusicId ? 1 : 0
  ].reduce((a, b) => a + b, 0);
  const progressPercentage = (completedSteps / totalSteps) * 100;
  const estimatedMinutes = Math.max(1, (totalSteps - completedSteps) * 2.5);

  const handleEditListing = (listing: ListingData) => {
    setEditingListing(listing);
    setIsAddListingModalOpen(true);
  };

  const handleAddNewListing = () => {
    setEditingListing(null);
    setIsAddListingModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setIsAddListingModalOpen(open);
    if (!open) {
      setEditingListing(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={actions.handleCancel}
                className="shrink-0"
                aria-label={isEditMode ? "Cancel and go back" : "Go back to campaigns"}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Logo />
            </div>

            {/* Auto-save indicator & Action Buttons */}
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

              <Button
                variant="outline"
                onClick={actions.handleCancel}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Cancel</span>
              </Button>
              <Button
                onClick={actions.handleSave}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">{isEditMode ? "Save Changes" : "Create Campaign"}</span>
                <span className="sm:hidden">Save</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          {isEditMode && (
            <Badge variant="outline" className="mb-3 gap-2">
              <Sparkles className="w-3 h-3" />
              AI-Generated Campaign
            </Badge>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {isEditMode ? `Edit Campaign: ${propertyName}` : "Build Your Ad Campaign"}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-4">
            {isEditMode
              ? "Review and customize the AI-generated campaign below. All changes are saved automatically when you click 'Save Changes'."
              : "Follow the steps below to create your ad campaign. AI will help you craft compelling copy and videos."}
          </p>

          {/* Progress Indicator */}
          {!isEditMode && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  Step {completedSteps} of {totalSteps} completed
                </span>
                <span className="text-muted-foreground">
                  ~{Math.ceil(estimatedMinutes)} min remaining
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}
        </div>

        <div className="border-t border-border mb-8" />


        <Accordion
          type="single"
          value={state.openStep}
          onValueChange={actions.setOpenStep}
          className="space-y-4"
        >
          {/* Step 1: Review Ad Copy */}
          <AccordionItem value="step1" className="border rounded-xl bg-card shadow-sm overflow-hidden">
            <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4 w-full">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                  1
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-lg font-semibold">Review Ad Copy</h3>
                  <p className="text-sm text-muted-foreground font-normal">
                    {isEditMode ? "Edit the AI-generated ad copy for your campaign" : "Customize your ad headline and description"}
                  </p>
                </div>
                {state.adCopy && (
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-4 border-t">
              <AdCopyEditor
                adCopy={state.adCopy}
                callToAction={state.callToAction}
                openHouses={state.openHouses}
                onAdCopyChange={actions.updateAdCopy}
                onCallToActionChange={actions.updateCallToAction}
                onOpenHousesChange={actions.updateOpenHouses}
                onContinue={() => actions.setOpenStep("step2")}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Step 2: Choose Photos */}
          <AccordionItem value="step2" className="border rounded-xl bg-card shadow-sm overflow-hidden">
            <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4 w-full">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                  2
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-lg font-semibold">Choose Your Photos</h3>
                  <p className="text-sm text-muted-foreground font-normal">
                    {isEditMode ? "Update which photos appear in your video ads" : "Select up to 9 photos that showcase the property best"}
                  </p>
                </div>
                {state.selectedPhotos.length > 0 && (
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="secondary">{state.selectedPhotos.length} selected</Badge>
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-4 border-t">
              <PhotoSelector
                selectedPhotos={state.selectedPhotos}
                coverPhotoIndex={state.coverPhotoIndex}
                onPhotoSelect={actions.handlePhotoSelect}
                onSetCoverPhoto={actions.setCoverPhoto}
                onContinue={() => actions.setOpenStep("step3")}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Step 3: Pick Actor & Script */}
          <AccordionItem value="step3" className="border rounded-xl bg-card shadow-sm overflow-hidden">
            <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4 w-full">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                  3
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-lg font-semibold">AI Video Actor & Script</h3>
                  <p className="text-sm text-muted-foreground font-normal">
                    {isEditMode ? "Adjust the AI presenter and what they say" : "Choose an AI presenter and customize the video script"}
                  </p>
                </div>
                {state.selectedActors.length > 0 && (
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-4 border-t">
              <ActorScriptEditor
                selectedActors={state.selectedActors}
                script={state.script}
                scriptReviewed={state.scriptReviewed}
                onActorSelect={actions.handleActorSelect}
                onScriptChange={actions.updateScript}
                onScriptReviewChange={actions.updateScriptReviewed}
                onSave={() => actions.setOpenStep("step4")}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Step 4: Choose Your Music */}
          <AccordionItem value="step4" className="border rounded-xl bg-card shadow-sm overflow-hidden">
            <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4 w-full">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                  4
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-lg font-semibold">Choose Background Music</h3>
                  <p className="text-sm text-muted-foreground font-normal">
                    {isEditMode ? "Change the background music for your videos" : "Pick the perfect soundtrack for your video ads"}
                  </p>
                </div>
                {state.selectedMusicId && (
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-4 border-t">
              <MusicSelector
                selectedMusicId={state.selectedMusicId}
                onMusicSelect={actions.updateSelectedMusic}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Add Listing Modal */}
        <AddListingModal
          open={isAddListingModalOpen}
          onOpenChange={handleModalClose}
          onSaveListing={actions.saveListing}
          editingListing={editingListing}
        />
      </main>
    </div>
  );
};

export default AdBuilder;
