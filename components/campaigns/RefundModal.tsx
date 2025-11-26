'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

export interface RefundModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignTitle: string;
  onConfirmRefund: () => void;
  onSuccess?: () => void;
  isLoading?: boolean;
}

export function RefundModal({
  open,
  onOpenChange,
  campaignTitle,
  onConfirmRefund,
  onSuccess,
  isLoading = false,
}: RefundModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset success state when modal closes
  useEffect(() => {
    if (!open) {
      setShowSuccess(false);
    }
  }, [open]);

  const handleConfirm = () => {
    onConfirmRefund();
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    onOpenChange(false);
    onSuccess?.();
  };

  // Success state - user must click OK to close
  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent
          className="sm:max-w-[400px] [&>button]:hidden"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Refund Submitted
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Your ad has been canceled and your refund has been submitted.
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              Refunds typically take <span className="font-semibold text-foreground">5-10 business days</span> to
              reach your account, depending on your bank.
            </p>
          </div>

          <DialogFooter>
            <Button onClick={handleSuccessClose} className="w-full sm:w-auto">
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Confirmation state
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Request Refund
          </DialogTitle>
          <DialogDescription>
            Review the refund policy for &ldquo;{campaignTitle}&rdquo;
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              Refunds are available within <span className="font-semibold text-foreground">48 hours</span> of purchase.
              After 48 hours, ads are non-refundable.
            </p>

            <div className="rounded-lg bg-muted/50 p-3 space-y-2">
              <p className="font-medium text-foreground">If you proceed:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Your active ad will be <span className="text-foreground">immediately canceled</span></li>
                <li>Your card will be refunded</li>
                <li>This action is <span className="font-semibold text-destructive">non-reversible</span></li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-2 justify-end w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Keep Ad
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Cancel Ad & Refund
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
