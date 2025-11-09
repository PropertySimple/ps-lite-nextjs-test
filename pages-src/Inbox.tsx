"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Filter } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";
import { InboxCard } from "@/components/inbox/InboxCard";
import { CallModal } from "@/components/inbox/CallModal";
import { CallInProgress } from "@/components/contact-detail/CallInProgress";

type ConversationItem = {
  type: "email" | "sms" | "call" | "lead_form";
  from: "agent" | "contact" | "ai";
  subject?: string;
  message: string;
  timestamp: string;
  callSummary?: string;
  callTranscript?: string;
  leadFormData?: {
    name: string;
    phone: string;
    email: string;
    propertyAddress: string;
    adSource: string;
  };
};

type InboxItem = {
  id: number;
  type: "sms" | "call" | "email";
  channel: "phone" | "sms" | "email";
  contactName: string;
  phone: string;
  email?: string;
  timestamp: string;
  requiresAttention: true;
  escalationReason?: string;
  conversationHistory?: ConversationItem[];
  lastMessage?: string;
  callSummary?: string;
  aiSuggestedTask?: string;
  reminder?: {
    text: string;
    date: string;
  };
  previewSnippet: string;
  aiSummary: string;
  recentMessagesPreview: {
    timestamp: string;
    from: "agent" | "contact" | "ai";
    message: string;
  }[];
  suggestedAction: {
    title: string;
    description: string;
    actionType: "call" | "reply" | "schedule" | "review";
  };
};

// Mock data
const needsAttentionItems: InboxItem[] = [
  {
    id: 1,
    type: "call",
    channel: "phone",
    contactName: "Jennifer Martinez",
    phone: "(555) 789-0123",
    email: "jennifer.m@email.com",
    timestamp: "3h ago",
    requiresAttention: true,
    escalationReason: "Lead is ready to make an offer. AI handled initial questions but personal agent attention needed for offer negotiation and paperwork.",
    lastMessage: "Inbound call handled by AI - Review needed",
    aiSuggestedTask: "Call Jennifer to schedule property viewing this weekend. She and her husband are pre-approved and ready to move quickly.",
    previewSnippet: "Hi, I saw your listing for 789 Maple Drive online. My husband and I are very interested. Can you tell me more about the property and...",
    aiSummary: "Jennifer called 3 hours ago asking about 789 Maple Drive. AI provided property details, school information, and answered financing questions. She and her husband are pre-approved for $650k and want to schedule a viewing this weekend. Hot lead - ready to move quickly.",
    recentMessagesPreview: [
      { timestamp: "3h ago", from: "contact", message: "Called asking about 789 Maple Drive" },
      { timestamp: "3h ago", from: "ai", message: "Provided property details and school info" }
    ],
    suggestedAction: {
      title: "Schedule Property Viewing",
      description: "Jennifer is pre-approved and ready to view the property this weekend. Call to arrange showing times.",
      actionType: "call"
    },
    conversationHistory: [
      {
        type: "call",
        from: "contact",
        message: "",
        timestamp: "3 hours ago",
        callSummary: "18-minute inbound call. Jennifer called asking about 789 Maple Drive after seeing it online. AI answered questions about property features, neighborhood, schools, and general financing. She's pre-approved and wants to see it this weekend.",
        callTranscript: "AI: Hello! Thank you for calling. How can I help you today?\n\nJennifer: Hi, I saw your listing for 789 Maple Drive online. My husband and I are very interested. Can you tell me more about the property and neighborhood?\n\nAI: I'd be happy to! 789 Maple Drive is a beautiful 4-bedroom, 3-bath home with 2,400 square feet. It features a recently renovated kitchen with granite countertops, hardwood floors throughout, and a large backyard with mature trees. What specific aspects are you most interested in?\n\nJennifer: We have two kids, so schools are really important to us. What's the school district like?\n\nAI: Excellent question! The property is in the top-rated Lincoln Elementary school district, which has a 9 out of 10 rating. It's only 0.3 miles away. The middle and high schools in the area are also highly rated. Many families specifically choose this neighborhood for the schools.\n\nJennifer: That's perfect! What about the price? We're pre-approved for up to $650,000.\n\nAI: The listing price is $625,000, which is very competitive for this area and the features this home offers. Based on recent comparable sales, it's priced fairly. With your pre-approval at $650k, you'd be in a strong position.\n\nJennifer: Great! We'd love to see it. Are there any showings available this weekend?\n\nAI: Absolutely! Your agent will be the best person to schedule a showing time that works for you. They'll reach out shortly to coordinate weekend viewing times. Is there anything else you'd like to know about the property?\n\nJennifer: No, I think that covers it for now. We're excited to see it!\n\nAI: Wonderful! Your agent will be in touch very soon to set up your showing. Thank you for your interest in 789 Maple Drive!"
      }
    ]
  },
  {
    id: 2,
    type: "call",
    channel: "phone",
    contactName: "Robert Thompson",
    phone: "(555) 456-7890",
    email: "robert.t@email.com",
    timestamp: "45m ago",
    requiresAttention: true,
    escalationReason: "Lead called with specific financing questions beyond AI's capabilities. Needs agent to discuss mortgage pre-approval and connect with lenders.",
    aiSuggestedTask: "Call Robert to discuss his specific mortgage scenarios and connect him with a preferred lender.",
    lastMessage: "Inbound call handled by AI - Review needed",
    previewSnippet: "Hello, I'm calling about 456 Pine Avenue. I visited the open house last week and I have some questions about...",
    aiSummary: "Robert called 45 minutes ago with follow-up questions after visiting the open house. AI answered basic property questions but he has specific financing scenarios that require agent expertise. Interested and motivated - needs lender connection.",
    recentMessagesPreview: [
      { timestamp: "1w ago", from: "contact", message: "Visited open house at 456 Pine Avenue" },
      { timestamp: "1w ago", from: "ai", message: "Sent property details via SMS" }
    ],
    suggestedAction: {
      title: "Discuss Financing Options",
      description: "Call Robert to discuss his specific mortgage scenarios and connect him with a preferred lender.",
      actionType: "call"
    },
    conversationHistory: [
      {
        type: "lead_form",
        from: "contact",
        message: "Visited open house",
        timestamp: "1 week ago",
        leadFormData: {
          name: "Robert Thompson",
          phone: "(555) 456-7890",
          email: "robert.t@email.com",
          propertyAddress: "456 Pine Avenue",
          adSource: "Open House Sign-In"
        }
      },
      {
        type: "call",
        from: "contact",
        message: "",
        timestamp: "45 minutes ago",
        callSummary: "10-minute inbound call. Robert called with questions about 456 Pine Avenue after attending open house. AI answered property questions but he has specific financing scenarios that need agent expertise.",
        callTranscript: "AI: Hello! Thank you for calling. How can I help you today?\n\nRobert: Hello, I'm calling about 456 Pine Avenue. I visited the open house last week and I have some questions about financing.\n\nAI: Of course! I'm glad you enjoyed the open house. What would you like to know about financing for 456 Pine Avenue?\n\nRobert: Well, the house is listed at $485,000. I'm wondering what kind of down payment options are available, and whether there are any first-time buyer programs I might qualify for.\n\nAI: Great questions! Generally, conventional mortgages require 10-20% down, which would be $48,500-97,000 for this property. There are also FHA loans with as little as 3.5% down. For first-time buyer programs and specific scenarios, your agent can connect you with preferred lenders who specialize in these programs and can evaluate your exact situation.\n\nRobert: I see. What if I only put 10% down? How would that affect my monthly payments?\n\nAI: With 10% down on a $485,000 property, you'd be financing $436,500. Monthly payments would typically be around $2,600-3,000 depending on interest rates, plus you'd need PMI since it's under 20% down. However, for precise calculations and to explore the best options for your situation, I'd recommend having your agent connect you with a mortgage specialist who can run exact numbers.\n\nRobert: That makes sense. I think I need to talk through my specific situation with someone.\n\nAI: Absolutely! Your agent will reach out shortly to discuss your financing options in detail and connect you with lenders who can provide personalized guidance. Is there anything else about the property itself I can help with?\n\nRobert: No, I think I'm good for now. Thanks!\n\nAI: You're welcome, Robert! Your agent will be in touch soon."
      }
    ]
  },
  {
    id: 3,
    type: "sms",
    channel: "sms",
    contactName: "Sarah Johnson",
    phone: "(555) 123-4567",
    email: "sarah.j@email.com",
    timestamp: "15m ago",
    requiresAttention: true,
    escalationReason: "The contact is asking about property availability and showing times. This is a new lead that requires prompt personal attention to schedule a viewing.",
    lastMessage: "Hi! I'm interested in viewing the property at 123 Oak Street. Is it still available?",
    aiSuggestedTask: "Hi Sarah! Yes, 123 Oak Street is still available! It's a beautiful 3-bedroom, 2-bath home with 1,650 sq ft in a great neighborhood. I'd love to schedule a showing for you. Are you available this week? I have openings on Thursday at 4pm or Saturday at 2pm.",
    previewSnippet: "Hi! I'm interested in viewing the property at 123 Oak Street. Is it still available?",
    aiSummary: "New lead inquiry via SMS just 15 minutes ago. Sarah is interested in viewing 123 Oak Street and wants to confirm availability. This is a hot lead that needs immediate response.",
    recentMessagesPreview: [
      { timestamp: "15m ago", from: "contact", message: "Interested in viewing 123 Oak Street" }
    ],
    suggestedAction: {
      title: "Reply with Showing Times",
      description: "Respond immediately with availability and property highlights to schedule a viewing while interest is high.",
      actionType: "reply"
    },
    conversationHistory: [
      {
        type: "sms",
        from: "contact",
        message: "Hi! I'm interested in viewing the property at 123 Oak Street. Is it still available?",
        timestamp: "15 minutes ago"
      }
    ]
  },
  {
    id: 4,
    type: "email",
    channel: "email",
    contactName: "Michael Chen",
    phone: "(555) 234-5678",
    email: "michael.chen@email.com",
    timestamp: "1h ago",
    requiresAttention: true,
    escalationReason: "Lead sent detailed email with multiple questions about property condition and recent repairs. Personal response needed to build trust and credibility.",
    lastMessage: "Detailed email inquiry received",
    aiSuggestedTask: "Reply to Michael with specific information about roof, HVAC, and recent upgrades from seller disclosure documents.",
    previewSnippet: "Questions about 234 Elm Street - roof condition and recent upgrades?",
    aiSummary: "Michael sent a detailed email 1 hour ago asking about roof condition, HVAC age, and recent renovations for 234 Elm Street. AI provided general information but he needs specific details from disclosure documents. Serious buyer doing thorough research.",
    recentMessagesPreview: [
      { timestamp: "2d ago", from: "ai", message: "Sent property details via email" },
      { timestamp: "1h ago", from: "contact", message: "Detailed questions about condition and repairs" }
    ],
    suggestedAction: {
      title: "Provide Detailed Property History",
      description: "Reply with specific information about roof, HVAC, and recent upgrades from seller disclosure documents.",
      actionType: "reply"
    },
    conversationHistory: [
      {
        type: "lead_form",
        from: "contact",
        message: "New lead inquiry from Zillow",
        timestamp: "2 days ago",
        leadFormData: {
          name: "Michael Chen",
          phone: "(555) 234-5678",
          email: "michael.chen@email.com",
          propertyAddress: "234 Elm Street",
          adSource: "Zillow Listing"
        }
      },
      {
        type: "email",
        from: "ai",
        subject: "Property Details: 234 Elm Street",
        message: "Hi Michael,\n\nThank you for your interest in 234 Elm Street!\n\n🏡 Property Highlights:\n• 3 bedrooms, 2.5 bathrooms\n• 2,100 square feet\n• Modern open-concept kitchen\n• Finished basement\n• 2-car garage\n• Built in 2018\n\n💰 Pricing: $545,000\n\nI've attached photos and details. Would you like to schedule a showing?\n\nBest regards,\nAI Assistant",
        timestamp: "2 days ago"
      },
      {
        type: "email",
        from: "contact",
        subject: "Questions about 234 Elm Street - roof condition and recent upgrades?",
        message: "Hi,\n\nThank you for the information about 234 Elm Street. I'm very interested in the property and have a few specific questions before scheduling a showing:\n\n1. What is the age and condition of the roof? Any recent repairs or replacements?\n\n2. When was the HVAC system last serviced or replaced?\n\n3. You mentioned the kitchen is modern - what renovations were done and when?\n\n4. Are there any known issues with the foundation, plumbing, or electrical systems?\n\n5. What upgrades or improvements have been made since the home was built in 2018?\n\nI like to do thorough research before viewing properties. Any documentation you can provide would be helpful.\n\nThank you,\nMichael Chen",
        timestamp: "1 hour ago"
      }
    ]
  }
];

export default function Inbox() {
  const router = useRouter();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [callInProgressOpen, setCallInProgressOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<InboxItem | null>(null);
  const [viewFilter, setViewFilter] = useState<"attention" | "all">("attention");

  const selectedItem = needsAttentionItems.find(item => item.id === selectedItemId);
  

  const handleSendReply = () => {
    toast("Message Sent", {
      description: "Your reply has been sent successfully."
    });
    setReplyText("");
    setSelectedItemId(null);
  };

  const handleMarkComplete = () => {
    toast("Task Completed", {
      description: "This item has been marked as complete."
    });
    setSelectedItemId(null);
  };

  const handleSendSMS = (id: number) => {
    // SMS is handled inline in InboxCard
  };

  const handleSendEmail = (id: number) => {
    // Email is handled inline in InboxCard
  };

  const handleCall = (id: number) => {
    const item = needsAttentionItems.find(i => i.id === id);
    if (item) {
      setSelectedContact(item);
      setCallModalOpen(true);
    }
  };

  const handleStartCall = () => {
    setCallInProgressOpen(true);
  };

  const headerActions = (
    <ToggleGroup type="single" value={viewFilter} onValueChange={(value: string) => value && setViewFilter(value as "attention" | "all")}>
      <ToggleGroupItem value="attention" aria-label="Show needs attention">
        <AlertCircle className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Needs Attention</span>
        <span className="sm:hidden">Attention</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="all" aria-label="Show all messages">
        <Filter className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">All Messages</span>
        <span className="sm:hidden">All</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );

  return (
    <PageLayout headerActions={headerActions} pageContext="inbox">
      <PageHeader
        title="AI Assistant Inbox"
        description="Your AI handles routine conversations automatically. Review high-priority items below that need your personal touch."
      />

      <div className="border-t border-border my-8" />

      {/* Needs Attention Section - Primary */}
      <div className="space-y-8">
        <section>
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold flex items-center gap-2 flex-wrap">
            <AlertCircle className="h-6 w-6 text-warning" />
            Needs Your Attention
            <Badge variant="warning" className="ml-2 text-base px-3 py-1">{needsAttentionItems.length}</Badge>
          </h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Leads ready to move forward, complex questions, or conversations where your personal expertise will close the deal.</p>
        </div>

         <div className="grid gap-6">
                {needsAttentionItems.map((item) => (
                  <InboxCard
                    key={item.id}
                    id={item.id}
                    channel={item.channel}
                    contactName={item.contactName}
                    timestamp={item.timestamp}
                    previewSnippet={item.previewSnippet}
                    aiSummary={item.aiSummary}
                    recentMessagesPreview={item.recentMessagesPreview}
                    suggestedAction={item.suggestedAction}
                    aiSuggestedReply={item.aiSuggestedTask}
                    onViewFull={(id) => {
                      router.push(`/contact/${id}`);
                    }}
                    onTakeAction={(id) => {
                      toast("Action Started", {
                        description: "Opening task for this contact."
                      });
                    }}
                    onDismiss={(id) => {
                      toast("Item Dismissed", {
                        description: "This item has been removed from your inbox."
                      });
                    }}
                    onSendSMS={handleSendSMS}
                    onSendEmail={handleSendEmail}
                    onCall={handleCall}
              />
        ))}
      </div>
    </section>

    {/* Modals */}
    {selectedContact && (
      <>
        <CallModal
          open={callModalOpen}
          onOpenChange={setCallModalOpen}
          contactName={selectedContact.contactName}
          phoneNumber={selectedContact.phone}
          onStartCall={handleStartCall}
        />
        <CallInProgress
          open={callInProgressOpen}
          onOpenChange={setCallInProgressOpen}
          contactName={selectedContact.contactName}
          contactPhone={selectedContact.phone}
          isRecording={true}
          aiSummary={selectedContact.aiSummary}
          suggestedAction={selectedContact.suggestedAction.description}
        />
      </>
    )}
      </div>
      </PageLayout>
    );
  }
