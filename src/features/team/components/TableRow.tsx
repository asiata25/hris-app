import type { Employee } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";

interface TableRowProps {
  employee: Employee;
}

export function TableRow({ employee }: TableRowProps) {
  const badgeVariant =
    employee.status === "active"
      ? ("present" as const)
      : employee.status === "inactive"
        ? ("absent" as const)
        : ("pending" as const);

  const badgeLabel =
    employee.status === "active"
      ? "Active"
      : employee.status === "inactive"
        ? "Inactive"
        : "On Leave";

  return (
    <tr className="hover:bg-surface/30 transition-colors">
      {/* Avatar + Stacked Name & Role */}
      <td className="px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Avatar name={employee.name} size="sm" />
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

      {/* Contact/Email with ellipsis truncation & hover tooltip */}
      <td className="px-4 py-2.5 max-w-50">
        <span
          className="text-ink-muted/80 text-xs font-mono select-all truncate block"
          title={employee.email}
        >
          {employee.email}
        </span>
      </td>

      {/* Status Badge */}
      <td className="px-4 py-2.5 text-right">
        <Badge variant={badgeVariant}>{badgeLabel}</Badge>
      </td>
    </tr>
  );
}
