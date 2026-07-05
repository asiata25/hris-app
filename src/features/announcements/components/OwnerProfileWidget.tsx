import type { Employee } from "@/types";
import { Mail } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";

interface OwnerProfileWidgetProps {
  pic: Employee;
}

export function OwnerProfileWidget({ pic }: OwnerProfileWidgetProps) {
  return (
    <Card className="flex flex-col gap-5 border border-ink-muted/10 p-5 shadow-sm animate-fadeIn">
      <div>
        <h3 className="text-xs font-bold font-display text-ink-muted uppercase tracking-wider mb-3 select-none">
          Person in Charge (PIC)
        </h3>
        <div className="flex items-center gap-3">
          <Avatar name={pic.name} size="lg" />
          <div className="flex flex-col">
            <span className="font-semibold font-body text-base text-ink leading-tight">
              {pic.name}
            </span>
            <span className="text-xs font-body text-ink-muted mt-1 leading-none">
              {pic.role}
            </span>
            <span className="text-xs font-body font-medium text-accent mt-0.5">
              {pic.department} Department
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-muted/10 pt-4">
        <a
          href={`mailto:${pic.email}`}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-sm bg-accent text-white hover:bg-accent/90 transition-colors shadow-sm shadow-accent/15 cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>Email PIC</span>
        </a>
      </div>
    </Card>
  );
}
