"use client";

import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Phone,
  Copy,
  Volume2,
  Check,
  Calendar,
  Bot,
  Shield,
  FileText,
  RefreshCw,
  User,
  Sparkles,
  Play,
  Edit,
  CheckCircle2,
  Bell,
  MessageSquare,
  Mail,
  Send,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

type PredefinedRep = {
  id: string;
  name: string;
  gender: "female" | "male";
  personality: string;
  description: string;
  avatar: string;
  defaultPersonality: string;
};

const AIAssistant = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams?.get("tab") || "how-it-works";

  const setSearchParams = (params: { tab: string }) => {
    const current = new URLSearchParams(Array.from(searchParams?.entries() || []));
    current.set("tab", params.tab);
    router.push(`?${current.toString()}`);
  };

  const predefinedReps: PredefinedRep[] = [
    {
      id: "sarah",
      name: "Sarah",
      gender: "female",
      personality: "Professional & Warm",
      description: "Friendly and knowledgeable, perfect for luxury properties",
      avatar: "S",
      defaultPersonality: "professional",
    },
    {
      id: "emily",
      name: "Emily",
      gender: "female",
      personality: "Casual & Friendly",
      description: "Energetic and approachable, great for first-time buyers",
      avatar: "E",
      defaultPersonality: "casual",
    },
    {
      id: "michael",
      name: "Michael",
      gender: "male",
      personality: "Expert & Confident",
      description: "Authoritative and direct, ideal for commercial properties",
      avatar: "M",
      defaultPersonality: "expert",
    },
    {
      id: "david",
      name: "David",
      gender: "male",
      personality: "Professional & Warm",
      description: "Trustworthy and personable, excellent all-around",
      avatar: "D",
      defaultPersonality: "professional",
    },
  ];

  const [selectedRep, setSelectedRep] = useState<PredefinedRep>(predefinedReps[0]);
  const [personality, setPersonality] = useState(predefinedReps[0].defaultPersonality);
  const [phoneNumber] = useState("+1 (555) 123-4567");

  const handleRepChange = (rep: PredefinedRep) => {
    setSelectedRep(rep);
    setPersonality(rep.defaultPersonality);
    toast.success(`${rep.name} Selected`, {
      description: `${rep.name} will now handle all your calls and messages.`,
    });
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    toast.success("Phone Number Copied!", {
      description: "Paste it on your MLS listing, website, or anywhere you need it.",
    });
  };

  const handleTestCall = () => {
    toast.success(`Calling ${selectedRep.name}...`, {
      description: `You'll receive a call from ${selectedRep.name} in a moment to test the experience.`,
    });
  };

  const handlePlaySample = (type: string) => {
    toast.info(`Playing ${type} Sample`, {
      description: `Listen to how ${selectedRep.name} handles real conversations.`,
    });
  };

  const handlePlayVoice = (repName: string) => {
    toast.info(`Playing ${repName}'s Voice`, {
      description: "Sample conversation starting...",
    });
  };

  const capabilities = [
    {
      icon: Phone,
      title: "Answers Every Call",
      description: "Takes inbound calls from MLS listings, website, or anywhere",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      icon: MessageSquare,
      title: "Handles Inbox Conversations",
      description: "Responds to texts and messages from leads in real-time",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/20",
    },
    {
      icon: Send,
      title: "Sends Outbound Messages",
      description: "Texts and emails leads who showed interest in properties",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/20",
    },
    {
      icon: CheckCircle2,
      title: "Qualifies Leads",
      description: "Asks budget, timeline, and must-haves naturally",
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-950/20",
    },
    {
      icon: Calendar,
      title: "Books Showings",
      description: "Schedules on your calendar automatically",
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-950/20",
    },
    {
      icon: Shield,
      title: "Filters Spam",
      description: "Blocks spam and connects real buyers instantly",
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-950/20",
    },
  ];

  const personalityOptions = [
    {
      id: "professional",
      name: "Professional & Warm",
      badge: "Recommended",
      example: "Hi! Thanks for calling about the property. I'd love to help you learn more...",
    },
    {
      id: "casual",
      name: "Casual & Friendly",
      badge: null,
      example: "Hey there! Awesome that you're interested in the listing. Let's chat...",
    },
    {
      id: "expert",
      name: "Expert & Confident",
      badge: null,
      example: "Hello, thank you for reaching out. I can provide detailed information...",
    },
  ];

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto space-y-6 p-4 sm:p-6">
        {/* Page Title */}
        <div className="text-center space-y-2 pt-4">
          <h1 className="text-3xl sm:text-4xl font-bold">Your AI Receptionist</h1>
          <p className="text-lg text-muted-foreground">Never miss a lead. Filter spam automatically. Works 24/7.</p>
        </div>

        <div className="border-t border-border my-6" />

        {/* Tabs */}
        <Tabs value={tab} onValueChange={(value) => setSearchParams({ tab: value })}>
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            <TabsTrigger value="setup">Setup</TabsTrigger>
          </TabsList>

          {/* HOW IT WORKS TAB */}
          <TabsContent value="how-it-works" className="space-y-8 mt-6">
            {/* DEMO - PROOF FIRST */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl mb-4">
                <Avatar className="h-full w-full">
                  <AvatarFallback className="bg-transparent text-white text-3xl sm:text-4xl font-bold">
                    {selectedRep.avatar}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Meet {selectedRep.name}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                {selectedRep.gender === "female" ? "She" : "He"} answers every call, qualifies leads, and only transfers when you're needed.
              </p>
            </div>

        {/* Demo Card - Front and Center */}
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 shadow-xl">
          <CardContent className="p-6 sm:p-8 text-center space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Try It Right Now</p>
              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl font-bold font-mono text-primary">
                  {phoneNumber}
                </div>
                <p className="text-sm text-muted-foreground">
                  Call {selectedRep.name} and ask about a property. {selectedRep.gender === "female" ? "She'll" : "He'll"} answer instantly.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleTestCall} size="lg" className="gap-2 h-14 text-lg font-semibold shadow-lg">
                <Phone className="h-6 w-6" />
                Call {selectedRep.name} Now
              </Button>
              <Button
                onClick={() => handlePlaySample("Buyer Inquiry")}
                variant="outline"
                size="lg"
                className="gap-2 h-14 text-lg bg-background"
              >
                <Volume2 className="h-6 w-6" />
                Hear a Sample Call
              </Button>
            </div>

            <div className="pt-4 border-t border-border/50">
              <Button onClick={handleCopyPhone} variant="ghost" className="gap-2">
                <Copy className="h-4 w-4" />
                Copy Phone Number for Your Listings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 2. THE PROBLEM */}
        <Card className="border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">You're Losing Deals Every Day</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto pt-4">
                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-bold text-red-600 dark:text-red-400">67%</div>
                  <p className="text-sm text-muted-foreground">of leads call competitors when you don't answer</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-bold text-red-600 dark:text-red-400">40%</div>
                  <p className="text-sm text-muted-foreground">of your calls are spam wasting your time</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-bold text-red-600 dark:text-red-400">2am</div>
                  <p className="text-sm text-muted-foreground">when serious buyers are browsing listings online</p>
                </div>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground pt-4">
                {selectedRep.name} solves all of this. Automatically.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 3. WHAT IT DOES - Capabilities */}
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold">What {selectedRep.name} Does for You</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Handles everything automatically, so you focus on closing deals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((capability, idx) => {
              const Icon = capability.icon;
              return (
                <Card key={idx} className="border-l-4">
                  <CardContent className="p-5 space-y-3">
                    <div className={cn("p-3 rounded-full w-fit", capability.bg)}>
                      <Icon className={cn("h-6 w-6", capability.color)} />
                    </div>
                    <h3 className="font-semibold text-base">{capability.title}</h3>
                    <p className="text-sm text-muted-foreground">{capability.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 4. SEE IT IN ACTION - Sample Conversations */}
        <Card className="border-2 border-green-500/20 bg-green-50/50 dark:bg-green-950/20">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold">See {selectedRep.name} in Action</h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Listen to real conversations. Hear how {selectedRep.gender === "female" ? "she" : "he"} handles different scenarios.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-2 hover:border-primary/50 transition-all cursor-pointer" onClick={() => handlePlaySample("Buyer Inquiry")}>
                <CardContent className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Buyer Inquiry Call</h3>
                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Lead calls about a listing. {selectedRep.name} answers questions, qualifies budget, and books a showing.
                  </p>
                  <Badge variant="secondary" className="text-xs">2:34 duration</Badge>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all cursor-pointer" onClick={() => handlePlaySample("Showing Request")}>
                <CardContent className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Showing Request</h3>
                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Interested buyer wants to schedule. {selectedRep.name} checks your calendar and confirms instantly.
                  </p>
                  <Badge variant="secondary" className="text-xs">1:47 duration</Badge>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all cursor-pointer" onClick={() => handlePlaySample("Price Q&A")}>
                <CardContent className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Price Negotiation</h3>
                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Lead asks about price flexibility. {selectedRep.name} transfers to you immediately for negotiation.
                  </p>
                  <Badge variant="secondary" className="text-xs">1:12 duration</Badge>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all cursor-pointer" onClick={() => handlePlaySample("Spam Filter")}>
                <CardContent className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Spam Call Blocked</h3>
                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Telemarketer tries to sell services. {selectedRep.name} identifies spam and politely ends the call.
                  </p>
                  <Badge variant="secondary" className="text-xs">0:43 duration</Badge>
                </CardContent>
              </Card>
            </div>

            <div className="text-center pt-4">
              <Button onClick={handleTestCall} size="lg" className="gap-2 h-12">
                <Phone className="h-5 w-5" />
                Call {selectedRep.name} to Test Yourself
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 5. SMART HANDOFF */}
        <Card>
          <CardContent className="p-6 sm:p-8 space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold">When {selectedRep.name} Transfers to You</h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                {selectedRep.gender === "female" ? "She" : "He"} handles 90% of calls. The other 10%? Hot leads ready to close.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto pt-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Lead Ready to Make Offer</p>
                  <p className="text-sm text-muted-foreground">Serious buyers get instant access</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Price Negotiation</p>
                  <p className="text-sm text-muted-foreground">Needs your expertise</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Complex Questions</p>
                  <p className="text-sm text-muted-foreground">Beyond standard info</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">VIP Clients</p>
                  <p className="text-sm text-muted-foreground">Always transferred to you</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center pt-4">
              Everything else? {selectedRep.name} handles it and sends you detailed notes.
            </p>
          </CardContent>
        </Card>
          </TabsContent>

          {/* SETUP TAB */}
          <TabsContent value="setup" className="space-y-8 mt-6">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold">Configure Your AI Assistant</h2>
                  <p className="text-base text-muted-foreground">
                    Follow these steps to customize {selectedRep.name}'s voice, personality, and qualifying questions.
                  </p>
                </div>
              </CardContent>
            </Card>

        {/* 6. CUSTOMIZE - Choose Your Rep */}
        <Card>
          <CardContent className="p-6 sm:p-8 space-y-4">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Choose Your AI Representative</h2>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground">
                Each rep has their own voice and personality. Pick the one that fits your brand.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {predefinedReps.map((rep) => (
                <Card
                  key={rep.id}
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary/50 hover:shadow-md",
                    selectedRep.id === rep.id && "border-primary border-2 shadow-lg"
                  )}
                  onClick={() => handleRepChange(rep)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 sm:h-14 sm:w-14 shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                          {rep.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-base">{rep.name}</h3>
                            <Badge variant="outline" className="text-xs shrink-0">
                              {rep.gender === "female" ? "Female Voice" : "Male Voice"}
                            </Badge>
                            {selectedRep.id === rep.id && (
                              <Badge className="text-xs shrink-0">
                                <Check className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{rep.personality}</p>
                          <p className="text-xs text-muted-foreground">{rep.description}</p>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayVoice(rep.name);
                          }}
                          variant="ghost"
                          size="sm"
                          className="gap-2 h-8 text-xs w-full sm:w-auto"
                        >
                          <Play className="h-3 w-3" />
                          Hear {rep.name}'s Voice
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 7. PERSONALITY - Fine-Tune Style */}
        <Card>
          <CardContent className="p-6 sm:p-8 space-y-4">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Fine-Tune {selectedRep.name}'s Communication Style</h2>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground">
                Adjust how {selectedRep.gender === "female" ? "she" : "he"} talks to your leads
              </p>
            </div>

            <RadioGroup value={personality} onValueChange={setPersonality} className="space-y-3">
              {personalityOptions.map((option) => (
                <Card
                  key={option.id}
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary/50",
                    personality === option.id && "border-primary border-2"
                  )}
                  onClick={() => setPersonality(option.id)}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={option.id} id={option.id} className="mt-1 shrink-0" />
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Label htmlFor={option.id} className="text-sm sm:text-base font-semibold cursor-pointer">
                            {option.name}
                          </Label>
                          {option.badge && (
                            <Badge variant="secondary" className="text-xs shrink-0">
                              {option.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground italic break-words">
                          "{option.example}"
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* 8. QUALIFYING QUESTIONS */}
        <Card>
          <CardContent className="p-6 sm:p-8 space-y-4">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">How {selectedRep.name} Qualifies Leads</h2>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground">
                {selectedRep.gender === "female" ? "She" : "He"} asks these naturally in conversation—not like a boring form
              </p>
            </div>

            <div className="space-y-2">
              {[
                "What's your name?",
                "Are you looking to buy or sell?",
                "What's your budget?",
                "When are you looking to move?",
                "Is there anything specific you're looking for?",
              ].map((question, idx) => (
                <div key={idx} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/30">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs sm:text-sm font-semibold text-primary">
                    {idx + 1}
                  </div>
                  <p className="font-medium flex-1 text-sm sm:text-base min-w-0">{question}</p>
                  <Button variant="ghost" size="sm" className="gap-1 sm:gap-2 shrink-0 h-8">
                    <Edit className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="hidden sm:inline text-xs sm:text-sm">Edit</span>
                  </Button>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full gap-2 h-10 sm:h-auto">
              <Sparkles className="h-4 w-4" />
              Add Custom Question
            </Button>

            <p className="text-xs text-muted-foreground">
              Tip: {selectedRep.name} asks these naturally in conversation, not like a form.
              Drag to reorder by priority.
            </p>
          </CardContent>
        </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AIAssistant;
