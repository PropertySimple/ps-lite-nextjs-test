import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageSquare, UserCheck, TrendingUp } from "lucide-react";

interface LeadStageCardsProps {
  stages: {
    new: number;
    aiEngaging: number;
    agentNeeded: number;
    converted: number;
  };
}

export const LeadStageCards = ({ stages }: LeadStageCardsProps) => {
  const cards = [
    {
      title: "New",
      value: stages.new,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      title: "AI Engaging",
      value: stages.aiEngaging,
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
    },
    {
      title: "Agent Needed",
      value: stages.agentNeeded,
      icon: UserCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
    {
      title: "Converted",
      value: stages.converted,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
