"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Calendar,
  Eye,
  Sparkles,
  MessageSquare,
  Phone as PhoneIcon,
  Copy,
  Mail,
  Activity,
  Edit,
  Plus,
  User,
  Save,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type LeadInfoPanelProps = {
  contactId: string;
  contactName: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  interestedProperty: string;
  interestedProperties?: string[];
  firstSeen: string;
  lastSeen: string;
  interactions: number;
  isAiSuggestionsModalOpen?: boolean;
  onAiSuggestionsModalOpenChange?: (open: boolean) => void;
  isLeadInfoModalOpen?: boolean;
  onLeadInfoModalOpenChange?: (open: boolean) => void;
  onSelectSuggestion?: (message: string) => void;
  onEditContact?: () => void;
  reminder?: {
    text: string;
    date: string;
  };
};

export const LeadInfoPanel = ({
  contactId,
  contactName,
  email,
  phone,
  status,
  source,
  interestedProperty,
  interestedProperties = [],
  firstSeen,
  lastSeen,
  interactions,
  isAiSuggestionsModalOpen: externalIsAiSuggestionsModalOpen,
  onAiSuggestionsModalOpenChange: externalOnAiSuggestionsModalOpenChange,
  isLeadInfoModalOpen: externalIsLeadInfoModalOpen,
  onLeadInfoModalOpenChange: externalOnLeadInfoModalOpenChange,
  onSelectSuggestion,
  onEditContact,
  reminder,
}: LeadInfoPanelProps) => {
  const [internalIsAiSuggestionsModalOpen, setInternalIsAiSuggestionsModalOpen] = useState(false);
  const [internalIsLeadInfoModalOpen, setInternalIsLeadInfoModalOpen] = useState(false);
  const [backgroundInfo, setBackgroundInfo] = useState("Jennifer and her husband are pre-approved for $650k and looking for a 4-bedroom home in a good school district. They have two children and prioritize outdoor space.");
  const [isEditingBackground, setIsEditingBackground] = useState(false);
  const [reminders, setReminders] = useState<Array<{ date: string; text: string }>>(reminder ? [reminder] : []);
  
  // Qualifying questions and answers from AI
  const qualifyingQuestions = [
    { id: "1", question: "What is your name?", answer: "Jennifer Thompson" },
    { id: "2", question: "Are you looking to buy or sell?", answer: "Buy" },
    { id: "3", question: "What is your budget?", answer: "$650,000" },
    { id: "4", question: "Which neighborhood are you interested in?", answer: null },
    { id: "5", question: "What is your email address?", answer: null },
  ];
  
  const isAiSuggestionsModalOpen = externalIsAiSuggestionsModalOpen !== undefined ? externalIsAiSuggestionsModalOpen : internalIsAiSuggestionsModalOpen;
  const setIsAiSuggestionsModalOpen = externalOnAiSuggestionsModalOpenChange || setInternalIsAiSuggestionsModalOpen;
  
  const isLeadInfoModalOpen = externalIsLeadInfoModalOpen !== undefined ? externalIsLeadInfoModalOpen : internalIsLeadInfoModalOpen;
  const setIsLeadInfoModalOpen = externalOnLeadInfoModalOpenChange || setInternalIsLeadInfoModalOpen;

  // AI-generated suggestions
  const textSuggestions = [
    {
      title: "Follow up on property interest",
      message: `Hi ${contactName}! I wanted to follow up on the property you viewed at our open house. Would you like to schedule a private showing or discuss any questions you might have?`,
      priority: "high"
    },
    {
      title: "Share similar listings",
      message: `Hi ${contactName}, based on your interest in ${interestedProperty}, I have a few similar properties that just came on the market. Would you like me to send you the details?`,
      priority: "medium"
    },
    {
      title: "Check in on timeline",
      message: `Hi ${contactName}, hope you're doing well! Just checking in to see if you're still in the market and if your timeline has changed at all. I'm here to help when you're ready!`,
      priority: "medium"
    }
  ];

  const callScript = {
    intro: "Hi [Name], this is [Your Name] from [Agency]. I hope I'm not catching you at a bad time?",
    purpose: "I wanted to follow up on your visit to our open house. I noticed you were interested in the property at [Address].",
    questions: [
      "What did you think of the property overall?",
      "Are there any specific features you're looking for?",
      "What's your timeline for making a purchase decision?"
    ],
    closing: "I'd love to help you find the perfect home. When would be a good time for us to chat more in depth or schedule a showing?"
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "New Lead":
        return "secondary";
      case "Contacted":
        return "outline";
      case "Qualified":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <>
      {/* Lead Info Modal */}
      <Dialog open={isLeadInfoModalOpen} onOpenChange={setIsLeadInfoModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Lead Information</DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh]">
            <div className="space-y-6">
              {/* Contact Details */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Contact Details</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onEditContact}
                      className="gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">Name</p>
                        <p className="text-sm font-medium">{contactName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">{email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <PhoneIcon className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="text-sm font-medium">{phone}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reminders */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Reminders
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => {
                        toast.info("Add Reminder", {
                          description: "Reminder functionality coming soon"
                        });
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      Add Reminder
                    </Button>
                  </div>
                  
                  {reminders.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <p className="text-sm">No reminders set</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {reminders.map((reminder, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                          <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground">{reminder.date}</p>
                            <p className="text-sm font-medium">{reminder.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Lead Information */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <h3 className="text-lg font-semibold">Lead Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Eye className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">Source</p>
                        <p className="text-sm font-medium">{source}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Activity className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">Interactions</p>
                        <p className="text-sm font-medium">{interactions}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div className="space-y-2 flex-1">
                      <p className="text-xs text-muted-foreground">Interested Properties</p>
                      {interestedProperties.length > 0 ? (
                        <ul className="space-y-1">
                          {interestedProperties.map((property, idx) => (
                            <li key={idx} className="text-sm font-medium flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{property}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm font-medium">{interestedProperty}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Qualifying Questions & Answers */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">AI Qualifying Questions</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The AI attempted to gather this information during the initial conversation
                  </p>
                  
                  <div className="space-y-3">
                    {qualifyingQuestions.map((item, idx) => (
                      <div key={item.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{item.question}</p>
                          {item.answer ? (
                            <p className="text-sm text-muted-foreground">{item.answer}</p>
                          ) : (
                            <p className="text-xs text-muted-foreground italic">Not answered yet</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <h3 className="text-lg font-semibold">Timeline</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">First Seen</p>
                        <p className="text-sm font-medium">{firstSeen}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">Last Seen</p>
                        <p className="text-sm font-medium">{lastSeen}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Background Information */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Background Information</h3>
                    {!isEditingBackground ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingBackground(true)}
                        className="gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditingBackground(false)}
                          className="gap-2"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setIsEditingBackground(false);
                            toast.success("Background Information Updated");
                          }}
                          className="gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {!isEditingBackground ? (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {backgroundInfo || "No background information added yet."}
                    </p>
                  ) : (
                    <Textarea
                      value={backgroundInfo}
                      onChange={(e) => setBackgroundInfo(e.target.value)}
                      placeholder="Add background information about this lead..."
                      className="min-h-[120px] resize-none"
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* AI Suggestions Modal */}
      <Dialog open={isAiSuggestionsModalOpen} onOpenChange={setIsAiSuggestionsModalOpen}>
        <DialogContent className="max-w-4xl h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <DialogTitle className="text-2xl">AI Suggestions for {contactName}</DialogTitle>
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 px-6">
            <div className="space-y-6 pb-6 pt-4">
              {/* Text Message Suggestions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Suggested Text Messages</h3>
                </div>
                <div className="space-y-3">
                  {textSuggestions.slice(0, 2).map((suggestion, idx) => (
                    <Card key={idx} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h4 className="font-semibold text-sm">{suggestion.title}</h4>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => {
                              onSelectSuggestion?.(suggestion.message);
                              setIsAiSuggestionsModalOpen(false);
                            }}
                            className="shrink-0"
                          >
                            Edit & Send
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {suggestion.message}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Call Script */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Call Script & Talking Points</h3>
                  </div>
                  <Button className="gap-2">
                    <PhoneIcon className="w-4 h-4" />
                    Call Now
                  </Button>
                </div>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Opening</h4>
                      <p className="text-sm text-muted-foreground">{callScript.intro}</p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Purpose</h4>
                      <p className="text-sm text-muted-foreground">{callScript.purpose}</p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Questions to Ask</h4>
                      <ul className="space-y-2">
                        {callScript.questions.map((question, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary font-semibold text-sm mt-0.5">{idx + 1}.</span>
                            <span className="text-sm text-muted-foreground">{question}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Closing</h4>
                      <p className="text-sm text-muted-foreground">{callScript.closing}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};
