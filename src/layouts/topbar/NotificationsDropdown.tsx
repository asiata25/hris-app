import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { Bell, CalendarDays, Megaphone } from "lucide-react";
import { cn } from "@/lib/cn";
import { getNotificationsFromDb } from "@/lib/mockDb";
import type { Notification } from "@/types";

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load initial notifications
  useEffect(() => {
    setNotifications(getNotificationsFromDb());
  }, []);

  // Handle click outside to close the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const hasUnread = notifications.some((n) => !n.isRead);

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "p-2 text-ink-muted hover:text-ink hover:bg-surface rounded-sm transition-all duration-200 cursor-pointer relative block",
          isOpen && "text-ink bg-surface",
        )}
        aria-label="Notifications"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {hasUnread && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-absent rounded-full ring-2 ring-surface-raised" />
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface border border-ink-muted/15 shadow-xl rounded-md z-50 overflow-hidden font-body origin-top-right animate-scaleUp">
          {/* Header */}
          <div className="px-4 py-3 border-b border-ink-muted/10 flex items-center justify-between bg-surface-raised">
            <h3 className="font-display font-bold text-sm text-ink">
              Notifications
            </h3>
          </div>

          {/* List Content */}
          {notifications.length === 0 ? (
            <div className="py-8 px-4 text-center text-ink-muted text-sm bg-surface">
              You're all caught up
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto divide-y divide-ink-muted/5 bg-surface">
              {notifications.map((item) => {
                const Icon = item.type === "leave" ? CalendarDays : Megaphone;
                return (
                  <Link
                    key={item.id}
                    to={item.linkTo || "#"}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-start gap-3 p-3.5 hover:bg-surface/60 transition-colors duration-150 text-left w-full",
                      !item.isRead ? "bg-transparent" : "bg-surface-raised",
                    )}
                  >
                    {/* Icon Container */}
                    <div
                      className={cn(
                        "p-2 rounded-sm shrink-0 mt-0.5",
                        item.type === "leave"
                          ? "bg-status-pending/10 text-status-pending"
                          : "bg-accent/10 text-accent",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Notification Copy */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={cn(
                            "text-xs leading-snug wrap-break-word",
                            !item.isRead
                              ? "font-semibold text-ink"
                              : "text-ink-muted",
                          )}
                        >
                          {item.description}
                        </p>

                        {/* Unread dot next to text */}
                        {!item.isRead && (
                          <span className="w-2 h-2 bg-accent rounded-full shrink-0 mt-1.5" />
                        )}
                      </div>
                      <span className="text-[10px] text-ink-muted mt-1 block">
                        {item.timeAgo}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="p-3 border-t border-ink-muted/10 text-center bg-surface-raised">
            <Link
              to="/announcements"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors duration-150 inline-block w-full"
            >
              View all announcements
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
