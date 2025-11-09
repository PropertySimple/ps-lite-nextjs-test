"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, RefreshCw, Send, Pencil, X } from "lucide-react";

interface AISuggestedNextStepsProps {
  contactName: string;
  onSendText: (message: string) => void;
  onSendEmail: (subject: string, body: string) => void;
  onCall: () => void;
  onSkip: () => void;
}

const AISuggestedNextSteps = ({ contactName, onSendText, onSendEmail, onCall, onSkip }: AISuggestedNextStepsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [suggestedText, setSuggestedText] = useState(
    `Hi ${contactName}! I saw you're interested in 116 DELLWOOD Avenue. Great timing - the home is in a family-friendly neighborhood with excellent schools nearby. Would you like to schedule a viewing this week? I have openings on Thursday at 4pm or Saturday morning.`
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newText = `Hello ${contactName}, I wanted to follow up on your interest in the property. The location offers excellent value with nearby amenities. Are you available for a quick call to discuss next steps?`;
      setSuggestedText(newText);
      setIsGenerating(false);
    }, 1000);
  };

  const handleSend = () => {
    if (suggestedText.trim()) {
      onSendText(suggestedText);
      setSuggestedText("");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <div className="space-y-3 rounded-lg border border-muted p-4">
        <Textarea
          value={suggestedText}
          onChange={(e) => setSuggestedText(e.target.value)}
          rows={4}
          className="text-sm"
          placeholder="Type your message..."
          autoFocus
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!suggestedText.trim()}
            className="flex-1"
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border border-purple-200 bg-purple-50/30 dark:border-purple-800 dark:bg-purple-950/20 p-4">
      <div className="flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
        <div className="flex-1">
          <div className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-2">
            Sarah suggests
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {suggestedText}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={handleSend}
          className="flex-1 min-w-[100px]"
        >
          <Send className="w-4 h-4 mr-2" />
          Send
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleEdit}
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleRegenerate}
          disabled={isGenerating}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
          Regenerate
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onSkip}
        >
          <X className="w-4 h-4 mr-2" />
          Skip
        </Button>
      </div>
    </div>
  );
};

export default AISuggestedNextSteps;
