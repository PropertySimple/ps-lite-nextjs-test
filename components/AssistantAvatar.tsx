import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AssistantRep = "sarah" | "emily" | "michael" | "david";

interface AssistantAvatarProps {
  rep?: AssistantRep;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  pulse?: boolean;
}

const repConfig = {
  sarah: {
    initial: "S",
    name: "Sarah",
    gradient: "from-blue-500 to-purple-500",
  },
  emily: {
    initial: "E",
    name: "Emily",
    gradient: "from-pink-500 to-rose-500",
  },
  michael: {
    initial: "M",
    name: "Michael",
    gradient: "from-indigo-500 to-blue-500",
  },
  david: {
    initial: "D",
    name: "David",
    gradient: "from-cyan-500 to-teal-500",
  },
};

const sizeClasses = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
  xl: "h-16 w-16 text-2xl",
};

export const AssistantAvatar = ({
  rep = "sarah",
  size = "md",
  className,
  pulse = false,
}: AssistantAvatarProps) => {
  const config = repConfig[rep];

  return (
    <div className="relative">
      <Avatar className={cn(sizeClasses[size], className)}>
        <AvatarFallback
          className={cn(
            "bg-gradient-to-br text-white font-bold",
            config.gradient
          )}
        >
          {config.initial}
        </AvatarFallback>
      </Avatar>
      {pulse && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
      )}
    </div>
  );
};

export default AssistantAvatar;
