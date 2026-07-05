import { Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { InputField } from "@/components/ui/InputField";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
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
  const deptOptions = [
    { value: "", label: "All Departments" },
    ...departments.map((d) => ({ value: d, label: d })),
  ];

  const roleOptions = [
    { value: "", label: "All Roles" },
    ...roles.map((r) => ({ value: r, label: r })),
  ];

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "on_leave", label: "On Leave" },
  ];

  return (
    <Card className="p-4 animate-fadeIn">
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
        {/* Search Input */}
        <div className="relative grow">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
            <Search className="h-4.5 w-4.5 text-ink-muted" />
          </span>
          <InputField
            type="text"
            placeholder="Search by name, role, or department..."
            value={filters.searchQuery}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
            }
            className="pl-10"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
          <SelectDropdown
            value={filters.department}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, department: e.target.value }))
            }
            options={deptOptions}
            className="min-w-40"
          />

          <SelectDropdown
            value={filters.role}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, role: e.target.value }))
            }
            options={roleOptions}
            className="min-w-40"
          />

          <SelectDropdown
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
            options={statusOptions}
            className="min-w-35"
          />
        </div>
      </div>
    </Card>
  );
}
