import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { UserProfileWidget } from "./UserProfileWidget";

interface TopbarProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export function Topbar({ onToggleSidebar, isSidebarCollapsed }: TopbarProps) {
  // Dark mode state management
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <header className="h-16 bg-surface-raised border-b border-ink-muted/15 px-6 flex items-center justify-between transition-all duration-200">
      {/* Title & Search Section */}
      <div className="flex items-center gap-3 flex-1">
        {/* Sidebar Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 text-ink-muted hover:text-ink hover:bg-surface rounded-sm transition-all duration-200 cursor-pointer"
          aria-label={
            isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"
          }
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="font-display font-bold text-lg text-ink hidden sm:block">
          Employee Management App
        </h1>
      </div>

      {/* Utility Actions */}
      <div className="flex items-center gap-4.5">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDark((prev) => !prev)}
          className="p-2 text-ink-muted hover:text-ink hover:bg-surface rounded-sm transition-all duration-200 cursor-pointer"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notification Icon */}
        <NotificationsDropdown />

        {/* Vertical divider */}
        <div className="h-6 w-px bg-ink-muted/15" />

        {/* Profile Card */}
        <UserProfileWidget name="Johannes Kepler" role="Engineering Lead" />
      </div>
    </header>
  );
}

