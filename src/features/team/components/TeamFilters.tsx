import { Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { FilterState } from "@/types";

interface TeamFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  departments: string[];
  roles: string[];
}

export function TeamFilters({
  filters,
  setFilters,
  departments,
  roles,
}: TeamFiltersProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
        {/* Search Input takes visual priority */}
        <div className="relative grow">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4.5 w-4.5 text-ink-muted" />
          </span>
          <input
            type="text"
            placeholder="Search by name, role, or department..."
            value={filters.searchQuery}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
            }
            className="w-full pl-10 pr-4 py-2 border border-ink-muted/15 rounded-sm bg-surface text-ink text-sm font-body placeholder-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          />
        </div>

        {/* Department, Role, and Status Dropdowns */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3">
          <select
            value={filters.department}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, department: e.target.value }))
            }
            className="w-full sm:w-auto px-3.5 py-2 border border-ink-muted/15 rounded-sm bg-surface text-ink text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer transition-all"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={filters.role}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, role: e.target.value }))
            }
            className="w-full sm:w-auto px-3.5 py-2 border border-ink-muted/15 rounded-sm bg-surface text-ink text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer transition-all"
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
            className="w-full sm:w-auto px-3.5 py-2 border border-ink-muted/15 rounded-sm bg-surface text-ink text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer transition-all"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on_leave">On Leave</option>
          </select>
        </div>
      </div>
    </Card>
  );
}
