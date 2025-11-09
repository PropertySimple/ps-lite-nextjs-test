"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Mail, Phone, MessageSquare, Calendar } from "lucide-react";

const highPriorityLeads = [
  {
    id: 1,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "+1 (941) 555-0789",
    interaction: "Requested Info",
    details: "Lead Captured",
    date: "10/23/2025",
    platform: "Facebook",
    isNew: true,
    daysAgo: 0,
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "+1 (941) 555-0456",
    interaction: "Requested Info",
    details: "Lead Captured",
    date: "10/23/2025",
    platform: "Instagram",
    isNew: true,
    daysAgo: 0,
  },
];

const HighPriorityLeads = () => {
  const router = useRouter();

  const handleContactLead = (leadId: number) => {
    router.push(`/contact/${leadId}`);
  };

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">High Priority Leads</h2>
          <Badge className="bg-green-600 dark:bg-green-700">
            {highPriorityLeads.length} New
          </Badge>
        </div>
      </div>

      {/* 2-Column Lead Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {highPriorityLeads.map((lead) => (
          <Card
            key={lead.id}
            className="relative overflow-hidden border-2 border-green-200 dark:border-green-900 hover:border-green-300 dark:hover:border-green-800 transition-colors"
          >
            {/* Green accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500" />

            <CardContent className="p-6">
              {/* Header with name and NEW badge */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold mb-1">{lead.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{lead.date}</span>
                    {lead.daysAgo === 0 && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs">
                        Today
                      </Badge>
                    )}
                  </div>
                </div>
                {lead.isNew && (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    NEW
                  </Badge>
                )}
              </div>

              {/* Contact info */}
              <div className="space-y-2 mb-4">
                <a
                  href={`mailto:${lead.email}`}
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{lead.email}</span>
                </a>
                <a
                  href={`tel:${lead.phone}`}
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{lead.phone}</span>
                </a>
              </div>

              {/* Platform and status badges */}
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className={
                  lead.platform === 'Facebook'
                    ? 'border-blue-500 text-blue-700 dark:text-blue-400'
                    : 'border-pink-500 text-pink-700 dark:text-pink-400'
                }>
                  {lead.platform}
                </Badge>
                <Badge variant="secondary">
                  {lead.interaction}
                </Badge>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                  onClick={() => handleContactLead(lead.id)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleContactLead(lead.id)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HighPriorityLeads;
