import { cn } from "@/lib/cn";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function SectionHeader({ className, ...props }: SectionHeaderProps) {
  return (
    <h3
      className={cn(
        "text-xs font-bold uppercase tracking-wider text-ink-muted font-body",
        className
      )}
      {...props}
    />
  );
}
