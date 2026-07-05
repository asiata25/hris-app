import { Avatar } from "@/components/ui/Avatar";

interface UserProfileWidgetProps {
  name: string;
  role: string;
}

export function UserProfileWidget({ name, role }: UserProfileWidgetProps) {
  return (
    <div className="flex items-center gap-3 pl-1.5 select-none cursor-pointer group">
      <Avatar name={name} size="sm" />
      <div className="hidden md:flex flex-col text-left">
        <span className="font-body font-semibold text-sm text-ink group-hover:text-accent transition-colors leading-none">
          {name}
        </span>
        <span className="font-body text-xs text-ink-muted leading-tight mt-0.5">
          {role}
        </span>
      </div>
    </div>
  );
}
