import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { InputField } from "@/components/ui/InputField";
import { TextArea } from "@/components/ui/TextArea";
import { SupportDirectoryCard } from "./components/SupportDirectoryCard";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [category, setCategory] = useState("General Support");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const contactChannels = [
    {
      title: "Human Resources Desk",
      description:
        "For leaves, payroll, benefits, policy clarifications, or career growth inquiries.",
      email: "hr.support@labourlink.com",
      phone: "+1 (555) 234-5678",
      slack: "#hr-portal",
    },
    {
      title: "IT Support Helpdesk",
      description:
        "For single sign-on (SSO), credential recovery, laptop provisioning, or hardware issues.",
      email: "it.helpdesk@labourlink.com",
      phone: "+1 (555) 876-5432",
      slack: "#it-support",
    },
  ];

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setSubject("");
      setMessage("");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-surface-raised p-6 rounded-md border border-ink-muted/10">
        <PageHeader className="flex items-center gap-2">
          <Mail className="w-6 h-6 text-accent" />
          Contact Support Directory
        </PageHeader>
        <p className="text-ink-muted font-body text-sm mt-1">
          Have questions or need assistance? Reach out to our dedicated
          operations teams or submit an inquiry form below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* Contact Channels */}
        <div className="lg:col-span-2 space-y-4">
          {contactChannels.map((channel) => (
            <SupportDirectoryCard
              key={channel.title}
              channel={channel}
              copiedEmail={copiedEmail}
              onCopy={handleCopy}
            />
          ))}

          {/* Headquarters Info */}
          <Card className="p-4 bg-surface/30 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-ink-muted mt-0.5 shrink-0" />
              <div>
                <h5 className="text-xs font-semibold text-ink select-none">
                  Headquarters Location
                </h5>
                <p className="text-[11px] text-ink-muted mt-0.5 leading-relaxed font-body">
                  Labourlink HQ — Operations Floor 4
                  <br />
                  100 Innovation Way, Suite 400
                  <br />
                  Tech District, SF 94107
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-3">
          {isSuccess ? (
            <Card className="flex flex-col items-center justify-center text-center py-16 px-6 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-status-present/10 rounded-full flex items-center justify-center text-status-present animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="font-display font-bold text-xl text-ink">
                  Message Submitted Successfully
                </h3>
                <p className="text-sm text-ink-muted font-body">
                  Your inquiry has been logged in our HR operations queue. A
                  representative will respond to your registered work email
                  within 1-2 business days.
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsSuccess(false)}
                className="mt-2 text-xs font-semibold"
              >
                Send Another Message
              </Button>
            </Card>
          ) : (
            <Card className="p-6">
              <h3 className="font-display font-bold text-lg text-ink mb-4 pb-2 border-b border-ink-muted/10 select-none">
                Submit Helpdesk Inquiry
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Select */}
                <div>
                  <label className="text-xs font-semibold text-ink block mb-1.5 select-none">
                    Assistance Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      "General Support",
                      "HR Inquiry",
                      "IT Support",
                      "Payroll/Benefits",
                    ].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`px-3 py-2 rounded-sm text-xs font-medium border text-center transition-all cursor-pointer ${
                          category === cat
                            ? "bg-accent text-white border-accent shadow-sm shadow-accent/15"
                            : "bg-surface-raised border-ink-muted/15 text-ink hover:bg-surface/50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject Input */}
                <InputField
                  id="subject"
                  label="Subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="Brief summary of your inquiry..."
                />

                {/* Message Input */}
                <TextArea
                  id="message"
                  label="Message Body"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Detail your request or issue..."
                />

                {/* Submit button */}
                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !subject || !message}
                    className="w-full sm:w-auto px-5 py-2.5 gap-2 font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
