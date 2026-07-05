import { useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useAttendance } from "@/hooks/useAttendance";
import { getEmployeesFromDb } from "@/lib/mockDb";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export function DashboardCharts() {
  const { attendance } = useAttendance();
  const employees = useMemo(() => getEmployeesFromDb(), []);

  // Calculate Department Breakdown Chart Data today
  const departmentData = useMemo(() => {
    const TODAY_DATE = "2026-07-05";
    const activeEmployees = employees.filter((e) => e.status !== "inactive");

    // Group employees by department
    const depts = Array.from(
      new Set(activeEmployees.map((e) => e.department)),
    ).sort();

    return depts.map((dept) => {
      const deptEmployees = activeEmployees.filter(
        (e) => e.department === dept,
      );
      let present = 0;
      let absent = 0;
      let onLeave = 0;

      deptEmployees.forEach((emp) => {
        const record = attendance.find(
          (r) => r.employeeId === emp.id && r.date === TODAY_DATE,
        );

        if (record) {
          if (record.status === "present") present++;
          else if (record.status === "pending") onLeave++;
          else absent++;
        } else {
          // If no record exists today
          if (emp.status === "on_leave") onLeave++;
          else absent++; // Default not checked in count as absent/not in
        }
      });

      return {
        name: dept,
        Present: present,
        "On Leave": onLeave,
        Absent: absent,
      };
    });
  }, [attendance, employees]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderDeptTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface-raised border border-ink-muted/15 p-2.5 rounded-sm shadow-md text-xs font-body space-y-1">
          <p className="font-semibold text-ink border-b border-ink-muted/10 pb-1 mb-1">
            {label} Department
          </p>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {payload.map((p: any) => (
            <div
              key={p.name}
              className="flex items-center justify-between gap-6 font-mono text-[11px]"
            >
              <span
                className="flex items-center gap-1.5"
                style={{ color: p.color }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                {p.name}
              </span>
              <span className="font-bold text-ink">{p.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-95 flex flex-col gap-4">
      {/* Header */}
      <div className="shrink-0">
        <SectionHeader>Visual Analytics</SectionHeader>
        <p className="text-xs text-ink-muted font-body mt-1">
          Today's attendance breakdown per business department.
        </p>
      </div>

      {/* Chart Canvas */}
      <div className="flex-1 min-h-0 w-full font-body text-xs relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={departmentData}
            margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--ink-muted)"
              opacity={0.1}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--ink-muted)", fontSize: 10 }}
              axisLine={{ stroke: "var(--ink-muted)", opacity: 0.15 }}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "var(--ink-muted)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={renderDeptTooltip}
              cursor={{ fill: "var(--ink-muted)", opacity: 0.05 }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "10px", paddingBottom: "10px" }}
            />
            <Bar
              dataKey="Present"
              stackId="dept"
              fill="var(--status-present)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="On Leave"
              stackId="dept"
              fill="var(--status-pending)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="Absent"
              stackId="dept"
              fill="var(--status-absent)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
