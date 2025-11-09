"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronDown, Sparkles, Lightbulb, MessageSquare, Mail, Phone, Send, X, Trash2 } from "lucide-react";
import { ChannelBadge } from "./ChannelBadge";
import { AIDecisionBadge } from "./AIDecisionBadge";
import { useState } from "react";
import { toast } from "sonner";

interface RecentMessage {
  timestamp: string;
  from: "agent" | "contact" | "ai";
  message: string;
}

interface SuggestedAction {
  title: string;
  description: string;
  actionType: "call" | "reply" | "schedule" | "review";
}

interface InboxCardProps {
  id: number;
  channel: "phone" | "sms" | "email";
  contactName: string;
  timestamp: string;
  previewSnippet: string;
  aiSummary: string;
  recentMessagesPreview: RecentMessage[];
  suggestedAction: SuggestedAction;
  aiSuggestedReply?: string;
  aiDecision?: {
    type: "escalated" | "unsubscribed" | "responded";
    reason: string;
  };
  onViewFull: (id: number) => void;
  onTakeAction: (id: number) => void;
  onDismiss: (id: number) => void;
  onSendSMS: (id: number) => void;
  onSendEmail: (id: number) => void;
  onCall: (id: number) => void;
}

export const InboxCard = ({
  id,
  channel,
  contactName,
  timestamp,
  previewSnippet,
  aiSummary,
  recentMessagesPreview,
  suggestedAction,
  aiSuggestedReply,
  aiDecision,
  onViewFull,
  onTakeAction,
  onDismiss,
  onSendSMS,
  onSendEmail,
  onCall,
}: InboxCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState<"sms" | "email" | null>(null);
  const [smsMessage, setSmsMessage] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [showDismissConfirm, setShowDismissConfirm] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(true);
  
  const initials = contactName
    .split(" ")
    .map((n) => n[0])
    .join("");

  const handleStartSMS = () => {
    setEditMode("sms");
    setSmsMessage(aiSuggestedReply || "");
    setShowActionButtons(false);
  };

  const handleStartEmail = () => {
    setEditMode("email");
    setEmailSubject(`RE: ${previewSnippet.substring(0, 50)}`);
    setEmailMessage(aiSuggestedReply || "");
    setShowActionButtons(false);
  };

  const handleSendSMS = () => {
    toast("SMS Sent", {
      description: `Your message to ${contactName} has been sent.`
    });
    setEditMode(null);
    onSendSMS(id);
  };

  const handleSendEmail = () => {
    toast("Email Sent", {
      description: `Your email to ${contactName} has been sent.`
    });
    setEditMode(null);
    onSendEmail(id);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setShowActionButtons(false);
    setSmsMessage("");
    setEmailSubject("");
    setEmailMessage("");
  };

  const handleDismissClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDismissConfirm(true);
  };

  const handleConfirmDismiss = () => {
    onDismiss(id);
    setShowDismissConfirm(false);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="hover:bg-muted/20 transition-colors border-l-4 border-l-blue-500">
        <CollapsibleTrigger className="w-full text-left">
          <CardContent className="p-5 lg:p-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <Avatar className="h-11 w-11 shrink-0">
                <AvatarFallback className="text-base">{initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                {/* Top line: Name + Badge + Time */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="font-bold text-lg">{contactName}</span>
                  <ChannelBadge channel={channel} />
                  <span className="text-sm text-muted-foreground">• {timestamp}</span>
                </div>

                {/* Preview snippet */}
                <p className="text-sm text-muted-foreground truncate leading-relaxed">
                  "{previewSnippet}"
                </p>

                {/* Suggested Action Preview - Collapsed State */}
                {!isOpen && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-blue-600 dark:text-blue-400">
                    <Lightbulb className="h-3 w-3 shrink-0" />
                    <span className="font-medium truncate">Next: {suggestedAction.title}</span>
                  </div>
                )}
              </div>

              {/* Chevron */}
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </CardContent>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-5 lg:px-6 pb-5 lg:pb-6 space-y-5">
            {/* AI Summary - subtle */}
            <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
              <div className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                    AI Summary
                  </p>
                  <p className="text-sm leading-relaxed">{aiSummary}</p>
                </div>
              </div>
            </div>

            {/* AI Decision Badge */}
            {aiDecision && <AIDecisionBadge decision={aiDecision} />}

            {/* Suggested Action - highlighted but subtle */}
            <div className="bg-success/10 border border-success/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-success mb-2 uppercase tracking-wide">
                    Suggested Next Action
                  </p>
                  <p className="font-medium text-sm mb-2">{suggestedAction.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {suggestedAction.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Inline SMS Editor */}
            {editMode === "sms" && (
              <div className="space-y-3 bg-muted/20 rounded-lg p-4 border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">Send SMS to {contactName}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Separator />
                <div>
                  <Textarea
                    value={smsMessage}
                    onChange={(e) => setSmsMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="min-h-[120px] resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {smsMessage.length} characters
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSendSMS}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send SMS
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Inline Email Editor */}
            {editMode === "email" && (
              <div className="space-y-3 bg-muted/20 rounded-lg p-4 border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">Send Email to {contactName}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Separator />
                <div>
                  <Label htmlFor={`subject-${id}`} className="text-xs font-medium">
                    Subject
                  </Label>
                  <Input
                    id={`subject-${id}`}
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Email subject..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`message-${id}`} className="text-xs font-medium">
                    Message
                  </Label>
                  <Textarea
                    id={`message-${id}`}
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="min-h-[150px] resize-none mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSendEmail}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Email
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Actions */}
            {!editMode && (
              <div className="flex items-center gap-2 pt-3 border-t mt-3">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewFull(id);
                  }}
                  variant="default"
                  size="sm"
                  className="flex-1"
                >
                  View & Reply
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCall(id);
                  }}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Phone className="h-4 w-4" />
                  <span className="hidden sm:inline">Call</span>
                </Button>
                <Button
                  onClick={handleDismissClick}
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Dismiss</span>
                </Button>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Card>

      <AlertDialog open={showDismissConfirm} onOpenChange={setShowDismissConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dismiss this item?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this item from your inbox. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDismiss}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Dismiss
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Collapsible>
  );
};
