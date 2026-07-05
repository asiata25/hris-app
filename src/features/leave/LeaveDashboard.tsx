import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  getLeaveBalancesFromDb,
  getLeaveRequestsFromDb,
  saveLeaveRequestsToDb,
  getEmployeesFromDb,
  CURRENT_USER_ID,
} from "@/lib/mockDb";
import type { LeaveBalance, LeaveRequest, Employee } from "@/types";
import { LeaveSummaryCards } from "./components/LeaveSummaryCards";
import { LeaveRequestDetailsModal } from "./components/LeaveRequestDetailsModal";

export default function LeaveDashboard() {
  const navigate = useNavigate();
  const [balances, setBalances] = useState<LeaveBalance[]>(() =>
    getLeaveBalancesFromDb(),
  );
  const [recentRequests, setRecentRequests] = useState<LeaveRequest[]>([]);
  const [teamRequests, setTeamRequests] = useState<LeaveRequest[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(
    null,
  );

  const loadData = () => {
    setBalances(getLeaveBalancesFromDb());

    const allRequests = getLeaveRequestsFromDb();

    // Recent requests: current user
    const recent = allRequests
      .filter((r) => r.employeeId === CURRENT_USER_ID)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    setRecentRequests(recent);

    // Team requests: other employees
    const team = allRequests
      .filter((r) => r.employeeId !== CURRENT_USER_ID)
      .sort((a, b) => {
        // Pending first
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;
        // Then by date
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    setTeamRequests(team);

    setEmployees(getEmployeesFromDb());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("storage", loadData);
    const timer = setInterval(loadData, 1000);

    return () => {
      window.removeEventListener("storage", loadData);
      clearInterval(timer);
    };
  }, []);

  const getEmployeeInfo = (id: string): Employee => {
    return (
      employees.find((e) => e.id === id) || {
        id: "unknown",
        name: "Unknown Employee",
        role: "Staff Member",
        department: "General",
        status: "inactive",
        email: "unknown@labourlink.com",
      }
    );
  };

  const formatDateRange = (startStr: string, endStr: string) => {
    const start = new Date(startStr + "T00:00:00");
    const end = new Date(endStr + "T00:00:00");

    const startMonth = start.toLocaleDateString("en-US", { month: "short" });
    const startDay = start.getDate();

    const endMonth = end.toLocaleDateString("en-US", { month: "short" });
    const endDay = end.getDate();

    if (startStr === endStr) {
      return `${startMonth} ${startDay}`;
    }

    return `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
  };

  const handleAction = (status: "approved" | "rejected") => {
    if (!selectedRequest) return;

    const allRequests = getLeaveRequestsFromDb();
    const updated = allRequests.map((r) => {
      if (r.id === selectedRequest.id) {
        return { ...r, status };
      }
      return r;
    });

    saveLeaveRequestsToDb(updated);
    setSelectedRequest(null);
    loadData();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-ink tracking-tight">
            Leave Dashboard
          </h2>
          <p className="text-sm text-ink-muted mt-1 font-body">
            Review your used and remaining balances for each leave category.
          </p>
        </div>
        <Button
          onClick={() => navigate("/leave/new")}
          variant="primary"
          className="sm:self-start flex items-center gap-1.5 cursor-pointer animate-fadeIn"
        >
          <Plus className="w-4 h-4" />
          Request Leave
        </Button>
      </div>

      {/* Leave Summary Section */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-ink-muted font-body">
          My Leave Summary
        </div>
        <LeaveSummaryCards balances={balances} />
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        {/* Left Column: Your Recent Requests */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-ink-muted font-body">
            Your Recent Requests
          </div>
          {recentRequests.length === 0 ? (
            <Card className="py-8 text-center bg-surface-raised border border-dashed border-ink-muted/15 rounded-sm">
              <p className="text-sm text-ink-muted font-body">
                No requests yet
              </p>
            </Card>
          ) : (
            <div className="bg-surface-raised rounded-md border border-ink-muted/10 text-ink font-body transition-all duration-200 shadow-sm overflow-hidden divide-y divide-ink-muted/10">
              {recentRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between p-4.5 hover:bg-surface/30 transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-sm font-semibold text-ink font-body block capitalize">
                      {req.leaveType} Leave
                    </span>
                    <span className="text-xs text-ink-muted font-body block">
                      {formatDateRange(req.startDate, req.endDate)}
                    </span>
                  </div>
                  <Badge
                    variant={
                      req.status === "approved"
                        ? "present"
                        : req.status === "rejected"
                          ? "absent"
                          : "pending"
                    }
                  >
                    {req.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Upcoming Team Requests */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-ink-muted font-body">
            Upcoming Team Requests
          </div>
          {teamRequests.length === 0 ? (
            <Card className="py-8 text-center bg-surface-raised border border-dashed border-ink-muted/15 rounded-sm">
              <p className="text-sm text-ink-muted font-body">
                No team requests pending
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {teamRequests.map((req) => {
                const emp = getEmployeeInfo(req.employeeId);
                const initials = emp.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2);

                return (
                  <button
                    key={req.id}
                    onClick={() => setSelectedRequest(req)}
                    className="w-full text-left flex items-center justify-between p-3.5 bg-surface-raised border border-ink-muted/10 rounded-sm hover:border-ink-muted/20 hover:shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-xs shrink-0 border border-accent/15">
                        {initials}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-sm font-semibold text-ink font-body block">
                          {emp.name}
                        </span>
                        <span className="text-xs text-ink-muted font-body block capitalize">
                          {req.leaveType} Leave •{" "}
                          {formatDateRange(req.startDate, req.endDate)}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        req.status === "approved"
                          ? "present"
                          : req.status === "rejected"
                            ? "absent"
                            : "pending"
                      }
                    >
                      {req.status}
                    </Badge>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal Dialog for Team Request Actions */}
      <LeaveRequestDetailsModal
        request={selectedRequest}
        employee={getEmployeeInfo(selectedRequest?.employeeId || "")}
        onClose={() => setSelectedRequest(null)}
        onApprove={() => handleAction("approved")}
        onDecline={() => handleAction("rejected")}
      />
    </div>
  );
}
