import type { Employee } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { getInitials, getAvatarBg } from "@/utils/helpers";

interface TeamTableProps {
  employees: Employee[];
}

export function TeamTable({ employees }: TeamTableProps) {
  return (
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
          {employees.map((employee) => (
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
  );
}
