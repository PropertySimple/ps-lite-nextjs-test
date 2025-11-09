"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Copy, MessageSquare, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const AIPhoneNumber = () => {
  const { toast } = useToast();
  const phoneNumber = "+1 (555) 123-4567";
  const [aiName, setAiName] = useState("Alex");
  const [handleCalls, setHandleCalls] = useState(true);
  const [handleTexts, setHandleTexts] = useState(true);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumber);
    toast({
      title: "Copied!",
      description: "Phone number copied to clipboard",
    });
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Your AI Phone Number
        </CardTitle>
        <CardDescription>
          Put this number everywhere—on your website, business cards, and marketing. Your AI handles all calls and texts, filters spam, and qualifies leads. You only get contacted when they're ready to talk.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Phone Number Display */}
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold text-primary">{phoneNumber}</div>
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>

        <Separator />

        {/* Configuration Options */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ai-name" className="flex items-center gap-2 text-base font-medium">
              <Bot className="h-4 w-4" />
              AI Assistant Name
            </Label>
            <Input
              id="ai-name"
              value={aiName}
              onChange={(e) => setAiName(e.target.value)}
              placeholder="Enter AI assistant name"
              className="max-w-xs"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center gap-2 text-base font-medium">
                  <Phone className="h-4 w-4" />
                  AI Answers Calls
                </Label>
                <p className="text-sm text-muted-foreground">
                  When off, calls will be forwarded to you
                </p>
              </div>
              <Switch
                checked={handleCalls}
                onCheckedChange={setHandleCalls}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center gap-2 text-base font-medium">
                  <MessageSquare className="h-4 w-4" />
                  AI Answers Texts
                </Label>
                <p className="text-sm text-muted-foreground">
                  When off, you'll handle texts manually
                </p>
              </div>
              <Switch
                checked={handleTexts}
                onCheckedChange={setHandleTexts}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
