"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Sparkles, AlertCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface Notification {
  id: number;
  type: "suggestion" | "followup" | "handoff";
  title: string;
  description: string;
  leadName: string;
  time: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "handoff",
    title: "Lead Ready for Hand-Off",
    description: "Jennifer Martinez is ready to move forward",
    leadName: "Jennifer Martinez",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "followup",
    title: "Follow-Up Reminder",
    description: "Follow up with Emma Wilson about 456 Pine Avenue",
    leadName: "Emma Wilson",
    time: "Tomorrow",
  },
  {
    id: 3,
    type: "suggestion",
    title: "AI Suggestion",
    description: "Send property comparison to Michael Chen",
    leadName: "Michael Chen",
    time: "1 hour ago",
  },
];

const typeConfig = {
  suggestion: {
    icon: Sparkles,
    color: "text-purple-600",
    badgeVariant: "default" as const,
  },
  followup: {
    icon: Clock,
    color: "text-blue-600",
    badgeVariant: "secondary" as const,
  },
  handoff: {
    icon: AlertCircle,
    color: "text-orange-600",
    badgeVariant: "destructive" as const,
  },
};

export const NotificationPanel = () => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={() => router.push("/inbox")}>
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No new notifications</p>
        ) : (
          notifications.map((notification) => {
            const config = typeConfig[notification.type];
            const Icon = config.icon;
            
            return (
              <div
                key={notification.id}
                className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => router.push("/inbox")}
              >
                <div className={`${config.color} mt-0.5`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                    <Badge variant={config.badgeVariant} className="text-xs">
                      {notification.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};
