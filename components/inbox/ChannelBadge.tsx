import { Badge } from "@/components/ui/badge";

const CHANNEL_CONFIG = {
  phone: { emoji: "📞", label: "Call" },
  sms: { emoji: "💬", label: "SMS" },
  email: { emoji: "📧", label: "Email" }
} as const;

interface ChannelBadgeProps {
  channel: "phone" | "sms" | "email";
}

export const ChannelBadge = ({ channel }: ChannelBadgeProps) => {
  const config = CHANNEL_CONFIG[channel];
  
  return (
    <Badge variant="secondary" className="text-xs px-1.5 py-0">
      {config.emoji} {config.label}
    </Badge>
  );
};
