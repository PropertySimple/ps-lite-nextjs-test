"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CreditCard, CheckCircle2, AlertTriangle } from "lucide-react";

/**
 * SubscriptionModal component
 * Shows subscription status indicator and manages subscription info/unsubscribe modals
 */
const SubscriptionModal = () => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);

  const handleUnsubscribeClick = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirmUnsubscribe = () => {
    setIsSubscribed(false);
    setConfirmModalOpen(false);
    setInfoModalOpen(false);
  };

  if (!isSubscribed) {
    return null;
  }

  return (
    <>
      {/* Subscription Badge - clickable indicator */}
      <Badge
        variant="outline"
        className="cursor-pointer hover:bg-accent transition-colors flex items-center gap-1.5 px-3 py-1.5"
        role="button"
        tabIndex={0}
        onClick={() => setInfoModalOpen(true)}
        onKeyDown={(e) => e.key === 'Enter' && setInfoModalOpen(true)}
      >
        <CreditCard className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Subscribe & Save</span>
      </Badge>

      {/* Subscription Info Modal */}
      <Dialog open={infoModalOpen} onOpenChange={setInfoModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <DialogTitle>Subscribe & Save Active</DialogTitle>
            </div>
            <DialogDescription className="text-left space-y-4 pt-2">
              <span className="block">
                You're enrolled in Subscribe & Save! Ads are created automatically
                for your listings, and you save 20% on every campaign.
              </span>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="font-medium text-foreground">What's included:</p>
                <ul className="text-sm space-y-1.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span><strong>20% off all listing ads</strong> — Built-in discount on every campaign</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span><strong>Automatic ads</strong> — Ads run on new listings, price reductions, and open house events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span><strong>24-hour skip window</strong> — Review and skip any ad before it goes live</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span><strong>48-hour refund period</strong> — Full refund available after ads launch</span>
                  </li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive"
              onClick={handleUnsubscribeClick}
            >
              Unsubscribe
            </Button>
            <Button onClick={() => setInfoModalOpen(false)}>
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Unsubscribe Confirmation Modal */}
      <AlertDialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-left space-y-3">
              <span className="block">
                If you unsubscribe from Subscribe & Save, you'll lose access to:
              </span>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>20% discount on all listing ads</li>
                <li>Automatic ad creation for your listings</li>
                <li>24-hour preview and skip window</li>
              </ul>
              <span className="block text-sm">
                You can re-enroll in Subscribe & Save at any time.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmUnsubscribe}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Unsubscribe
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SubscriptionModal;
