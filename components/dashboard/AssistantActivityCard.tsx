import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AssistantAvatar } from "@/components/AssistantAvatar";
import { Phone, CheckCircle, Calendar, Clock } from "lucide-react";

interface AssistantActivityCardProps {
  repName?: string;
  rep?: "sarah" | "emily" | "michael" | "david";
  onChatClick?: () => void;
}

export const AssistantActivityCard = ({
  repName = "Sarah",
  rep = "sarah",
  onChatClick,
}: AssistantActivityCardProps) => {
  // TODO: Get real data from backend
  const stats = {
    callsHandled: 12,
    leadsQualified: 8,
    showingsBooked: 3,
  };

  return (
    <Card className="border-2">
      <CardContent className="p-8 sm:p-10">
        <div className="space-y-8">
          {/* Header with Avatar */}
          <div className="flex items-center gap-5">
            <AssistantAvatar rep={rep} size="xl" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold tracking-tight leading-tight">{repName}</h3>
              <p className="text-muted-foreground leading-relaxed">Always here to help</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Today
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold tracking-tight">{stats.callsHandled}</p>
                  <p className="text-sm text-muted-foreground">calls handled</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold tracking-tight">{stats.leadsQualified}</p>
                  <p className="text-sm text-muted-foreground">leads qualified</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                  <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold tracking-tight">{stats.showingsBooked}</p>
                  <p className="text-sm text-muted-foreground">showings booked</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground flex-1">
              {repName} is handling your inbox right now
            </p>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>

          {/* CTA */}
          <Button onClick={onChatClick} size="lg" className="w-full">
            Chat with {repName}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssistantActivityCard;
