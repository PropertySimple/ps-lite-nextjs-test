"use client";

import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AssistantAvatar } from "@/components/AssistantAvatar";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageSquare, Send, CheckCircle, Calendar, Shield, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Rep = {
  id: "sarah" | "emily" | "michael" | "david";
  name: string;
  gender: "female" | "male";
  tagline: string;
  description: string;
};

const reps: Rep[] = [
  {
    id: "sarah",
    name: "Sarah",
    gender: "female",
    tagline: "Professional & approachable",
    description: "Perfect for luxury properties and first-time buyers",
  },
  {
    id: "emily",
    name: "Emily",
    gender: "female",
    tagline: "Energetic & friendly",
    description: "Great for competitive markets and quick movers",
  },
  {
    id: "michael",
    name: "Michael",
    gender: "male",
    tagline: "Confident & direct",
    description: "Ideal for commercial properties and investors",
  },
  {
    id: "david",
    name: "David",
    gender: "male",
    tagline: "Trustworthy & personable",
    description: "Excellent all-around for any property type",
  },
];

const MeetSarah = () => {
  const [selectedRep, setSelectedRep] = useState<Rep>(reps[0]);
  const [phoneNumber] = useState("+1 (555) 123-4567");

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    toast.success("Copied", {
      description: "Put this number on your listings",
    });
  };

  const handleTestCall = () => {
    toast.success(`Calling ${selectedRep.name}...`, {
      description: "You'll receive a test call in a moment",
    });
  };

  const handleSelectRep = (rep: Rep) => {
    setSelectedRep(rep);
    toast.success(`${rep.name} selected`, {
      description: `${rep.gender === "female" ? "She's" : "He's"} ready to help`,
    });
  };

  const headerActions = (
    <Button className="gap-2" onClick={handleTestCall}>
      <Phone className="w-4 h-4" />
      <span className="hidden sm:inline">Test Call</span>
      <span className="sm:hidden">Test</span>
    </Button>
  );

  return (
    <PageLayout headerActions={headerActions} pageContext="sarah-page">
      <div className="max-w-4xl mx-auto space-y-12 py-8">
        {/* Hero */}
        <div className="text-center space-y-6">
          <AssistantAvatar rep={selectedRep.id} size="xl" className="h-24 w-24 mx-auto" />
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">
              {selectedRep.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Your AI assistant phone number and settings
            </p>
          </div>
        </div>

        {/* Phone Number - Hero */}
        <Card className="border-2">
          <CardContent className="p-8">
            <div className="space-y-4 text-center">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {selectedRep.name}'s Number
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Input
                    value={phoneNumber}
                    readOnly
                    className="text-2xl font-mono font-bold text-center max-w-xs h-14 bg-muted"
                  />
                  <Button onClick={handleCopyPhone} size="lg" className="h-14">
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Put this on your MLS listings, website, and business cards
                </p>
              </div>
              <Button onClick={handleTestCall} size="lg" className="w-full sm:w-auto">
                <Phone className="h-5 w-5 mr-2" />
                Call {selectedRep.name} Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Choose Your Rep */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Choose Your Assistant</h2>
            <p className="text-muted-foreground">
              Each has their own voice and style
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reps.map((rep) => (
              <Card
                key={rep.id}
                className={cn(
                  "cursor-pointer transition-all border-2",
                  selectedRep.id === rep.id
                    ? "border-primary shadow-lg scale-105"
                    : "border-transparent hover:border-muted-foreground/20"
                )}
                onClick={() => handleSelectRep(rep)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <AssistantAvatar rep={rep.id} size="lg" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-lg">{rep.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {rep.gender === "female" ? "Female" : "Male"}
                        </Badge>
                        {selectedRep.id === rep.id && (
                          <Badge className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {rep.tagline}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {rep.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </PageLayout>
  );
};

export default MeetSarah;
