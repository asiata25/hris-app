import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { FileText, Printer, Scale, ShieldCheck, Lock, Eye, FileSignature } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Tab = "privacy" | "terms";

export default function PrivacyTerms() {
  const [activeTab, setActiveTab] = useState<Tab>("privacy");
  const [searchQuery, setSearchQuery] = useState("");

  const privacySections = [
    {
      id: "data-collection",
      title: "1. Information We Collect",
      icon: Eye,
      content: "We collect information necessary to manage payroll, attendance, benefits, and performance assessments. This includes identification details, work history, biometric logging times (if applicable), and system access logs to ensure workspace security and policy compliance.",
    },
    {
      id: "data-use",
      title: "2. How We Use Information",
      icon: Lock,
      content: "Employee data is strictly used for internal HR administration, organizational planning, directory listing within the employee dashboard, workflow automation, and complying with statutory obligations. We do not sell or monetize employee information to third parties.",
    },
    {
      id: "security",
      title: "3. Data Security Measures",
      icon: ShieldCheck,
      content: "All employee dashboard operations use encrypted connections (HTTPS/TLS) and role-based access control. Sensitive personal records are stored with database-level encryption. Access is restricted to authorized HR personnel and direct managers according to the principle of least privilege.",
    },
    {
      id: "retention",
      title: "4. Retention and Deletion",
      icon: Scale,
      content: "HR records are kept for the duration of employment plus the statutory period required by local labor regulations. Inactive employee profiles are archived, and logs are automatically anonymized or purged after 12 months unless otherwise required by legal holds.",
    },
  ];

  const termsSections = [
    {
      id: "usage",
      title: "1. Acceptable Use Policy",
      icon: FileSignature,
      content: "The Labourlink Employee Dashboard is an internal tool provided for official business use. Unauthorized attempts to bypass role authorization, scrape coworker contact directory information, modify attendance logs without approval, or inject code will lead to immediate disciplinary actions.",
    },
    {
      id: "auth",
      title: "2. Account Credentials & Security",
      icon: Lock,
      content: "Employees must maintain strict confidentiality of their single sign-on (SSO) credentials. Under no circumstances should dashboard access tokens or passwords be shared. Notify IT support immediately if you suspect credential compromise.",
    },
    {
      id: "monitoring",
      title: "3. System Performance & Monitoring",
      icon: Eye,
      content: "To guarantee portal availability and security, IT administration monitors page response metrics, system usage patterns, and access attempts. Use of this application constitutes consent to standard session logging.",
    },
  ];

  const currentSections = activeTab === "privacy" ? privacySections : termsSections;
  const filteredSections = currentSections.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header card with action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-raised p-6 rounded-md border border-ink-muted/10">
        <div>
          <h2 className="text-2xl font-bold font-display text-ink flex items-center gap-2">
            <Scale className="w-6 h-6 text-accent" />
            Legal & Compliance Center
          </h2>
          <p className="text-ink-muted font-body text-sm mt-1">
            Review the privacy policy and terms of service governing the Labourlink HR portal.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            Print Copy
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Navigation Sidebar & Filter */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-2">
                Document Select
              </label>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => {
                    setActiveTab("privacy");
                    setSearchQuery("");
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "privacy"
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-ink-muted hover:bg-surface/50 hover:text-ink"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Privacy Policy
                </button>
                <button
                  onClick={() => {
                    setActiveTab("terms");
                    setSearchQuery("");
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "terms"
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-ink-muted hover:bg-surface/50 hover:text-ink"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Terms of Service
                </button>
              </div>
            </div>

            <div className="border-t border-ink-muted/10 pt-4">
              <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-2">
                Search Sections
              </label>
              <input
                type="text"
                placeholder="Find keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-ink-muted/20 text-ink rounded-sm px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-accent placeholder-ink-muted/50"
              />
            </div>

            {/* Quick anchors */}
            <div className="border-t border-ink-muted/10 pt-4 hidden lg:block">
              <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-2">
                Section Index
              </label>
              <div className="space-y-2">
                {currentSections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block text-xs text-ink-muted hover:text-accent hover:underline truncate"
                  >
                    {sec.title}
                  </a>
                ))}
              </div>
            </div>
          </Card>

          <div className="bg-accent/5 rounded-md p-4 border border-accent/10 text-xs text-ink-muted space-y-2">
            <span className="font-semibold text-accent block">Last Updated</span>
            <span>June 15, 2026</span>
            <span className="block border-t border-ink-muted/10 pt-2">
              For compliance questions, contact the HR legal desk at{" "}
              <a href="mailto:compliance@labourlink.com" className="text-accent underline hover:text-accent/80">
                compliance@labourlink.com
              </a>
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-4">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => {
              const SecIcon = section.icon;
              return (
                <Card key={section.id} id={section.id} className="p-6 scroll-mt-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 border-b border-ink-muted/10 pb-3 mb-4">
                    <div className="w-8 h-8 rounded-sm bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <SecIcon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-ink">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-ink-muted font-body text-sm leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </Card>
              );
            })
          ) : (
            <Card className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 bg-surface flex items-center justify-center rounded-full text-ink-muted/50 mb-3 border border-ink-muted/10">
                <FileText className="w-6 h-6" />
              </div>
              <p className="font-semibold text-ink">No matching sections found</p>
              <p className="text-xs text-ink-muted mt-1 max-w-md">
                Try searching for simple words like "data", "retention", "security" or clear search filter to view all topics.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
