import { Bell, ChevronDown, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function Topbar() {
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
      <div className="flex items-center gap-8 flex-1">
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
        <button className="p-2 text-ink-muted hover:text-ink hover:bg-surface rounded-sm transition-all duration-200 cursor-pointer relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-absent rounded-full ring-2 ring-surface-raised" />
        </button>

        {/* Vertical divider */}
        <div className="h-6 w-px bg-ink-muted/15" />

        {/* Profile Card */}
        <div className="flex items-center gap-3 pl-1.5 select-none cursor-pointer group">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-accent/15 text-accent flex items-center justify-center font-bold text-sm border border-accent/20 transition-transform group-hover:scale-105">
            LK
          </div>

          {/* User Meta (hidden on mobile) */}
          <div className="hidden md:flex flex-col text-left">
            <span className="font-body font-semibold text-sm text-ink group-hover:text-accent transition-colors leading-none">
              Lutfi Khoir
            </span>
            <span className="font-body text-xs text-ink-muted leading-tight mt-0.5">
              Administrator
            </span>
          </div>

          <ChevronDown className="w-4 h-4 text-ink-muted group-hover:text-ink transition-colors hidden md:block" />
        </div>
      </div>
    </header>
  );
}
