"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResponsiveCommunicationDrawer } from '@/components/ui/responsive-communication-drawer';
import { Sparkles, Send } from 'lucide-react';

export type CommunicationType = 'sms' | 'email';

export interface CommunicationComposerProps {
  /** Whether the drawer/dialog is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Type of communication (sms or email) */
  type: CommunicationType;
  /** Recipient name for display */
  recipientName: string;
  /** Callback when send is clicked */
  onSend: (data: { subject?: string; content: string }) => void;
  /** Callback for AI generation (optional) */
  onAiGenerate?: () => void;
  /** Whether AI is currently generating */
  isGenerating?: boolean;
  /** Initial subject (for email) */
  initialSubject?: string;
  /** Initial content */
  initialContent?: string;
  /** Show AI suggestion button */
  showAiButton?: boolean;
}

/**
 * CommunicationComposer
 *
 * Unified component for SMS and Email composition.
 * Eliminates duplication across ContactDetail, ConversationView, etc.
 *
 * @example
 * ```tsx
 * <CommunicationComposer
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   type="sms"
 *   recipientName="John Doe"
 *   onSend={handleSendMessage}
 *   onAiGenerate={handleGenerateWithAi}
 *   isGenerating={isLoading}
 * />
 * ```
 */
export function CommunicationComposer({
  open,
  onOpenChange,
  type,
  recipientName,
  onSend,
  onAiGenerate,
  isGenerating = false,
  initialSubject = '',
  initialContent = '',
  showAiButton = true,
}: CommunicationComposerProps) {
  const [subject, setSubject] = useState(initialSubject);
  const [content, setContent] = useState(initialContent);

  const handleSend = () => {
    if (!content.trim() && !subject.trim()) return;

    onSend({
      ...(type === 'email' && { subject }),
      content,
    });

    // Clear form
    setSubject('');
    setContent('');
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const title = type === 'sms'
    ? `Send Text Message to ${recipientName}`
    : `Send Email to ${recipientName}`;

  return (
    <ResponsiveCommunicationDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={title}
    >
      <div className="space-y-4">
        {/* Email Subject Field */}
        {type === 'email' && (
          <div className="space-y-2">
            <Label htmlFor="email-subject">Subject</Label>
            <Input
              id="email-subject"
              placeholder="Email subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        )}

        {/* Message Content */}
        <div className="space-y-2">
          <Label htmlFor={`${type}-message`}>
            {type === 'sms' ? 'Message' : 'Message Body'}
          </Label>
          <Textarea
            id={`${type}-message`}
            placeholder={
              type === 'sms'
                ? 'Type your message...'
                : 'Type your email message...'
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        {/* AI Generation Button */}
        {showAiButton && onAiGenerate && (
          <Button
            variant="outline"
            onClick={onAiGenerate}
            disabled={isGenerating}
            className="w-full gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Help write with AI'}
          </Button>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={!content.trim()}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            Send {type === 'sms' ? 'Text' : 'Email'}
          </Button>
        </div>
      </div>
    </ResponsiveCommunicationDrawer>
  );
}
