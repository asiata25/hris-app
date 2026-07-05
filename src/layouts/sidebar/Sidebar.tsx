import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarDays,
  Megaphone,
  ShieldAlert,
  FileText,
  Mail,
  Bug,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { SidebarLink } from "./SidebarLink";
import { SidebarFooter } from "./SidebarFooter";

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  isCollapsed,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const navItems = [
    { name: "Home", to: "/", icon: LayoutDashboard },
    { name: "Team", to: "/team", icon: Users },
    { name: "Attendance", to: "/attendance", icon: Clock },
    { name: "Leave", to: "/leave", icon: CalendarDays },
    { name: "Announcements", to: "/announcements", icon: Megaphone },
  ];

  const footerItems = [
    { name: "Privacy & Terms", to: "/privacy-terms", icon: FileText },
    { name: "Contact", to: "/contact", icon: Mail },
    { name: "Report Bug", to: "/report-bug", icon: Bug },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 bg-surface-raised border-r border-ink-muted/15 flex flex-col transition-all duration-200 md:relative md:translate-x-0 shrink-0 w-64",
        isCollapsed && "md:w-20",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Brand logo section */}
      <div
        className={cn(
          "h-16 flex items-center border-b border-ink-muted/10 transition-all duration-200 shrink-0 px-6 gap-3",
          isCollapsed && "md:px-0 md:justify-center"
        )}
      >
        <div className="w-9 h-9 rounded-sm bg-accent flex items-center justify-center text-white font-display font-bold shadow-md shadow-accent/20 shrink-0">
          LL
        </div>
        <span
          className={cn(
            "font-display font-bold text-xl text-ink tracking-tight whitespace-nowrap animate-fadeIn transition-opacity duration-200",
            isCollapsed ? "md:hidden" : "block"
          )}
        >
          Labourlink
        </span>
      </div>

      {/* Navigation Links */}
      <nav
        className={cn(
          "flex-1 py-6 px-4 space-y-1 overflow-y-auto",
          isCollapsed && "md:overflow-visible"
        )}
      >
        {navItems.map((item) => (
          <SidebarLink
            key={item.to}
            name={item.name}
            to={item.to}
            icon={item.icon}
            isCollapsed={isCollapsed}
            onCloseMobile={onCloseMobile}
            isMobileOpen={isMobileOpen}
          />
        ))}
      </nav>

      {/* Secondary Utility Links */}
      <SidebarFooter
        items={footerItems}
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onCloseMobile={onCloseMobile}
      />

      {/* Bottom info banner */}
      <div
        className={cn(
          "p-4 border-t border-ink-muted/10 bg-surface/20 flex shrink-0 transition-all duration-200 items-center gap-2.5",
          isCollapsed && "md:justify-center"
        )}
      >
        <ShieldAlert className="w-4 h-4 text-accent shrink-0" />
        <span
          className={cn(
            "text-xs text-ink-muted font-body whitespace-nowrap animate-fadeIn transition-opacity duration-200",
            isCollapsed ? "md:hidden" : "block"
          )}
        >
          Internal HR Portal
        </span>
      </div>
    </aside>
  );
}
