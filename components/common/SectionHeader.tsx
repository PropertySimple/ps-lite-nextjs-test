import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  count?: number;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const SectionHeader = ({
  title,
  count,
  description,
  icon,
  action,
}: SectionHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {icon && <span className="text-xl">{icon}</span>}
          <h2 className="text-xl font-semibold">
            {title}
            {count !== undefined && (
              <span className="text-muted-foreground ml-2">({count})</span>
            )}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
