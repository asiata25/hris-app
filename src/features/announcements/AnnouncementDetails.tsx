import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getAnnouncementsFromDb, getEmployeesFromDb } from "@/lib/mockDb";
import type { Announcement, Employee } from "@/types";
import { Calendar, Tag, ArrowLeft, Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { AnnouncementDetailCard } from "./components/AnnouncementDetailCard";
import { OwnerProfileWidget } from "./components/OwnerProfileWidget";

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
        <AnnouncementDetailCard
          announcement={announcement}
          formatDate={formatDate}
        />

        {/* Right Side: Sidebar details */}
        <div className="space-y-6 lg:sticky lg:top-6">
          {/* PIC Contact Card */}
          {pic && <OwnerProfileWidget pic={pic} />}

          {/* Announcement details Card */}
          <Card className="flex flex-col gap-4 border border-ink-muted/10 p-5 shadow-sm">
            <h3 className="text-xs font-bold font-display text-ink-muted uppercase tracking-wider select-none">
              Announcement Info
            </h3>

            <div className="space-y-3 font-body text-xs text-ink">
              <div className="flex justify-between py-1 border-b border-ink-muted/5">
                <span className="text-ink-muted flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Published Date
                </span>
                <span className="font-medium">
                  {formatDate(announcement.date)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-ink-muted/5">
                <span className="text-ink-muted flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  Category
                </span>
                <span className="font-semibold text-accent">
                  {announcement.category}
                </span>
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
