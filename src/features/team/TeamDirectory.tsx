import { useEffect, useState, useMemo } from "react";
import { getEmployeesFromDb } from "@/lib/mockDb";
import type { FilterState } from "@/types";
import { TeamFilters } from "./components/TeamFilters";
import { TeamTable } from "./components/TeamTable";
import { EmptyState } from "./components/EmptyState";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { PageHeader } from "@/components/ui/PageHeader";

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
  }, [mockEmployees]);

  const roles = useMemo(() => {
    return Array.from(new Set(mockEmployees.map((e) => e.role))).sort();
  }, [mockEmployees]);

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
  }, [mockEmployees, filters]);

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      department: "",
      role: "",
      status: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <PageHeader>Team Directory</PageHeader>
        <p className="text-sm text-ink-muted mt-1 font-body">
          View, search, and manage organizational members and their status.
        </p>
      </div>

      {/* Control Bar: Search and Dropdowns */}
      <TeamFilters
        filters={filters}
        setFilters={setFilters}
        departments={departments}
        roles={roles}
      />

      {/* Directory Content Area */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : filteredEmployees.length === 0 ? (
        <EmptyState onClearFilters={clearFilters} />
      ) : (
        <TeamTable employees={filteredEmployees} />
      )}
    </div>
  );
}
