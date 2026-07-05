import { NavLink } from "react-router";
import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

interface FooterItem {
  name: string;
  to: string;
  icon: LucideIcon;
}

interface SidebarFooterProps {
  items: FooterItem[];
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function SidebarFooter({
  items,
  isCollapsed,
  isMobileOpen,
  onCloseMobile,
}: SidebarFooterProps) {
  return (
    <div
      className={cn(
        "px-4 py-3 border-t border-ink-muted/10 flex flex-col gap-1 shrink-0",
        isCollapsed && "md:px-0 md:items-center"
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => isMobileOpen && onCloseMobile()}
            className={({ isActive }) =>
              cn(
                "flex items-center rounded-sm text-xs font-medium transition-all duration-200 font-body cursor-pointer relative group gap-2.5 px-3.5 py-2 w-full",
                isCollapsed && "md:justify-center md:p-2",
                isActive
                  ? "text-accent font-semibold"
                  : "text-ink-muted hover:bg-surface/50 hover:text-ink"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 group-hover:scale-105 shrink-0",
                    isActive ? "text-accent" : "text-ink-muted group-hover:text-ink"
                  )}
                />
                <span
                  className={cn(
                    "whitespace-nowrap animate-fadeIn transition-opacity duration-200",
                    isCollapsed ? "md:hidden" : "block"
                  )}
                >
                  {item.name}
                </span>

                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-ink text-surface-raised text-xs font-semibold rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-ink-muted/10 hidden md:block">
                    {item.name}
                  </div>
                )}
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
}
