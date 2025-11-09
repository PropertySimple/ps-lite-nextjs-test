import React from 'react';
import { BaseModal } from './BaseModal';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export interface FormModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Modal title */
  title: string;
  /** Optional description */
  description?: string;
  /** Form content */
  children: React.ReactNode;
  /** Callback when form is submitted */
  onSubmit: (e?: React.FormEvent) => void;
  /** Submit button text */
  submitText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Whether the form is submitting */
  isSubmitting?: boolean;
  /** Disable submit button */
  disableSubmit?: boolean;
  /** Submit button variant */
  submitVariant?: 'default' | 'destructive' | 'outline';
}

/**
 * FormModal
 *
 * Modal wrapper for forms with built-in submit/cancel handling.
 * Handles form submission and loading states automatically.
 *
 * @example
 * ```tsx
 * <FormModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Edit Contact"
 *   description="Update contact information"
 *   onSubmit={handleSubmit}
 *   isSubmitting={isLoading}
 *   submitText="Save Changes"
 * >
 *   <FormField label="Name">
 *     <Input value={name} onChange={e => setName(e.target.value)} />
 *   </FormField>
 *   <FormField label="Email">
 *     <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
 *   </FormField>
 * </FormModal>
 * ```
 */
export function FormModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  submitText = 'Submit',
  cancelText = 'Cancel',
  isSubmitting = false,
  disableSubmit = false,
  submitVariant = 'default',
}: FormModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
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
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            {cancelText}
          </Button>
          <Button
            type="submit"
            variant={submitVariant}
            onClick={handleSubmit}
            disabled={isSubmitting || disableSubmit}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitText}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {children}
      </form>
    </BaseModal>
  );
}
