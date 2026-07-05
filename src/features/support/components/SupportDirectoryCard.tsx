import { Card } from "@/components/ui/Card";
import { Mail, Phone, MessageSquare, Copy, Check } from "lucide-react";

interface SupportChannel {
  title: string;
  description: string;
  email: string;
  phone: string;
  slack: string;
}

interface SupportDirectoryCardProps {
  channel: SupportChannel;
  copiedEmail: string | null;
  onCopy: (email: string) => void;
}

export function SupportDirectoryCard({
  channel,
  copiedEmail,
  onCopy,
}: SupportDirectoryCardProps) {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow space-y-4 animate-fadeIn">
      <div>
        <h4 className="font-display font-bold text-base text-ink">
          {channel.title}
        </h4>
        <p className="text-xs text-ink-muted mt-1 leading-relaxed">
          {channel.description}
        </p>
      </div>

      <div className="space-y-2 border-t border-ink-muted/10 pt-3">
        {/* Email line */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-ink-muted">
            <Mail className="w-3.5 h-3.5" />
            <span className="truncate">{channel.email}</span>
          </div>
          <button
            onClick={() => onCopy(channel.email)}
            className="text-accent hover:text-accent/80 font-medium flex items-center gap-1 cursor-pointer shrink-0 ml-2"
          >
            {copiedEmail === channel.email ? (
              <>
                <Check className="w-3 h-3 text-status-present" />
                <span className="text-status-present font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Phone line */}
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <Phone className="w-3.5 h-3.5" />
          <span>{channel.phone}</span>
        </div>

        {/* Slack line */}
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>
            Slack channel:{" "}
            <span className="font-semibold text-accent">{channel.slack}</span>
          </span>
        </div>
      </div>
    </Card>
  );
}
