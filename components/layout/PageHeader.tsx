
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export default PageHeader;
