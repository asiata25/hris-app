import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function AttendanceStatusCard() {
  return (
    <Card className="space-y-4">
      <h3 className="font-display font-bold text-base text-ink">
        Attendance Statuses
      </h3>
      <p className="text-xs text-ink-muted font-body">
        Token-driven `Badge` components mapping opacity-muted status colors:
      </p>

      <ul className="space-y-3 pt-2 font-body text-sm text-ink">
        <li className="flex items-center justify-between">
          <span>Johannes Kepler</span>
          <Badge variant="present">Present</Badge>
        </li>
        <li className="flex items-center justify-between">
          <span>Arlene McCoy</span>
          <Badge variant="absent">Absent</Badge>
        </li>
        <li className="flex items-center justify-between">
          <span>Albert Flores</span>
          <Badge variant="pending">Pending</Badge>
        </li>
      </ul>
    </Card>
  );
}
