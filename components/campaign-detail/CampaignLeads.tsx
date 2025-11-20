"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageSquare, User } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  timestamp: Date;
  isNew: boolean;
}

// Mock data - in production this would come from API
const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Michael Chen",
    phone: "(555) 123-4567",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    isNew: true,
  },
  {
    id: "2",
    name: "Sarah Williams",
    phone: "(555) 234-5678",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isNew: true,
  },
  {
    id: "3",
    name: "David Martinez",
    phone: "(555) 345-6789",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isNew: false,
  },
  {
    id: "4",
    name: "Jennifer Lopez",
    phone: "(555) 456-7890",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    isNew: false,
  },
];

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 172800) return "Yesterday";
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function CampaignLeads() {
  const newLeadsCount = mockLeads.filter(l => l.isNew).length;

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/\D/g, '')}`;
  };

  const handleText = (phone: string) => {
    window.location.href = `sms:${phone.replace(/\D/g, '')}`;
  };

  if (mockLeads.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-2">No leads yet</h3>
          <p className="text-muted-foreground">
            Leads will appear here as your ad generates interest
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Leads</CardTitle>
          {newLeadsCount > 0 && (
            <Badge className="bg-primary text-white">
              {newLeadsCount} new
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          People who responded to your ad
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockLeads.map((lead) => (
          <div
            key={lead.id}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              lead.isNew
                ? "bg-primary/5 border-primary/20"
                : "bg-card border-border"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">{lead.name}</span>
                  {lead.isNew && (
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{lead.phone}</span>
                  <span>·</span>
                  <span>{formatTimeAgo(lead.timestamp)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 shrink-0 ml-4">
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={() => handleText(lead.phone)}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Text</span>
              </Button>
              <Button
                size="sm"
                className="gap-1.5"
                onClick={() => handleCall(lead.phone)}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Call</span>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
