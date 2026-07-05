import { cn } from "@/lib/cn";

interface BodyTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  muted?: boolean;
}

export function BodyText({ className, muted = false, ...props }: BodyTextProps) {
  return (
    <p
      className={cn(
        "font-body text-sm text-ink",
        muted && "text-ink-muted",
        className
      )}
      {...props}
    />
  );
}
