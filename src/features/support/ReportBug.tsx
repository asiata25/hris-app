import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { InputField } from "@/components/ui/InputField";
import { TextArea } from "@/components/ui/TextArea";
import { FileUpload } from "@/components/ui/FileUpload";
import { SeveritySelector, type Severity } from "./components/SeveritySelector";
import {
  Bug,
  AlertTriangle,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function ReportBug() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<Severity>("medium");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Drag and drop mock files
  const [attachments, setAttachments] = useState<
    { name: string; size: string }[]
  >([]);

  const severityConfigs = {
    low: {
      label: "Low",
      variant: "present" as const,
      desc: "Minor UI glitch or formatting issue",
    },
    medium: {
      label: "Medium",
      variant: "pending" as const,
      desc: "Feature behaves unexpectedly but has workaround",
    },
    high: {
      label: "High",
      variant: "absent" as const,
      desc: "Core feature broken or unusable",
    },
    critical: {
      label: "Critical",
      variant: "absent" as const,
      desc: "Application crash, data loss, or security issue",
    },
  };

  const handleAddFiles = (newFiles: { name: string; size: string }[]) => {
    setAttachments((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Generate a random bug tracker ID
      const randomId = "BUG-" + Math.floor(10000 + Math.random() * 90000);
      setSubmittedId(randomId);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-surface-raised p-6 rounded-md border border-ink-muted/10">
        <PageHeader className="flex items-center gap-2">
          <Bug className="w-6 h-6 text-accent animate-pulse" />
          Report a Portal Bug
        </PageHeader>
        <p className="text-ink-muted font-body text-sm mt-1">
          Spotted an error, lag, or incorrect calculation? Describe the behavior
          and submit a report to help us improve.
        </p>
      </div>

      {submittedId ? (
        <Card className="flex flex-col items-center justify-center text-center py-16 px-6 max-w-2xl mx-auto space-y-6 animate-fadeIn">
          <div className="w-16 h-16 bg-status-present/10 rounded-full flex items-center justify-center text-status-present">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-3">
            <h3 className="font-display font-bold text-2xl text-ink">
              Bug Report Submitted
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed font-body">
              Thank you for reporting this issue. A tracking ticket has been
              created and assigned to our platform engineering squad.
            </p>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-surface border border-ink-muted/10 rounded-md mt-2">
              <span className="text-xs text-ink-muted font-mono font-medium select-none">
                Ticket ID:
              </span>
              <span className="text-sm text-accent font-mono font-bold tracking-wider select-all">
                {submittedId}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate("/")}
              className="w-full sm:w-auto font-semibold"
            >
              Back to Dashboard
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setSubmittedId(null);
                setTitle("");
                setDescription("");
                setSteps("");
                setAttachments([]);
              }}
              className="w-full sm:w-auto font-semibold"
            >
              Report Another Bug
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Instructions Column */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-5 space-y-4">
              <h3 className="font-display font-bold text-base text-ink flex items-center gap-2 select-none">
                <AlertTriangle className="w-4.5 h-4.5 text-status-pending" />
                Guidelines
              </h3>
              <ul className="text-xs text-ink-muted space-y-2.5 list-disc list-inside font-body">
                <li>
                  Check if the bug disappears after performing a page reload.
                </li>
                <li>
                  Provide specific actions that lead to the incorrect behavior.
                </li>
                <li>
                  Low/Medium severity covers cosmetic and minor UI workflow
                  problems.
                </li>
                <li>
                  High/Critical levels are for failures blocking work
                  operations.
                </li>
                <li>Attach a screenshot if the glitch is visual in nature.</li>
              </ul>
            </Card>

            <div className="bg-surface-raised border border-ink-muted/10 p-5 rounded-md space-y-3">
              <h4 className="text-xs font-semibold text-ink uppercase tracking-wider select-none">
                Bug Resolution Times
              </h4>
              <div className="space-y-2 font-body text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">Critical Issues:</span>
                  <span className="font-semibold text-status-absent">
                    &lt; 4 hours
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">High Issues:</span>
                  <span className="font-semibold text-status-absent">
                    &lt; 24 hours
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">Medium & Low:</span>
                  <span className="font-semibold text-ink-muted">
                    Next release cycle
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Bug Title */}
                <InputField
                  id="title"
                  label="Issue Title / Short Description"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Leave balance displays NaN for Annual Leave"
                />

                {/* Severity Selection */}
                <SeveritySelector
                  severity={severity}
                  onChange={setSeverity}
                  configs={severityConfigs}
                />

                {/* Bug Description */}
                <TextArea
                  id="desc"
                  label="What happens? (Observed Behavior)"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Describe what occurred, and what you expected to see instead..."
                />

                {/* Steps to Reproduce */}
                <div className="space-y-1.5 w-full">
                  <label
                    htmlFor="steps"
                    className="text-xs font-semibold text-ink mb-1.5 flex items-center gap-1 select-none font-body"
                  >
                    <Terminal className="w-3.5 h-3.5 text-ink-muted" />
                    Steps to Reproduce (Optional)
                  </label>
                  <textarea
                    id="steps"
                    rows={3}
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    placeholder="1. Navigate to 'Leave' dashboard&#10;2. Click on 'Annual Leave' progress bar&#10;3. Observe NaN showing..."
                    className="w-full bg-surface border border-ink-muted/20 text-ink rounded-sm px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-accent placeholder-ink-muted/40 font-mono text-xs resize-none"
                  />
                </div>

                {/* Mock Screenshot Uploader */}
                <FileUpload
                  label="Attach Screenshot (Mock)"
                  attachments={attachments}
                  onAddFiles={handleAddFiles}
                  onRemoveFile={handleRemoveFile}
                />

                {/* Submit button */}
                <div className="flex justify-end pt-2 border-t border-ink-muted/10">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !title || !description}
                    className="w-full sm:w-auto px-5 py-2.5 gap-2 font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting Report...</span>
                      </>
                    ) : (
                      <>
                        <Bug className="w-4 h-4" />
                        <span>Submit Bug Report</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
