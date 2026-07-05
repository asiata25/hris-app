import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Bug,
  AlertTriangle,
  Upload,
  X,
  CheckCircle2,
  FileImage,
  Terminal,
} from "lucide-react";
import { useNavigate } from "react-router";

type Severity = "low" | "medium" | "high" | "critical";

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
  const [isDragOver, setIsDragOver] = useState(false);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: (f.size / 1024).toFixed(1) + " KB",
      }));
      setAttachments((prev) => [...prev, ...filesArr]);
    }
  };

  const removeAttachment = (index: number) => {
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
        <h2 className="text-2xl font-bold font-display text-ink flex items-center gap-2">
          <Bug className="w-6 h-6 text-accent animate-pulse" />
          Report a Portal Bug
        </h2>
        <p className="text-ink-muted font-body text-sm mt-1">
          Spotted an error, lag, or incorrect calculation? Describe the behavior
          and submit a report to help us improve.
        </p>
      </div>

      {submittedId ? (
        <Card className="flex flex-col items-center justify-center text-center py-16 px-6 max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 bg-status-present/10 rounded-full flex items-center justify-center text-status-present">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-3">
            <h3 className="font-display font-bold text-2xl text-ink">
              Bug Report Submitted
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              Thank you for reporting this issue. A tracking ticket has been
              created and assigned to our platform engineering squad.
            </p>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-surface border border-ink-muted/10 rounded-md mt-2">
              <span className="text-xs text-ink-muted font-mono font-medium">
                Ticket ID:
              </span>
              <span className="text-sm text-accent font-mono font-bold tracking-wider">
                {submittedId}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate("/")}
              className="w-full sm:w-auto"
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
              className="w-full sm:w-auto"
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
              <h3 className="font-display font-bold text-base text-ink flex items-center gap-2">
                <AlertTriangle className="w-4.5 h-4.5 text-status-pending" />
                Guidelines
              </h3>
              <ul className="text-xs text-ink-muted space-y-2.5 list-disc list-inside">
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
              <h4 className="text-xs font-semibold text-ink uppercase tracking-wider">
                Bug Resolution Times
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-muted">Critical Issues:</span>
                  <span className="font-semibold text-status-absent">
                    &lt; 4 hours
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-muted">High Issues:</span>
                  <span className="font-semibold text-status-absent">
                    &lt; 24 hours
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
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
                <div>
                  <label
                    htmlFor="title"
                    className="text-xs font-semibold text-ink block mb-1.5"
                  >
                    Issue Title / Short Description
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="e.g. Leave balance displays NaN for Annual Leave"
                    className="w-full bg-surface border border-ink-muted/20 text-ink rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent placeholder-ink-muted/40 font-body"
                  />
                </div>

                {/* Severity Selection */}
                <div>
                  <label className="text-xs font-semibold text-ink block mb-2">
                    Severity Level
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(Object.keys(severityConfigs) as Severity[]).map(
                      (level) => {
                        const cfg = severityConfigs[level];
                        const isSelected = severity === level;
                        return (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setSeverity(level)}
                            className={`p-3 rounded-sm border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                              isSelected
                                ? "bg-accent/5 border-accent shadow-sm"
                                : "bg-surface-raised border-ink-muted/15 hover:bg-surface/50"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-xs font-bold text-ink uppercase tracking-wide">
                                {cfg.label}
                              </span>
                              <Badge variant={cfg.variant}>
                                {level === "low" || level === "medium"
                                  ? "Standard"
                                  : "Priority"}
                              </Badge>
                            </div>
                            <span className="text-[11px] text-ink-muted leading-tight">
                              {cfg.desc}
                            </span>
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>

                {/* Bug Description */}
                <div>
                  <label
                    htmlFor="desc"
                    className="text-xs font-semibold text-ink block mb-1.5"
                  >
                    What happens? (Observed Behavior)
                  </label>
                  <textarea
                    id="desc"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Describe what occurred, and what you expected to see instead..."
                    className="w-full bg-surface border border-ink-muted/20 text-ink rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent placeholder-ink-muted/40 font-body resize-none"
                  />
                </div>

                {/* Steps to Reproduce */}
                <div>
                  <label
                    htmlFor="steps"
                    className="text-xs font-semibold text-ink mb-1.5 flex items-center gap-1"
                  >
                    <Terminal className="w-3.5 h-3.5 text-ink-muted" />
                    Steps to Reproduce (Optional)
                  </label>
                  <textarea
                    id="steps"
                    rows={3}
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    placeholder="1. Navigate to 'Leave' dashboard&#10;2. Click on 'Annual Leave' progress bar&#10;3. ObserveNaN showing..."
                    className="w-full bg-surface border border-ink-muted/20 text-ink rounded-sm px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-accent placeholder-ink-muted/40 font-mono text-xs resize-none"
                  />
                </div>

                {/* Mock Screenshot Uploader */}
                <div>
                  <label className="text-xs font-semibold text-ink block mb-1.5">
                    Attach Screenshot (Mock)
                  </label>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      if (e.dataTransfer.files) {
                        const filesArr = Array.from(e.dataTransfer.files).map(
                          (f) => ({
                            name: f.name,
                            size: (f.size / 1024).toFixed(1) + " KB",
                          }),
                        );
                        setAttachments((prev) => [...prev, ...filesArr]);
                      }
                    }}
                    className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-all duration-200 ${
                      isDragOver
                        ? "border-accent bg-accent/5"
                        : "border-ink-muted/25 hover:border-ink-muted/40 bg-surface/10"
                    }`}
                  >
                    <input
                      type="file"
                      id="screenshot"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="screenshot"
                      className="cursor-pointer block space-y-2"
                    >
                      <Upload className="w-8 h-8 text-ink-muted/60 mx-auto" />
                      <div>
                        <span className="text-xs font-semibold text-accent hover:underline">
                          Click to upload
                        </span>
                        <span className="text-xs text-ink-muted">
                          {" "}
                          or drag & drop files here
                        </span>
                      </div>
                      <p className="text-[10px] text-ink-muted/65">
                        Supports PNG, JPG, or WEBP up to 5MB (Simulated)
                      </p>
                    </label>
                  </div>

                  {/* Attachment List */}
                  {attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2.5 bg-surface border border-ink-muted/10 rounded-sm text-xs"
                        >
                          <div className="flex items-center gap-2 text-ink">
                            <FileImage className="w-4 h-4 text-accent shrink-0" />
                            <span className="truncate font-medium max-w-xs">
                              {file.name}
                            </span>
                            <span className="text-[10px] text-ink-muted">
                              ({file.size})
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-ink-muted hover:text-status-absent cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-2 border-t border-ink-muted/10">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !title || !description}
                    className="w-full sm:w-auto px-5 py-2.5 gap-2"
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
