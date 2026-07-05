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

