import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getAnnouncementsFromDb, getEmployeesFromDb } from "@/lib/mockDb";
import type { Announcement, Employee } from "@/types";
import { Sparkles, Calendar, Tag, ArrowLeft, Mail, Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getInitials, getAvatarBg } from "@/utils/helpers";

export default function AnnouncementDetails() {
  const { id } = useParams<{ id: string }>();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [pic, setPic] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const announcements = getAnnouncementsFromDb();
    const found = announcements.find((a) => a.id === id) || null;
    setAnnouncement(found);

    if (found) {
      const employees = getEmployeesFromDb();
      const author = employees.find((e) => e.id === found.authorId) || null;
      setPic(author);
    }
    setIsLoading(false);
  }, [id]);

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

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-6 px-4 animate-pulse">
        <div className="h-4 bg-ink-muted/10 rounded w-24 mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 bg-ink-muted/10 rounded w-3/4"></div>
            <div className="h-4 bg-ink-muted/10 rounded w-1/4"></div>
            <div className="space-y-2 pt-4">
              <div className="h-4 bg-ink-muted/10 rounded w-full"></div>
              <div className="h-4 bg-ink-muted/10 rounded w-full"></div>
              <div className="h-4 bg-ink-muted/10 rounded w-5/6"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-32 bg-ink-muted/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold font-display text-ink mb-2">
          Announcement Not Found
        </h2>
        <p className="text-ink-muted mb-6">
          The announcement you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/announcements"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to announcements
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-4 px-2 space-y-6 animate-fadeIn">
      {/* Back navigation */}
      <div>
        <Link
          to="/announcements"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-ink transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Announcements</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Article Content */}
        <div className="lg:col-span-2 space-y-6 bg-surface-raised rounded-md p-6 md:p-8 border border-ink-muted/10 shadow-sm">
          {/* Header Metadata (Mobile PIC representation / category) */}
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

          {/* AI Summary Block (Disabled placeholder) */}
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

        {/* Right Side: Sidebar details */}
        <div className="space-y-6 lg:sticky lg:top-6">
          {/* PIC Contact Card */}
          {pic && (
            <Card className="flex flex-col gap-5 border border-ink-muted/10 p-5 shadow-sm">
              <div>
                <h3 className="text-xs font-bold font-display text-ink-muted uppercase tracking-wider mb-3">
                  Person in Charge (PIC)
                </h3>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border tracking-wider select-none ${getAvatarBg(pic.name)}`}
                  >
                    {getInitials(pic.name)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold font-body text-base text-ink leading-tight">
                      {pic.name}
                    </span>
                    <span className="text-xs font-body text-ink-muted mt-1 leading-none">
                      {pic.role}
                    </span>
                    <span className="text-xs font-body font-medium text-accent mt-0.5">
                      {pic.department} Department
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-ink-muted/10 pt-4">
                <a
                  href={`mailto:${pic.email}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-sm bg-accent text-white hover:bg-accent/90 transition-colors shadow-sm shadow-accent/15 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email PIC</span>
                </a>
              </div>
            </Card>
          )}

          {/* Announcement details Card */}
          <Card className="flex flex-col gap-4 border border-ink-muted/10 p-5 shadow-sm">
            <h3 className="text-xs font-bold font-display text-ink-muted uppercase tracking-wider">
              Announcement Info
            </h3>
            
            <div className="space-y-3 font-body text-xs text-ink">
              <div className="flex justify-between py-1 border-b border-ink-muted/5">
                <span className="text-ink-muted flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Published Date
                </span>
                <span className="font-medium">{formatDate(announcement.date)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-ink-muted/5">
                <span className="text-ink-muted flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  Category
                </span>
                <span className="font-semibold text-accent">{announcement.category}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-ink-muted flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Reference ID
                </span>
                <span className="font-mono text-[10px] text-ink-muted bg-surface px-1.5 py-0.5 rounded-sm select-all">
                  {announcement.id}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
