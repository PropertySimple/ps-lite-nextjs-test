"use client";


import { Button } from "@/components/ui/button";
import { useState } from "react";
import ActorGrid from "./ActorGrid";
import ScriptEditor from "./ScriptEditor";
import ActorPreviewModal from "./ActorPreviewModal";

interface ActorScriptEditorProps {
  /** Index of selected actor (only one can be selected) */
  selectedActors: number[];
  /** Current script content */
  script: string;
  /** Whether script has been reviewed */
  scriptReviewed: boolean;
  /** Callback when an actor is selected/deselected */
  onActorSelect: (index: number) => void;
  /** Callback when script content changes */
  onScriptChange: (script: string) => void;
  /** Callback when script review status changes */
  onScriptReviewChange: (reviewed: boolean) => void;
  /** Callback to save the campaign */
  onSave: () => void;
}

/**
 * ActorScriptEditor component for Step 3 of the Ad Builder
 * Allows users to select actors and edit the script for video ads
 */
const ActorScriptEditor = ({
  selectedActors,
  script,
  scriptReviewed,
  onActorSelect,
  onScriptChange,
  onScriptReviewChange,
  onSave
}: ActorScriptEditorProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewActorIndex, setPreviewActorIndex] = useState<number | null>(null);

  /**
   * Handles opening the preview modal for a specific actor
   */
  const handlePreviewActor = (index: number) => {
    setPreviewActorIndex(index);
    setPreviewOpen(true);
  };

  /**
   * Handles closing the preview modal
   */
  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  /**
   * Handles selecting an actor from the preview modal
   */
  const handleSelectFromPreview = (index: number) => {
    onActorSelect(index);
  };

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Choose your AI presenter.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Actor Selection */}
        <ActorGrid 
          selectedActors={selectedActors}
          onActorSelect={onActorSelect}
          onActorPreview={handlePreviewActor}
        />

        {/* Right side - Script Editor */}
        <ScriptEditor
          script={script}
          scriptReviewed={scriptReviewed}
          onScriptChange={onScriptChange}
          onScriptReviewChange={onScriptReviewChange}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={onSave} disabled={!scriptReviewed || selectedActors.length === 0}>
          Save Campaign
        </Button>
      </div>

      {/* Actor Preview Modal */}
      <ActorPreviewModal
        isOpen={previewOpen}
        actorIndex={previewActorIndex}
        onClose={handleClosePreview}
        onSelectActor={handleSelectFromPreview}
      />
    </div>
  );
};

export default ActorScriptEditor;
