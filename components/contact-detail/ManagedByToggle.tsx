import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bot, User } from "lucide-react";
import { toast } from "sonner";

interface ManagedByToggleProps {
  isAiHandling: boolean;
  onToggle: (isAiHandling: boolean) => void;
  contactName: string;
}

export const ManagedByToggle = ({ isAiHandling, onToggle, contactName }: ManagedByToggleProps) => {
  const handleToggle = (checked: boolean) => {
    onToggle(checked);
    toast.success(
      checked ? "AI Now Handling" : "You're Now Handling",
      {
        description: checked
          ? `AI will automatically respond to messages from ${contactName}`
          : `You will need to manually respond to messages from ${contactName}`
      }
    );
  };

  return (
    <Switch
      checked={isAiHandling}
      onCheckedChange={handleToggle}
    />
  );
};
