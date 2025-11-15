"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "ai" | "contact";
  content: string;
  timestamp?: string;
}

const sampleConversation: Message[] = [
  {
    role: "contact",
    content: "Hi, I'm interested in the 3BR home at 116 Dellwood Avenue"
  },
  {
    role: "ai",
    content: "Hello! Thank you for your interest in 116 Dellwood Avenue. I'm Sarah, the AI assistant for this listing. I'd be happy to help you learn more about this property. To start, are you currently working with a real estate agent, or would you like me to connect you with the listing agent?"
  },
  {
    role: "contact",
    content: "No agent yet, just exploring options"
  },
  {
    role: "ai",
    content: "Perfect! I can help with that. Let me ask a few quick questions to better assist you:\n\n1. Are you pre-approved for a mortgage?\n2. What's your budget range?\n3. How soon are you looking to move?"
  },
  {
    role: "contact",
    content: "Yes, pre-approved up to $500k. Looking to move in the next 2-3 months"
  },
  {
    role: "ai",
    content: "Excellent! You're in a great position. This property is listed at $475,000, which fits your budget perfectly. With your timeline of 2-3 months, you'd have time for inspections and closing.\n\nWould you like me to schedule a showing with the listing agent? I can also send you the complete property details, recent photos, and neighborhood information."
  }
];

export const AIPreview = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MessageSquare className="w-4 h-4" />
          Test AI Conversation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>AI Conversation Preview</DialogTitle>
          <DialogDescription>
            See how your AI assistant will interact with leads based on your current settings
          </DialogDescription>
        </DialogHeader>

        <Card className="border-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-sm">AI Conversation Simulator</CardTitle>
                <CardDescription className="text-xs">
                  Example conversation using your qualifying questions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {sampleConversation.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "ai" ? "justify-start" : "justify-end"
                    }`}
                  >
                    {message.role === "ai" && (
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "ai"
                          ? "bg-muted text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>

                    {message.role === "contact" && (
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-blue-500 text-white">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-muted-foreground">
                💡 <strong>Tip:</strong> The AI uses your qualifying questions and custom instructions to have natural conversations.
                It will automatically escalate qualified leads to you when they're ready.
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
