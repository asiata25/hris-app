import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Avatar } from "@/components/ui/Avatar";
import { getEmployeesFromDb, getAttendanceFromDb } from "@/lib/mockDb";
import type { Employee, AttendanceRecord } from "@/types";

const TODAY_DATE = "2026-07-05";

export function AttendanceStatusList() {
  const [employees] = useState<Employee[]>(() => getEmployeesFromDb());
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() =>
    getAttendanceFromDb()
  );

  useEffect(() => {
    const syncState = () => {
      setAttendance(getAttendanceFromDb());
    };
    window.addEventListener("storage", syncState);
    const timer = setInterval(syncState, 1000);
    return () => {
      window.removeEventListener("storage", syncState);
      clearInterval(timer);
    };
  }, []);

  const activeEmployees = employees.filter((e) => e.status !== "inactive");

  const getStatusInfo = (emp: Employee) => {
    const record = attendance.find(
      (r) => r.employeeId === emp.id && r.date === TODAY_DATE
    );

    if (record) {
      if (record.status === "present") return { variant: "present" as const, label: "Present" };
      if (record.status === "pending") return { variant: "pending" as const, label: "On Leave" };
      return { variant: "absent" as const, label: "Absent" };
    }

    if (emp.status === "on_leave") {
      return { variant: "pending" as const, label: "On Leave" };
    }

    // Default if not checked in yet and active
    return { variant: "pending" as const, label: "Not In Yet" };
  };

  return (
    <Card className="space-y-4 max-h-[360px] flex flex-col">
      <div className="shrink-0">
        <SectionHeader>Today's Attendance Statuses</SectionHeader>
        <p className="text-xs text-ink-muted font-body mt-1">
          Real-time check-in status of active team members.
        </p>
      </div>

      <ul className="space-y-3 overflow-y-auto pr-1 flex-1">
        {activeEmployees.map((emp) => {
          const status = getStatusInfo(emp);
          return (
            <li
              key={emp.id}
              className="flex items-center justify-between py-1.5 border-b border-ink-muted/5 last:border-0"
            >
              <div className="flex items-center gap-2.5">
                <Avatar name={emp.name} size="sm" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-ink leading-tight">
                    {emp.name}
                  </span>
                  <span className="text-[11px] text-ink-muted">
                    {emp.role}
                  </span>
                </div>
              </div>
              <Badge variant={status.variant}>{status.label}</Badge>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
