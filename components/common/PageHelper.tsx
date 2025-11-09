import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PageHelperProps {
  title: string;
  description: string;
}

export const PageHelper = ({ title, description }: PageHelperProps) => {
  return (
    <Card className="border-primary/20 bg-primary/5 dark:bg-primary/10 mb-6">
      <div className="p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
};
