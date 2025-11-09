"use client";

import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
import { MessageSquare, Mail, Clock, ChevronDown, Edit2, CheckCircle2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ScheduledMessage = {
  id: number;
  to: string;
  messageType: "email" | "sms";
  subject?: string;
  message: string;
  scheduledFor: string;
};

type SentMessage = {
  id: number;
  to: string;
  messageType: "email" | "sms";
  subject?: string;
  message: string;
  sentAt: string;
};

// Mock data for scheduled messages
const scheduledMessages: ScheduledMessage[] = [
  {
    id: 1,
    to: "David Martinez",
    messageType: "sms",
    message: "Hi David! Just checking in - have you had a chance to review the property information I sent over? Let me know if you'd like to schedule a viewing. 🏡",
    scheduledFor: "Today at 3:00 PM"
  },
  {
    id: 2,
    to: "Emma Wilson",
    messageType: "email",
    subject: "Follow-up: Property Viewing Tomorrow",
    message: "Hi Emma,\n\nThis is a friendly reminder about your property viewing tomorrow at 3pm for 456 Pine Avenue. I'm looking forward to showing you this beautiful home!\n\nPlease let me know if you need directions or have any questions.\n\nBest regards",
    scheduledFor: "Tomorrow at 9:00 AM"
  },
  {
    id: 3,
    to: "Lisa Park",
    messageType: "email",
    subject: "New Listing Alert: 3BR in Your Favorite Neighborhood",
    message: "Hi Lisa,\n\nI wanted to let you know about a new listing that just came on the market in the neighborhood you've been watching. It's a stunning 3-bedroom home with modern updates.\n\nWould you like to be one of the first to see it?\n\nBest,",
    scheduledFor: "Tomorrow at 10:00 AM"
  }
];

// Mock data for recently sent messages
const recentlySentMessages: SentMessage[] = [
  {
    id: 1,
    to: "Michael Thompson",
    messageType: "email",
    subject: "Thank You for Visiting Our Open House",
    message: "Hi Michael,\n\nThank you for attending our open house at 567 Oak Avenue yesterday. It was great meeting you!\n\nI'd love to answer any questions you might have about the property or schedule a private showing.\n\nBest regards",
    sentAt: "2 hours ago"
  },
  {
    id: 2,
    to: "Rachel Green",
    messageType: "sms",
    message: "Hi Rachel! Just following up on the property details I sent yesterday. Let me know if you'd like to schedule a viewing! 🏡",
    sentAt: "5 hours ago"
  },
  {
    id: 3,
    to: "James Wilson",
    messageType: "email",
    subject: "Market Update: New Listings in Your Area",
    message: "Hi James,\n\nI wanted to share some exciting new listings that just hit the market in your preferred neighborhood. These properties match your criteria perfectly.\n\nWould you like to schedule viewings?\n\nBest,",
    sentAt: "Yesterday at 2:30 PM"
  },
  {
    id: 4,
    to: "Patricia Brown",
    messageType: "sms",
    message: "Hi Patricia! Hope your property tour went well yesterday. I'm here if you have any questions about any of the homes we viewed.",
    sentAt: "Yesterday at 4:15 PM"
  }
];

export default function Outbox() {
  const [editingScheduledId, setEditingScheduledId] = useState<number | null>(null);
  const [editedMessage, setEditedMessage] = useState("");
  const [editedSubject, setEditedSubject] = useState("");
  const [expandedScheduled, setExpandedScheduled] = useState<Set<number>>(new Set());
  const [expandedSent, setExpandedSent] = useState<Set<number>>(new Set());
  const [skipConfirmOpen, setSkipConfirmOpen] = useState(false);
  const [messageToSkip, setMessageToSkip] = useState<number | null>(null);

  const handleSaveScheduled = () => {
    toast("Message Updated", {
      description: "The scheduled message has been saved."
    });
    setEditingScheduledId(null);
  };

  const handleSkipClick = (id: number) => {
    setMessageToSkip(id);
    setSkipConfirmOpen(true);
  };

  const handleConfirmSkip = () => {
    if (messageToSkip !== null) {
      toast("Message Skipped", {
        description: "The scheduled message has been skipped and will not be sent."
      });
      setSkipConfirmOpen(false);
      setMessageToSkip(null);
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Outbox"
        description="View scheduled and recently sent messages"
      />

      <div className="space-y-6 mt-6">
        {/* Upcoming Messages Section */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Upcoming Messages
              <Badge variant="outline" className="ml-2">{scheduledMessages.length}</Badge>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">AI-scheduled messages ready to send</p>
          </div>

          <div className="space-y-2">
            {scheduledMessages.map((msg) => {
              const isExpanded = expandedScheduled.has(msg.id);
              const isEditing = editingScheduledId === msg.id;
              
              return (
                <Collapsible 
                  key={msg.id}
                  open={isExpanded || isEditing}
                  onOpenChange={(open) => {
                    const newExpanded = new Set(expandedScheduled);
                    if (open) {
                      newExpanded.add(msg.id);
                    } else {
                      newExpanded.delete(msg.id);
                      if (isEditing) {
                        setEditingScheduledId(null);
                        setEditedMessage("");
                        setEditedSubject("");
                      }
                    }
                    setExpandedScheduled(newExpanded);
                  }}
                >
                  <Card className="overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                        <Avatar className="h-9 w-9 shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {msg.to.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">{msg.to}</p>
                            <Badge variant={msg.messageType === "email" ? "default" : "secondary"} className="text-xs shrink-0">
                              {msg.messageType === "email" ? (
                                <><Mail className="h-3 w-3 mr-1" />Email</>
                              ) : (
                                <><MessageSquare className="h-3 w-3 mr-1" />SMS</>
                              )}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{msg.scheduledFor}</span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate flex-1">
                              {msg.subject || msg.message.substring(0, 50)}...
                            </p>
                          </div>
                        </div>
                        
                        <ChevronDown className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform shrink-0",
                          (isExpanded || isEditing) && "rotate-180"
                        )} />
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <Separator />
                      <div className="p-4 bg-muted/20">
                        {isEditing ? (
                          <div className="space-y-3">
                            {msg.messageType === "email" && (
                              <div>
                                <label className="text-xs font-medium text-muted-foreground">Subject</label>
                                <Input
                                  placeholder="Subject"
                                  value={editedSubject}
                                  onChange={(e) => setEditedSubject(e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                            )}
                            <div>
                              <label className="text-xs font-medium text-muted-foreground">Message</label>
                              <Textarea
                                placeholder="Message"
                                value={editedMessage}
                                onChange={(e) => setEditedMessage(e.target.value)}
                                className="min-h-[100px] resize-none mt-1"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={handleSaveScheduled}
                                className="gap-2"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                                Save Changes
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setEditingScheduledId(null);
                                  setEditedMessage("");
                                  setEditedSubject("");
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {msg.subject && (
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">Subject</p>
                                <p className="text-sm">{msg.subject}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-1">Message</p>
                              <p className="text-sm whitespace-pre-line rounded-md p-3 bg-background border">
                                {msg.message}
                              </p>
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingScheduledId(msg.id);
                                  setEditedMessage(msg.message);
                                  setEditedSubject(msg.subject || "");
                                }}
                                className="gap-2"
                              >
                                <Edit2 className="h-4 w-4" />
                                Edit
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSkipClick(msg.id);
                                }}
                                className="gap-2 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                                Skip
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              );
            })}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Recently Sent Section */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Recently Sent
              <Badge variant="outline" className="ml-2">{recentlySentMessages.length}</Badge>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Messages sent recently to your contacts</p>
          </div>

          <div className="space-y-2">
            {recentlySentMessages.map((msg) => {
              const isExpanded = expandedSent.has(msg.id);
              
              return (
                <Collapsible 
                  key={msg.id}
                  open={isExpanded}
                  onOpenChange={(open) => {
                    const newExpanded = new Set(expandedSent);
                    if (open) {
                      newExpanded.add(msg.id);
                    } else {
                      newExpanded.delete(msg.id);
                    }
                    setExpandedSent(newExpanded);
                  }}
                >
                  <Card className="overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                        <Avatar className="h-9 w-9 shrink-0">
                          <AvatarFallback className="bg-green-500/10 text-green-600 text-xs">
                            {msg.to.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">{msg.to}</p>
                            <Badge variant={msg.messageType === "email" ? "default" : "secondary"} className="text-xs shrink-0">
                              {msg.messageType === "email" ? (
                                <><Mail className="h-3 w-3 mr-1" />Email</>
                              ) : (
                                <><MessageSquare className="h-3 w-3 mr-1" />SMS</>
                              )}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              <span>{msg.sentAt}</span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate flex-1">
                              {msg.subject || msg.message.substring(0, 50)}...
                            </p>
                          </div>
                        </div>
                        
                        <ChevronDown className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform shrink-0",
                          isExpanded && "rotate-180"
                        )} />
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <Separator />
                      <div className="p-4 bg-muted/20 space-y-3">
                        {msg.subject && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Subject</p>
                            <p className="text-sm">{msg.subject}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Message</p>
                          <p className="text-sm whitespace-pre-line rounded-md p-3 bg-background border">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              );
            })}
          </div>
        </section>
      </div>

      <AlertDialog open={skipConfirmOpen} onOpenChange={setSkipConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Skip this message?</AlertDialogTitle>
            <AlertDialogDescription>
              This message will not be sent and will be permanently removed from your scheduled messages.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSkip} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Skip Message
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
}
