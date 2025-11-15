"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { logger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ResponsiveCommunicationDrawer } from "@/components/ui/responsive-communication-drawer";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ContactActivity from "@/components/contact-detail/ContactActivity";
import { CallRecordingConsent } from "@/components/contact-detail/CallRecordingConsent";
import { CallInProgress } from "@/components/contact-detail/CallInProgress";
import { EditContactModal } from "@/components/contact-detail/EditContactModal";
import { ReminderModal } from "@/components/contact-detail/ReminderModal";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Ban,
  Sparkles,
  Bot,
  User,
  DollarSign,
  Clock,
  Tag,
  ChevronDown,
  ChevronUp,
  Edit,
  MessageSquare,
} from "lucide-react";
import type { Activity } from "@/types/activity";

const ContactDetail = () => {
  const params = useParams();
  const contactId = Array.isArray(params.contactId) ? params.contactId[0] : params.contactId;
  const { toast } = useToast();
  const [textMessage, setTextMessage] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isTextDrawerOpen, setIsTextDrawerOpen] = useState(false);
  const [isEmailDrawerOpen, setIsEmailDrawerOpen] = useState(false);
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [isCallConsentOpen, setIsCallConsentOpen] = useState(false);
  const [isCallInProgress, setIsCallInProgress] = useState(false);
  const [callRecording, setCallRecording] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [contactData, setContactData] = useState({
    name: "Indigo Avery",
    email: "indigo@avery.com",
    phone: "(162) 456-5689",
  });
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isAiHandling, setIsAiHandling] = useState(true);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [reminder, setReminder] = useState<{ date: string; text: string } | null>(null);
  const [isInsightsExpanded, setIsInsightsExpanded] = useState(true);
  const [isContactInfoExpanded, setIsContactInfoExpanded] = useState(false);

  // Mock data - in a real app, this would come from an API
  const contact = {
    id: contactId,
    ...contactData,
    status: "New Lead" as const,
    source: "Price Reduction Ad",
    interestedProperty: "116 DELLWOOD Avenue, Palatka, FL, 32177",
    firstSeen: "5 days ago",
    lastSeen: "2 days ago",
    interactions: 8,
    budget: "$450K",
    priority: "School district, family-friendly",
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "New Lead":
        return "secondary";
      case "Contacted":
        return "outline";
      case "Qualified":
        return "default";
      case "Converted":
        return "default";
      case "Lost":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const handleStartCall = (recordCall: boolean) => {
    setCallRecording(recordCall);
    setIsCallInProgress(true);
    logger.log("Starting call with recording:", recordCall);
  };

  const handleSaveContact = (updatedContact: { name: string; email: string; phone: string }) => {
    setContactData(updatedContact);
    logger.log("Saving contact:", updatedContact);
  };

  const handleUnsubscribeContact = () => {
    logger.log("Unsubscribing contact:", contact.name);

    const unsubscribeActivity: Activity = {
      id: `unsubscribe-${Date.now()}`,
      type: "manual_note",
      title: "Contact Unsubscribed",
      description: "Contact has been unsubscribed from all communications",
      timestamp: "Just now",
      metadata: {
        noteBody: "Contact has been unsubscribed from all communications and removed from active drip campaigns"
      }
    };

    setActivities((prev) => [unsubscribeActivity, ...prev]);
    setIsUnsubscribed(true);

    toast({
      title: "Contact Unsubscribed",
      description: `${contact.name} will no longer receive communications.`,
    });
  };

  const handleToggleAI = (checked: boolean) => {
    setIsAiHandling(checked);
    toast({
      title: checked ? "AI Now Handling" : "You're Now Handling",
      description: checked
        ? `AI will automatically respond to messages from ${contact.name}`
        : `You will need to manually respond to messages from ${contact.name}`
    });
  };

  const handleCallButtonClick = () => {
    setIsCallConsentOpen(true);
  };

  const handleSendText = () => {
    if (!textMessage.trim()) return;

    logger.log("Sending text message:", textMessage);

    const textActivity: Activity = {
      id: `text-${Date.now()}`,
      type: "manual_text_sent",
      title: `You texted ${contact.name}`,
      description: textMessage,
      timestamp: "Just now",
      status: "delivered",
      metadata: {
        messageBody: textMessage,
        deliveryStatus: "delivered"
      }
    };

    setActivities((prev) => [textActivity, ...prev]);
    setTextMessage("");
    setIsTextDrawerOpen(false);

    toast({
      title: "Text sent",
      description: `Your message was sent to ${contact.name}`
    });
  };

  const handleSendEmail = () => {
    if (!emailSubject.trim() || !emailMessage.trim()) return;

    logger.log("Sending email:", { subject: emailSubject, message: emailMessage });

    const emailActivity: Activity = {
      id: `email-${Date.now()}`,
      type: "manual_email_sent",
      title: `You emailed ${contact.name}`,
      description: emailSubject,
      timestamp: "Just now",
      status: "delivered",
      metadata: {
        subject: emailSubject,
        emailBody: emailMessage,
        deliveryStatus: "delivered"
      }
    };

    setActivities((prev) => [emailActivity, ...prev]);
    setEmailSubject("");
    setEmailMessage("");
    setIsEmailDrawerOpen(false);

    toast({
      title: "Email sent",
      description: `Your email was sent to ${contact.name}`
    });
  };

  const generateAITextMessage = async () => {
    setIsGeneratingText(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const suggestion = `Hi ${contact.name}! I wanted to follow up on your interest in ${contact.interestedProperty}. Would you like to schedule a viewing or have any questions about the property?`;
    setTextMessage(suggestion);
    setIsGeneratingText(false);
  };

  const generateAIEmailMessage = async () => {
    setIsGeneratingEmail(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const subjectSuggestion = `Property Inquiry Follow-up - ${contact.interestedProperty.substring(0, 30)}...`;
    const messageSuggestion = `Dear ${contact.name},

Thank you for your interest in ${contact.interestedProperty}. I hope this email finds you well.

I wanted to reach out to see if you have any questions about the property or if you'd like to schedule a viewing at your convenience.

Please let me know what works best for your schedule, and I'll be happy to arrange a time that suits you.

Best regards`;

    setEmailSubject(subjectSuggestion);
    setEmailMessage(messageSuggestion);
    setIsGeneratingEmail(false);
  };

  const handleApproveAIPlan = () => {
    toast({
      title: "AI Plan Approved",
      description: "Sarah will execute the strategy automatically"
    });
  };

  const handleModifyAIPlan = () => {
    toast({
      title: "Modify Plan",
      description: "Opening plan editor..."
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <SidebarInset className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex flex-col">
              <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
                <SidebarTrigger className="-ml-1 min-w-[44px] min-h-[44px]" aria-label="Toggle sidebar" />
                <Button variant="ghost" size="sm" asChild className="gap-2">
                  <Link href="/contacts">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back to Contacts</span>
                    <span className="sm:hidden">Back</span>
                  </Link>
                </Button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-base lg:text-lg font-semibold">{contact.name}</h1>
                    <Badge variant={getStatusBadgeVariant(contact.status)}>{contact.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {/* Language-based AI status with clear action button */}
                  {isAiHandling ? (
                    <>
                      <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                        <Bot className="w-4 h-4" />
                        <span className="font-medium hidden sm:inline">AI is handling</span>
                        <span className="font-medium sm:hidden">AI</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleToggleAI(false)}>
                        Take Over
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-500">
                        <User className="w-4 h-4" />
                        <span className="font-medium hidden sm:inline">You're handling</span>
                        <span className="font-medium sm:hidden">Manual</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleToggleAI(true)}>
                        Let AI Handle
                      </Button>
                    </>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={handleUnsubscribeContact}
                    disabled={isUnsubscribed}
                  >
                    <Ban className="w-4 h-4" />
                    <span className="hidden sm:inline">Unsubscribe</span>
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="container max-w-screen-xl mx-auto p-4 lg:p-6">
              <div className="space-y-4">

                {/* Unsubscribed Warning - Full Width */}
                {isUnsubscribed && (
                  <Alert variant="destructive" className="border-l-4 border-red-500">
                    <Ban className="w-5 h-5" />
                    <AlertTitle>Contact Unsubscribed</AlertTitle>
                    <AlertDescription>
                      This contact has been unsubscribed from all communications. All action buttons are disabled.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Mobile: Collapsible Contact Info */}
                <div className="lg:hidden">
                  <Collapsible open={isContactInfoExpanded} onOpenChange={setIsContactInfoExpanded}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Contact Details
                        </span>
                        {isContactInfoExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Card className="mt-2">
                        <CardContent className="pt-6 space-y-4 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-base">{contact.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setIsEditModalOpen(true)}
                              className="gap-1 h-7 text-muted-foreground hover:text-foreground"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span className="text-xs">Edit</span>
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span>{contact.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="truncate">{contact.email}</span>
                          </div>
                          <div className="border-t pt-4 space-y-3">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Interested In</div>
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                <span className="text-sm">{contact.interestedProperty}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Tag className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs">Source: {contact.source}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs">First Contact: {contact.firstSeen}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs">Budget: {contact.budget}</span>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Priority</div>
                              <span className="text-sm">{contact.priority}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
                  {/* Desktop: Left Sidebar - Contact Info */}
                  <div className="hidden lg:block lg:col-span-1">
                    <Card>
                      <CardContent className="pt-6 space-y-4 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-base">{contact.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditModalOpen(true)}
                            className="gap-1 h-7 text-muted-foreground hover:text-foreground"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span className="text-xs">Edit</span>
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span className="truncate">{contact.email}</span>
                        </div>

                        <div className="border-t pt-4 space-y-3">
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Interested In</div>
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                              <span className="text-sm">{contact.interestedProperty}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs">Source: {contact.source}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs">First Contact: {contact.firstSeen}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs">Budget: {contact.budget}</span>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Priority</div>
                            <span className="text-sm">{contact.priority}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Main Content - Full Width Conversation */}
                  <div className="lg:col-span-3 space-y-4">
                    <ContactActivity
                      contactId={contact.id!}
                      contactName={contact.name}
                      additionalActivities={activities}
                      onCallClick={handleCallButtonClick}
                    />

                    {/* Contextual Action Card - Shows AI status or Manual actions */}
                    {isAiHandling ? (
                      // AI Status Card
                      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20">
                        <CardContent className="py-4">
                          <div className="flex items-start gap-3">
                            <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                            <div className="flex-1 space-y-2">
                              <div className="font-medium text-sm">AI is managing this lead</div>
                              <div className="text-sm text-muted-foreground">
                                Next: Text at 2pm → Follow-up email tomorrow → Call in 48h if no reply
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      // Manual Actions Card - Appears when you take over
                      <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20">
                        <CardContent className="py-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                                <div className="font-medium">You're now handling this lead</div>
                              </div>
                              {/* Hand Back to AI Button */}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleAI(true)}
                                className="gap-2"
                              >
                                <Bot className="w-4 h-4" />
                                Hand Back to AI
                              </Button>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Choose how you'd like to reach out:
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <Button
                                onClick={() => setIsTextDrawerOpen(true)}
                                className="w-full"
                                size="lg"
                                disabled={isUnsubscribed}
                              >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Send Text
                              </Button>
                              <Button
                                onClick={() => setIsEmailDrawerOpen(true)}
                                variant="outline"
                                size="lg"
                                className="w-full"
                                disabled={isUnsubscribed}
                              >
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                              </Button>
                              <Button
                                onClick={handleCallButtonClick}
                                variant="outline"
                                size="lg"
                                className="w-full"
                                disabled={isUnsubscribed}
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Call
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>

      {/* Modals */}
      <CallRecordingConsent
        open={isCallConsentOpen}
        onOpenChange={setIsCallConsentOpen}
        contactName={contact.name}
        onStartCall={handleStartCall}
      />

      <CallInProgress
        open={isCallInProgress}
        onOpenChange={setIsCallInProgress}
        contactName={contact.name}
        contactPhone={contact.phone}
        isRecording={callRecording}
      />

      <EditContactModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        contact={contactData}
        onSave={handleSaveContact}
      />

      {/* Text Message Drawer */}
      <ResponsiveCommunicationDrawer
        open={isTextDrawerOpen}
        onOpenChange={setIsTextDrawerOpen}
        title={`Text ${contact.name}`}
        type="text"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="textMessage">Message</Label>
            <Textarea
              id="textMessage"
              placeholder="Type your message..."
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              rows={6}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={generateAITextMessage}
              variant="outline"
              disabled={isGeneratingText}
              className="flex-1"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isGeneratingText ? "Generating..." : "AI Suggest"}
            </Button>
            <Button
              onClick={handleSendText}
              disabled={!textMessage.trim()}
              className="flex-1"
            >
              Send Text
            </Button>
          </div>
        </div>
      </ResponsiveCommunicationDrawer>

      {/* Email Drawer */}
      <ResponsiveCommunicationDrawer
        open={isEmailDrawerOpen}
        onOpenChange={setIsEmailDrawerOpen}
        title={`Email ${contact.name}`}
        type="email"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailSubject">Subject</Label>
            <Input
              id="emailSubject"
              placeholder="Email subject..."
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emailMessage">Message</Label>
            <Textarea
              id="emailMessage"
              placeholder="Type your email..."
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
              rows={8}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={generateAIEmailMessage}
              variant="outline"
              disabled={isGeneratingEmail}
              className="flex-1"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isGeneratingEmail ? "Generating..." : "AI Suggest"}
            </Button>
            <Button
              onClick={handleSendEmail}
              disabled={!emailSubject.trim() || !emailMessage.trim()}
              className="flex-1"
            >
              Send Email
            </Button>
          </div>
        </div>
      </ResponsiveCommunicationDrawer>

      <ReminderModal
        open={isReminderModalOpen}
        onOpenChange={setIsReminderModalOpen}
        contactName={contact.name}
        onCreateReminder={(newReminder) => {
          setReminder(newReminder);
          setActivities([
            {
              id: Date.now().toString(),
              type: "reminder" as const,
              title: "Reminder Set",
              description: newReminder.text,
              timestamp: newReminder.date,
              metadata: {},
            },
            ...activities
          ]);
        }}
      />
    </SidebarProvider>
  );
};

export default ContactDetail;
