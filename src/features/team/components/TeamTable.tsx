import type { Employee } from "@/types";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

interface TeamTableProps {
  employees: Employee[];
}

export function TeamTable({ employees }: TeamTableProps) {
  const headers = ["Employee", "Department", "Contact", "Status"];

  return (
    <div className="overflow-x-auto rounded-md border border-ink-muted/10 bg-surface-raised shadow-sm animate-fadeIn">
      <table className="w-full border-collapse text-left">
        <TableHeader headers={headers} />
        <tbody className="divide-y divide-ink-muted/10 font-body text-sm text-ink">
          {employees.map((employee) => (
            <TableRow key={employee.id} employee={employee} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
