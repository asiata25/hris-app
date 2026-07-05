import { NavLink } from "react-router";
import { LayoutDashboard, Users, Clock, CalendarDays, ShieldAlert, FileText, Mail, Bug } from "lucide-react";
import { cn } from "@/lib/cn";

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ isCollapsed, isMobileOpen, onCloseMobile }: SidebarProps) {
  const navItems = [
    { name: "Home", to: "/", icon: LayoutDashboard },
    { name: "Team", to: "/team", icon: Users },
    { name: "Attendance", to: "/attendance", icon: Clock },
    { name: "Leave", to: "/leave", icon: CalendarDays },
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
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
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
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="absolute right-0 top-1/4 bottom-1/4 w-1 rounded-l bg-accent" />
                  )}
                  
                  {/* Premium tooltip when collapsed */}
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
      </nav>

      {/* Secondary Utility Links */}
      <div
        className={cn(
          "px-4 py-3 border-t border-ink-muted/10 flex flex-col gap-1 shrink-0",
          isCollapsed && "md:px-0 md:items-center"
        )}
      >
        {footerItems.map((item) => {
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
                  
                  {/* Premium tooltip when collapsed */}
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

