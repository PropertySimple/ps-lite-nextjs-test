
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface ActorPreviewModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Actor index being previewed */
  actorIndex: number | null;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Callback when actor is selected from modal */
  onSelectActor: (index: number) => void;
}

/**
 * Modal component for previewing actor videos
 */
const ActorPreviewModal = ({ 
  isOpen, 
  actorIndex, 
  onClose, 
  onSelectActor 
}: ActorPreviewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Actor {actorIndex !== null ? actorIndex + 1 : ''} Preview
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Video preview would appear here</p>
              <p className="text-xs">Actor {actorIndex !== null ? actorIndex + 1 : ''} demonstration</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {actorIndex !== null && (
              <Button onClick={() => {
                onSelectActor(actorIndex);
                onClose();
              }}>
                Select This Actor
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActorPreviewModal;
