"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getAvatarColor } from "@/lib/utils/getAvatarColor";
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
import { ChevronDown, Sparkles, Lightbulb, Trash2 } from "lucide-react";
import { ChannelBadge } from "./ChannelBadge";
import { AIDecisionBadge } from "./AIDecisionBadge";
import { useState } from "react";

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
  recentMessagesPreview: _recentMessagesPreview,
  suggestedAction,
  aiSuggestedReply: _aiSuggestedReply,
  aiDecision,
  onViewFull,
  onTakeAction: _onTakeAction,
  onDismiss,
  onSendSMS: _onSendSMS,
  onSendEmail: _onSendEmail,
  onCall: _onCall,
}: InboxCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDismissConfirm, setShowDismissConfirm] = useState(false);
  
  const initials = contactName
    .split(" ")
    .map((n) => n[0])
    .join("");

  const avatarColor = getAvatarColor(contactName);

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
                <AvatarFallback className="text-base text-white" style={{ backgroundColor: avatarColor }}>
                  {initials}
                </AvatarFallback>
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

                {/* AI Decision or Suggested Action Preview - Collapsed State */}
                {!isOpen && (
                  <div className="flex flex-col gap-1.5 mt-2">
                    {aiDecision && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Sparkles className="h-3 w-3 shrink-0" />
                        <span className="font-medium truncate">AI: {aiDecision.reason}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400">
                      <Lightbulb className="h-3 w-3 shrink-0" />
                      <span className="font-medium truncate">Next: {suggestedAction.title}</span>
                    </div>
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

            {/* Actions - Simplified to View & Reply only */}
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
                onClick={handleDismissClick}
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-destructive"
                aria-label="Dismiss this item"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Dismiss</span>
              </Button>
            </div>
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
