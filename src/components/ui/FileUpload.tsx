import { useState } from "react";
import { Upload, FileImage, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface FileUploadProps {
  label?: string;
  attachments: { name: string; size: string }[];
  onAddFiles: (files: { name: string; size: string }[]) => void;
  onRemoveFile: (index: number) => void;
  accept?: string;
}

export function FileUpload({
  label,
  attachments,
  onAddFiles,
  onRemoveFile,
  accept = "image/*",
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: (f.size / 1024).toFixed(1) + " KB",
      }));
      onAddFiles(filesArr);
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="text-xs font-semibold text-ink block mb-1.5 select-none">
          {label}
        </label>
      )}
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
            const filesArr = Array.from(e.dataTransfer.files).map((f) => ({
              name: f.name,
              size: (f.size / 1024).toFixed(1) + " KB",
            }));
            onAddFiles(filesArr);
          }
        }}
        className={cn(
          "border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-all duration-200",
          isDragOver
            ? "border-accent bg-accent/5"
            : "border-ink-muted/25 hover:border-ink-muted/40 bg-surface/10"
        )}
      >
        <input
          type="file"
          id="screenshot-upload"
          multiple
          accept={accept}
          onChange={handleFileUpload}
          className="hidden"
        />
        <label
          htmlFor="screenshot-upload"
          className="cursor-pointer block space-y-2"
        >
          <Upload className="w-8 h-8 text-ink-muted/60 mx-auto animate-bounce" style={{ animationDuration: "3s" }} />
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

      {attachments.length > 0 && (
        <div className="mt-3 space-y-2">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2.5 bg-surface border border-ink-muted/10 rounded-sm text-xs"
            >
              <div className="flex items-center gap-2 text-ink">
                <FileImage className="w-4 h-4 text-accent shrink-0 animate-fadeIn" />
                <span className="truncate font-medium max-w-xs">
                  {file.name}
                </span>
                <span className="text-[10px] text-ink-muted">({file.size})</span>
              </div>
              <button
                type="button"
                onClick={() => onRemoveFile(index)}
                className="text-ink-muted hover:text-status-absent cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
