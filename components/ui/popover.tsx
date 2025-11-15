import * as React from "react"
import { cn } from "@/lib/utils"

// NOTE: @radix-ui/react-popover stub
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Popover = ({ children }: any) => <div>{children}</div>

interface PopoverTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const PopoverTrigger = React.forwardRef<HTMLDivElement, PopoverTriggerProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? "div" : "div";
    return (
      <Comp ref={ref} className={cn(className)} {...props} />
    );
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: string;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, align, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        className
      )}
      {...props}
    />
  )
)
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
