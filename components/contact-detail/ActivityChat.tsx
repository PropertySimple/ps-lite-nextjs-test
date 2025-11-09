"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActivityChatProps {
  activityType: string;
  activityTitle: string;
  activityDescription: string;
}

interface ChatMessage {
  id: string;
  role: "ai" | "user";
  content: string;
  timestamp: string;
}

const ActivityChat = ({ activityType, activityTitle, activityDescription }: ActivityChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "ai",
      content: getInitialAIMessage(activityType, activityTitle, activityDescription),
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");

  function getInitialAIMessage(type: string, title: string, description: string): string {
    switch (type) {
      case "form_submission":
        return `I see your contact submitted a form: "${title}". This shows strong interest! ${description}. 

**Recommended next steps:**
• Send a personalized follow-up email within 24 hours
• Schedule a discovery call to understand their needs
• Provide additional property information they requested

Would you like me to help you draft a follow-up email or schedule a call?`;

      case "ai_conversation":
        return `Your contact had an AI conversation: "${title}". ${description}. This indicates they're actively researching and engaging with your content.

**Recommended next steps:**
• Review the conversation transcript for insights
• Follow up on any questions that weren't fully answered
• Offer a personal consultation to build rapport

Would you like me to analyze the conversation for key insights or help you craft a personal follow-up message?`;

      case "property_view":
        return `Your contact viewed property details: "${title}". ${description}. This shows genuine interest in this specific property.

**Recommended next steps:**
• Send additional property photos or virtual tour
• Share neighborhood information and amenities
• Offer to schedule a showing
• Provide comparative market analysis

Would you like me to help you prepare property-specific materials or schedule a showing?`;

      case "email_sent":
        return `Your contact opened an email: "${title}". ${description}. Email engagement is a positive sign of continued interest.

**Recommended next steps:**
• Send a follow-up email with related content
• Track which links they clicked for insights
• Segment them for targeted future campaigns

Would you like me to help you create a follow-up email sequence or analyze their engagement patterns?`;

      default:
        return `I noticed this activity: "${title}". ${description}. This gives us valuable insight into your contact's behavior and interests.

**Recommended next steps:**
• Analyze the activity for engagement patterns
• Create targeted follow-up content
• Consider reaching out with relevant information

How would you like to follow up on this activity?`;
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "I'd be happy to help you with that! Let me provide some specific guidance based on your contact's activity and your goals.",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <ScrollArea className="flex-1 p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "ai" && (
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
            
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground ml-12"
                  : "bg-muted"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className={`text-xs mt-1 opacity-70 ${
                message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}>
                {message.timestamp}
              </p>
            </div>
            
            {message.role === "user" && (
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </ScrollArea>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask for help with this contact..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon" aria-label="Send message">
            <Send className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityChat;