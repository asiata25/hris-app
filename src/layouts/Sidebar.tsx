import { NavLink } from "react-router";
import { LayoutDashboard, Users, Clock, CalendarDays, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/cn";

export function Sidebar() {
  const navItems = [
    { name: "Home", to: "/", icon: LayoutDashboard },
    { name: "Team", to: "/team", icon: Users },
    { name: "Attendance", to: "/attendance", icon: Clock },
    { name: "Leave", to: "/leave", icon: CalendarDays },
  ];

  return (
    <aside className="w-64 h-full bg-surface-raised border-r border-ink-muted/15 flex flex-col transition-all duration-200">
      {/* Brand logo section */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-ink-muted/10">
        <div className="w-9 h-9 rounded-sm bg-accent flex items-center justify-center text-white font-display font-bold shadow-md shadow-accent/20">
          LL
        </div>
        <span className="font-display font-bold text-xl text-ink tracking-tight">
          Labourlink
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3.5 px-4 py-3 rounded-sm text-sm font-medium transition-all duration-200 font-body cursor-pointer relative group",
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
                      "w-5 h-5 transition-transform duration-200 group-hover:scale-105",
                      isActive ? "text-accent" : "text-ink-muted group-hover:text-ink"
                    )}
                  />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="absolute right-0 top-1/4 bottom-1/4 w-1 rounded-l bg-accent" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom info banner */}
      <div className="p-4 border-t border-ink-muted/10 bg-surface/20">
        <div className="flex items-center gap-2.5 text-xs text-ink-muted font-body">
          <ShieldAlert className="w-4 h-4 text-accent" />
          <span>Internal HR Portal</span>
        </div>
      </div>
    </aside>
  );
}
