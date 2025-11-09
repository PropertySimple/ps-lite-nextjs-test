
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, MessageCircle, Phone, Mail, Calendar } from "lucide-react";

interface ContactSuggestionsProps {
  contactName: string;
}

const ContactSuggestions = ({ contactName }: ContactSuggestionsProps) => {
  const suggestions = [
    {
      id: "1",
      text: `${contactName} has been viewing the same property multiple times. Consider reaching out with additional property details or similar listings.`,
      action: "Send Property Info",
      actionType: "email" as const,
    },
    {
      id: "2", 
      text: `It's been 3 days since ${contactName}'s last activity. A follow-up call might help maintain engagement.`,
      action: "Schedule Call",
      actionType: "call" as const,
    }
  ];

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "email":
        return <Mail className="w-4 h-4" />;
      case "call":
        return <Phone className="w-4 h-4" />;
      case "message":
        return <MessageCircle className="w-4 h-4" />;
      case "meeting":
        return <Calendar className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };


  return (
    <Card className="border-accent bg-accent/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          AI Sales Assistant Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-card rounded-lg border">
            <p className="text-sm text-muted-foreground flex-1">
              {suggestion.text}
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <Button size="sm" variant="outline" className="gap-2">
                {getActionIcon(suggestion.actionType)}
                {suggestion.action}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContactSuggestions;
