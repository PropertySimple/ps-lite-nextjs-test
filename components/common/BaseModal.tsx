import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export interface BaseModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Modal title */
  title: string;
  /** Optional description */
  description?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Footer content (defaults to close button) */
  footer?: React.ReactNode;
  /** Show close button in footer */
  showCloseButton?: boolean;
  /** Close button text */
  closeButtonText?: string;
  /** Optional max width class */
  maxWidth?: string;
}

/**
 * BaseModal
 *
 * Standard modal wrapper with consistent styling and structure.
 * Use this as a base for all custom modals.
 *
 * @example
 * ```tsx
 * <BaseModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Delete Contact"
 *   description="Are you sure you want to delete this contact?"
 * >
 *   <p>This action cannot be undone.</p>
 * </BaseModal>
 * ```
 */
export function BaseModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  closeButtonText = 'Close',
  maxWidth = 'sm:max-w-[500px]',
}: BaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={maxWidth}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="space-y-4">{children}</div>

        {(footer || showCloseButton) && (
          <DialogFooter>
            {footer || (
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {closeButtonText}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

/**
 * ConfirmationModal
 *
 * Pre-configured modal for confirmation dialogs.
 *
 * @example
 * ```tsx
 * <ConfirmationModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Delete Campaign"
 *   description="Are you sure? This action cannot be undone."
 *   onConfirm={handleDelete}
 *   confirmText="Delete"
 *   confirmVariant="destructive"
 *   isLoading={isDeleting}
 * />
 * ```
 */
export interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'default' | 'destructive' | 'outline';
  isLoading?: boolean;
}

export function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'default',
  isLoading = false,
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      showCloseButton={false}
      footer={
        <div className="flex gap-2 justify-end w-full">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </Button>
        </div>
      }
    >
      {children}
    </BaseModal>
  );
}
