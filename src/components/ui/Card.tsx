import * as React from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-surface-raised rounded-md p-6 border border-ink-muted/10 text-ink font-body transition-all duration-200 shadow-sm",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
