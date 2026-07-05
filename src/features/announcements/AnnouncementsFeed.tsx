import { getAnnouncementsFromDb } from "@/lib/mockDb";
import type { Announcement } from "@/types";
import { Megaphone } from "lucide-react";
import { useEffect, useState } from "react";
import { AnnouncementCard } from "./components/AnnouncementCard";

export default function AnnouncementsFeed() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    // Load announcements from database
    const loadedAnnouncements = getAnnouncementsFromDb();
    // Sort: newest dates first
    const sorted = [...loadedAnnouncements].sort((a, b) =>
      b.date.localeCompare(a.date),
    );
    setAnnouncements(sorted);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="border-b border-ink-muted/10 pb-6">
        <div className="flex items-center gap-3 text-accent mb-2">
          <Megaphone className="w-6 h-6 shrink-0" />
          <span className="text-sm font-semibold tracking-wider uppercase font-display">
            Company Bulletin
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display text-ink tracking-tight">
          What's Happening at Labourlink
        </h1>
        <p className="mt-3 text-base text-ink-muted leading-relaxed font-body max-w-2xl">
          Your central source for project news, policy updates, social events,
          and notices. Feel free to browse, catch up, and stay connected with
          the team.
        </p>
      </div>

      {/* Main News Feed Stack */}
      {announcements.length > 0 ? (
        <div className="space-y-8">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-surface-raised border border-ink-muted/10 rounded-md p-8">
          <div className="w-12 h-12 rounded-full bg-ink-muted/10 flex items-center justify-center mb-4">
            <Megaphone className="w-6 h-6 text-ink-muted/60" />
          </div>
          <h3 className="text-lg font-semibold font-display text-ink mb-1">
            No announcements yet
          </h3>
          <p className="text-sm text-ink-muted max-w-xs font-body">
            Check back later for important company news and bulletin updates.
          </p>
        </div>
      )}
    </div>
  );
}
