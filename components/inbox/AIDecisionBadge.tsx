import { Badge } from "@/components/ui/badge";
import { AlertCircle, UserCheck, MessageCircle } from "lucide-react";

type AIDecision = {
  type: "escalated" | "unsubscribed" | "responded";
  reason: string;
};

interface AIDecisionBadgeProps {
  decision: AIDecision;
}

export const AIDecisionBadge = ({ decision }: AIDecisionBadgeProps) => {
  if (decision.type === "escalated") {
    return (
      <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-3">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <Badge variant="outline" className="border-amber-500/30 text-amber-700 dark:text-amber-300 bg-amber-100/50 dark:bg-amber-900/20">
            AI Escalated to You
          </Badge>
          <p className="text-xs text-amber-700 dark:text-amber-300">
            {decision.reason}
          </p>
        </div>
      </div>
    );
  }

  if (decision.type === "unsubscribed") {
    return (
      <div className="flex items-start gap-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-3">
        <UserCheck className="h-4 w-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <Badge variant="outline" className="border-red-500/30 text-red-700 dark:text-red-300 bg-red-100/50 dark:bg-red-900/20">
            AI Unsubscribed Lead
          </Badge>
          <p className="text-xs text-red-700 dark:text-red-300">
            {decision.reason}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3">
      <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <Badge variant="outline" className="border-blue-500/30 text-blue-700 dark:text-blue-300 bg-blue-100/50 dark:bg-blue-900/20">
          AI Responded
        </Badge>
        <p className="text-xs text-blue-700 dark:text-blue-300">
          {decision.reason}
        </p>
      </div>
    </div>
  );
};
