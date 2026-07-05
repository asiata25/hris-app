import { useState, useEffect } from "react";
import { getLeaveBalancesFromDb } from "@/lib/mockDb";
import type { LeaveBalance } from "@/types";
import { LeaveSummaryCards } from "./components/LeaveSummaryCards";

export default function LeaveDashboard() {
  const [balances, setBalances] = useState<LeaveBalance[]>(() =>
    getLeaveBalancesFromDb(),
  );

  useEffect(() => {
    const syncState = () => {
      setBalances(getLeaveBalancesFromDb());
    };
    window.addEventListener("storage", syncState);
    const timer = setInterval(syncState, 1000);

    return () => {
      window.removeEventListener("storage", syncState);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-ink tracking-tight">
          Leave Dashboard
        </h2>
        <p className="text-sm text-ink-muted mt-1 font-body">
          Review your used and remaining balances for each leave category.
        </p>
      </div>

      {/* Leave Summary Section */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-ink-muted font-body">
          My Leave Summary
        </div>
        <LeaveSummaryCards balances={balances} />
      </div>
    </div>
  );
}
