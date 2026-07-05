import { FilterX } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center justify-center p-8 text-center space-y-4 max-w-md mx-auto mt-6 animate-fadeIn">
      <div className="w-12 h-12 rounded-full bg-ink-muted/10 flex items-center justify-center text-ink-muted">
        <FilterX className="w-5 h-5" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display font-bold text-base text-ink">
          No employees match this search
        </h3>
        <p className="text-xs text-ink-muted font-body max-w-70 mx-auto">
          Try expanding your search query or changing your department, role, or
          status filters.
        </p>
      </div>
      <Button variant="secondary" size="sm" onClick={onClearFilters}>
        Clear filters
      </Button>
    </Card>
  );
}
