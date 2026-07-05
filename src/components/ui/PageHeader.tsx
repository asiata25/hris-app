import { cn } from "@/lib/cn";

interface PageHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function PageHeader({ className, ...props }: PageHeaderProps) {
  return (
    <h2
      className={cn(
        "text-2xl font-bold font-display text-ink tracking-tight",
        className
      )}
      {...props}
    />
  );
}
