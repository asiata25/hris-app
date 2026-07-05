import type { Announcement } from "@/types";
import { Sparkles, Calendar } from "lucide-react";
import { Link } from "react-router";
import { Card } from "@/components/ui/Card";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  // Formatting date for a friendlier look (e.g. "July 5, 2026")
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr + "T00:00:00");
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <Link to={`/announcements/${announcement.id}`} className="block group cursor-pointer">
      <Card className="flex flex-col gap-4 hover:shadow-md group-hover:border-accent/30 transition-all duration-200">
        {/* Title & Date Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h3 className="text-xl font-bold font-display text-ink leading-snug tracking-tight group-hover:text-accent transition-colors">
            {announcement.title}
          </h3>
          <div className="flex items-center gap-1.5 shrink-0 text-xs text-ink-muted">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={announcement.date}>
              {formatDate(announcement.date)}
            </time>
          </div>
        </div>

        {/* Body (Truncated with fade cutoff) */}
        <div className="relative overflow-hidden max-h-24 pb-6 font-body text-sm text-ink-muted leading-relaxed whitespace-pre-wrap">
          {announcement.body}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-surface-raised to-transparent pointer-events-none" />
        </div>

        {/* AI Summary Control (Disabled / Coming Soon) & View Details link */}
        <div className="flex items-center justify-between gap-4 mt-2 pt-4 border-t border-ink-muted/10 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-sm bg-ink-muted/5 border border-ink-muted/10 text-ink-muted/50 select-none">
              <Sparkles className="w-3 h-3 text-ink-muted/40" />
              <span>Summarize</span>
            </div>
            <span className="text-xs text-ink-muted/60 italic select-none">
              AI summary — coming soon
            </span>
          </div>

          <span className="text-xs font-semibold text-accent group-hover:underline flex items-center gap-1">
            View Details →
          </span>
        </div>
      </Card>
    </Link>
  );
}
