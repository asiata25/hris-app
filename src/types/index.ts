export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "on_leave";
  email: string;
  avatarUrl?: string;
}

export interface FilterState {
  searchQuery: string;
  department: string;
  role: string;
  status: string;
}

export type AttendanceStatus = "present" | "absent" | "pending";

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  checkIn?: string; // e.g., "09:00 AM"
  checkOut?: string; // e.g., "05:30 PM"
  workHours?: string; // e.g., "8h 30m"
  notes?: string;
}

export type LeaveType = "annual" | "sick" | "unpaid";

export interface LeaveBalance {
  leaveType: LeaveType;
  allocated: number;
  used: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: LeaveType;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  reason: string;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
}


