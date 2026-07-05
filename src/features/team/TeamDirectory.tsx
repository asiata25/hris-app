import { useEffect, useState, useMemo } from "react";
import { Search, FilterX } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getEmployeesFromDb } from "@/lib/mockDb";
import type { FilterState } from "@/types";
import { cn } from "@/lib/cn";

export default function TeamDirectory() {
  const mockEmployees = useMemo(() => getEmployeesFromDb(), []);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    department: "",
    role: "",
    status: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fake short loading skeleton on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Compute unique departments and roles from data for dropdown options
  const departments = useMemo(() => {
    return Array.from(new Set(mockEmployees.map((e) => e.department))).sort();
  }, []);

  const roles = useMemo(() => {
    return Array.from(new Set(mockEmployees.map((e) => e.role))).sort();
  }, []);

  // Live filter logic based on controlled input states
  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter((employee) => {
      // 1. Search Query filtering (checks name, role, department)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = employee.name.toLowerCase().includes(query);
        const matchesRole = employee.role.toLowerCase().includes(query);
        const matchesDept = employee.department.toLowerCase().includes(query);
        if (!matchesName && !matchesRole && !matchesDept) {
          return false;
        }
      }

      // 2. Department exact match
      if (filters.department && employee.department !== filters.department) {
        return false;
      }

      // 3. Role exact match
      if (filters.role && employee.role !== filters.role) {
        return false;
      }

      // 4. Status exact match
      if (filters.status && employee.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      department: "",
      role: "",
      status: "",
    });
  };

  // Helper to extract initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Helper to hash initials to a theme-cohesive background color
  const getAvatarBg = (name: string) => {
    const hash = name
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const colors = [
      "bg-accent/15 text-accent border-accent/20",
      "bg-status-present/15 text-status-present border-status-present/20",
      "bg-status-pending/15 text-status-pending border-status-pending/20",
      "bg-status-absent/15 text-status-absent border-status-absent/20",
    ];
    return colors[hash % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-ink leading-tight">
          Team Directory
        </h2>
        <p className="text-sm text-ink-muted mt-1 font-body">
          View, search, and manage organizational members and their status.
        </p>
      </div>

      {/* Control Bar: Search on left (priority) and Dropdowns on right */}
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

      {/* Directory Content Area */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : filteredEmployees.length === 0 ? (
        <EmptyState onClearFilters={clearFilters} />
      ) : (
        <div className="overflow-x-auto rounded-md border border-ink-muted/10 bg-surface-raised shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-ink-muted/10 bg-surface/50 text-[11px] font-bold text-ink-muted tracking-wider uppercase">
                <th className="px-4 py-3.5 font-display select-none">
                  Employee
                </th>
                <th className="px-4 py-3.5 font-display select-none">
                  Department
                </th>
                <th className="px-4 py-3.5 font-display select-none">
                  Contact
                </th>
                <th className="px-4 py-3.5 font-display select-none text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-muted/10 font-body text-sm text-ink">
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-surface/30 transition-colors"
                >
                  {/* Avatar + Stacked Name & Role */}
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border tracking-wider select-none transition-transform hover:scale-105",
                          getAvatarBg(employee.name),
                        )}
                      >
                        {getInitials(employee.name)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-ink leading-snug">
                          {employee.name}
                        </span>
                        <span className="text-xs text-ink-muted font-normal mt-0.5">
                          {employee.role}
                        </span>
                      </div>
                    </div>
                  </td>
                  {/* Department */}
                  <td className="px-4 py-2.5">
                    <span className="font-medium text-ink-muted/80">
                      {employee.department}
                    </span>
                  </td>
                  {/* Contact/Email */}
                  <td className="px-4 py-2.5">
                    <span className="text-ink-muted/80 text-xs font-mono select-all">
                      {employee.email}
                    </span>
                  </td>
                  {/* Status Badge */}
                  <td className="px-4 py-2.5 text-right">
                    <Badge
                      variant={
                        employee.status === "active"
                          ? "present"
                          : employee.status === "inactive"
                            ? "absent"
                            : "pending"
                      }
                    >
                      {employee.status === "active"
                        ? "Active"
                        : employee.status === "inactive"
                          ? "Inactive"
                          : "On Leave"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* Skeleton Loading Component */
function LoadingSkeleton() {
  return (
    <div className="overflow-x-auto rounded-md border border-ink-muted/10 bg-surface-raised">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-ink-muted/10 bg-surface/50 text-[11px] font-bold text-ink-muted tracking-wider uppercase">
            <th className="px-4 py-3.5 font-display">Employee</th>
            <th className="px-4 py-3.5 font-display">Department</th>
            <th className="px-4 py-3.5 font-display">Contact</th>
            <th className="px-4 py-3.5 font-display text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-muted/10 animate-pulse">
          {Array.from({ length: 6 }).map((_, idx) => (
            <tr key={idx} className="bg-surface-raised/40">
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-ink-muted/10" />
                  <div className="space-y-1.5 flex-1 max-w-30">
                    <div className="h-3 bg-ink-muted/10 rounded-sm w-3/4" />
                    <div className="h-2 bg-ink-muted/10 rounded-sm w-1/2" />
                  </div>
                </div>
              </td>
              <td className="px-4 py-2.5">
                <div className="h-3.5 bg-ink-muted/10 rounded-sm w-20" />
              </td>
              <td className="px-4 py-2.5">
                <div className="h-3 bg-ink-muted/10 rounded-sm w-32" />
              </td>
              <td className="px-4 py-2.5 text-right flex justify-end">
                <div className="h-5 bg-ink-muted/10 rounded-sm w-16" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Empty State Component */
interface EmptyStateProps {
  onClearFilters: () => void;
}

function EmptyState({ onClearFilters }: EmptyStateProps) {
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
