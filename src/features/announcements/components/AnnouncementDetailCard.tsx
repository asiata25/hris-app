import type { Announcement } from "@/types";
import { Sparkles, Calendar, Tag } from "lucide-react";

interface AnnouncementDetailCardProps {
  announcement: Announcement;
  formatDate: (dateStr: string) => string;
}

export function AnnouncementDetailCard({
  announcement,
  formatDate,
}: AnnouncementDetailCardProps) {
  return (
    <div className="lg:col-span-2 space-y-6 bg-surface-raised rounded-md p-6 md:p-8 border border-ink-muted/10 shadow-sm animate-fadeIn">
      {/* Header Metadata */}
      <div className="flex flex-wrap gap-2 items-center text-xs">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm font-medium bg-accent/10 text-accent font-display">
          <Tag className="w-3.5 h-3.5" />
          {announcement.category}
        </span>
        <span className="text-ink-muted inline-flex items-center gap-1 font-body">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(announcement.date)}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-display text-ink leading-tight tracking-tight">
        {announcement.title}
      </h1>

      {/* Full Body Text */}
      <div className="prose max-w-none text-ink/90 font-body text-base leading-relaxed whitespace-pre-wrap">
        {announcement.body}
      </div>

      {/* AI Summary Block */}
      <div className="mt-8 pt-6 border-t border-ink-muted/10">
        <h4 className="text-sm font-semibold font-display text-ink flex items-center gap-1.5 mb-2">
          <Sparkles className="w-4 h-4 text-accent" />
          AI Assistant tools
        </h4>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-surface p-4 rounded-sm border border-ink-muted/5">
          <button
            disabled
            className="flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-sm bg-ink-muted/5 border border-ink-muted/15 text-ink-muted/50 cursor-not-allowed select-none tracking-wide"
          >
            <Sparkles className="w-3.5 h-3.5 text-ink-muted/40 animate-pulse" />
            Summarize Announcement
          </button>
          <span className="text-xs text-ink-muted italic select-none">
            AI summary is currently coming soon and will be available in the next release.
          </span>
        </div>
      </div>
    </div>
  );
}
