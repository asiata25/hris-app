import * as React from "react";
import { cn } from "@/lib/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: "present" | "absent" | "pending";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    const variants = {
      present: "bg-status-present/20 text-status-present border border-status-present/15",
      absent: "bg-status-absent/20 text-status-absent border border-status-absent/15",
      pending: "bg-status-pending/20 text-status-pending border border-status-pending/15",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-semibold font-body transition-colors select-none",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
