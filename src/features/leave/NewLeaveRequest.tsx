import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { DatePicker } from "@/components/ui/DatePicker";
import { TextArea } from "@/components/ui/TextArea";

import {
  getLeaveBalancesFromDb,
  getLeaveRequestsFromDb,
  saveLeaveRequestsToDb,
  calculateDateDiff,
  CURRENT_USER_ID,
} from "@/lib/mockDb";
import type { LeaveType, LeaveRequest } from "@/types";

export default function NewLeaveRequest() {
  const navigate = useNavigate();

  const [leaveType, setLeaveType] = useState<LeaveType | "">("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [balances, setBalances] = useState(() => getLeaveBalancesFromDb());

  const [errors, setErrors] = useState<{
    leaveType?: string;
    startDate?: string;
    endDate?: string;
    reason?: string;
  }>({});

  useEffect(() => {
    const syncState = () => {
      setBalances(getLeaveBalancesFromDb());
    };

    window.addEventListener("storage", syncState);
    return () => window.removeEventListener("storage", syncState);
  }, []);

  const getRemaining = (type: LeaveType) => {
    const bal = balances.find((b) => b.leaveType === type);
    return bal ? Math.max(0, bal.allocated - bal.used) : 0;
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!leaveType) {
      newErrors.leaveType = "Leave type is required.";
    }

    if (!startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!endDate) {
      newErrors.endDate = "End date is required.";
    } else if (startDate && endDate) {
      if (new Date(endDate + "T00:00:00") < new Date(startDate + "T00:00:00")) {
        newErrors.endDate = "End date cannot be before start date.";
      } else if (leaveType) {
        const requestedDays = calculateDateDiff(startDate, endDate);
        const remaining = getRemaining(leaveType);
        if (requestedDays > remaining) {
          newErrors.endDate = `Requested ${requestedDays} days exceeds your remaining balance of ${remaining} days.`;
        }
      }
    }

    if (!reason.trim()) {
      newErrors.reason = "Reason is required.";
    } else if (reason.trim().length < 5) {
      newErrors.reason =
        "Please provide a more detailed reason (minimum 5 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate database write with 1-second delay
    setTimeout(() => {
      const currentRequests = getLeaveRequestsFromDb();
      const newRequest: LeaveRequest = {
        id: `lr_${Date.now()}`,
        employeeId: CURRENT_USER_ID,
        leaveType: leaveType as LeaveType,
        startDate,
        endDate,
        reason,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const updated = [newRequest, ...currentRequests];
      saveLeaveRequestsToDb(updated);
      setIsSubmitting(false);
      navigate("/leave");
    }, 1000);
  };

  const leaveTypeOptions = [
    { value: "", label: "Select a leave category" },
    {
      value: "annual",
      label: `Annual Leave (${getRemaining("annual")} days remaining)`,
    },
    {
      value: "sick",
      label: `Sick Leave (${getRemaining("sick")} days remaining)`,
    },
    {
      value: "unpaid",
      label: `Unpaid Leave (${getRemaining("unpaid")} days remaining)`,
    },
  ];

  return (
    <div className="max-w-xl mx-auto py-4 md:py-6 space-y-6 animate-fadeIn">
      {/* Back Button and Header */}
      <div className="space-y-4">
        <button
          onClick={() => navigate("/leave")}
          className="inline-flex items-center text-xs font-semibold text-ink-muted hover:text-ink transition-colors cursor-pointer gap-1.5"
          title="Return to Leave Dashboard"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Leave Dashboard
        </button>

        <div>
          <PageHeader>New Leave Request</PageHeader>
          <p className="text-sm text-ink-muted mt-1 font-body">
            Please fill out the form below. Focus on submitting a single,
            accurate request.
          </p>
        </div>
      </div>

      {/* Main Request Form Card */}
      <Card className="shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Leave Type Selector */}
          <SelectDropdown
            id="leaveType"
            label="Leave Type"
            value={leaveType}
            onChange={(e) => {
              setLeaveType(e.target.value as LeaveType);
              if (errors.leaveType) {
                setErrors((prev) => ({ ...prev, leaveType: undefined }));
              }
              if (errors.endDate?.includes("exceeds")) {
                setErrors((prev) => ({ ...prev, endDate: undefined }));
              }
            }}
            options={leaveTypeOptions}
            error={errors.leaveType}
          />

          {/* 2. Coupled Date Section */}
          <div className="bg-surface border border-ink-muted/10 rounded-sm p-4 space-y-3">
            <div className="text-xs font-bold text-ink uppercase tracking-wider font-body">
              When will you be away?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DatePicker
                id="startDate"
                label="Start Date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (errors.startDate) {
                    setErrors((prev) => ({ ...prev, startDate: undefined }));
                  }
                }}
                error={errors.startDate}
              />

              <DatePicker
                id="endDate"
                label="End Date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  if (errors.endDate) {
                    setErrors((prev) => ({ ...prev, endDate: undefined }));
                  }
                }}
                error={errors.endDate}
              />
            </div>
          </div>

          {/* 3. Reason Textarea */}
          <TextArea
            id="reason"
            label="Reason"
            rows={4}
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (errors.reason) {
                setErrors((prev) => ({ ...prev, reason: undefined }));
              }
            }}
            placeholder="Describe the context for your absence..."
            error={errors.reason}
            className="text-area-min-h"
          />

          {/* 4. Full-width Submit Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full h-11 flex items-center justify-center font-semibold text-sm cursor-pointer disabled:pointer-events-none disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting Request...
              </>
            ) : (
              "Submit Leave Request"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
