import { NavLink } from "react-router";
import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  name: string;
  to: string;
  icon: LucideIcon;
  isCollapsed: boolean;
  onCloseMobile: () => void;
  isMobileOpen: boolean;
}

export function SidebarLink({
  name,
  to,
  icon: Icon,
  isCollapsed,
  onCloseMobile,
  isMobileOpen,
}: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      onClick={() => isMobileOpen && onCloseMobile()}
      className={({ isActive }) =>
        cn(
          "flex items-center rounded-sm text-sm font-medium transition-all duration-200 font-body cursor-pointer relative group gap-3.5 px-4 py-3",
          isCollapsed && "md:justify-center md:p-3",
          isActive
            ? "bg-accent/10 text-accent font-semibold"
            : "text-ink-muted hover:bg-surface/50 hover:text-ink"
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={cn(
              "w-5 h-5 transition-transform duration-200 group-hover:scale-105 shrink-0",
              isActive ? "text-accent" : "text-ink-muted group-hover:text-ink"
            )}
          />
          <span
            className={cn(
              "whitespace-nowrap animate-fadeIn transition-opacity duration-200",
              isCollapsed ? "md:hidden" : "block"
            )}
          >
            {name}
          </span>
          {isActive && (
            <div className="absolute right-0 top-1/4 bottom-1/4 w-1 rounded-l bg-accent" />
          )}

          {isCollapsed && (
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-ink text-surface-raised text-xs font-semibold rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-ink-muted/10 hidden md:block">
              {name}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
}
