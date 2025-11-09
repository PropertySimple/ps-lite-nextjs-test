import * as React from "react"
import { cn } from "@/lib/utils"

// NOTE: @radix-ui/react-toggle-group stub

interface ToggleGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onValueChange'> {
  type: "single" | "multiple";
  value?: string | string[];
  onValueChange?: (value: string) => void;
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ children, type, value, onValueChange, className, ...props }, ref) => {
    const handleClick = (itemValue: string) => {
      if (onValueChange) {
        onValueChange(itemValue);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("inline-flex rounded-lg border border-input bg-transparent p-1", className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const childElement = child as React.ReactElement<ToggleGroupItemProps>;
            return React.cloneElement(childElement, {
              onClick: () => handleClick(childElement.props.value),
              isActive: value === childElement.props.value,
            } as Partial<ToggleGroupItemProps>);
          }
          return child;
        })}
      </div>
    );
  }
);
ToggleGroup.displayName = "ToggleGroup"

interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  isActive?: boolean;
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, isActive, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        className
      )}
      {...props}
    />
  )
)
ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup, ToggleGroupItem }
