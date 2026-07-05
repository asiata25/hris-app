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
