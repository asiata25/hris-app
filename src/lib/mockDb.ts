import type { Employee, AttendanceRecord, AttendanceStatus, LeaveBalance, LeaveRequest } from "@/types";

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Dianne Russell",
    role: "Senior Product Designer",
    department: "Design",
    status: "active",
    email: "dianne.russell@labourlink.com",
  },
  {
    id: "2",
    name: "Johannes Kepler",
    role: "Software Engineer",
    department: "Engineering",
    status: "active",
    email: "johannes.kepler@labourlink.com",
  },
  {
    id: "3",
    name: "Arlene McCoy",
    role: "Product Manager",
    department: "Product Management",
    status: "on_leave",
    email: "arlene.mccoy@labourlink.com",
  },
  {
    id: "4",
    name: "Albert Flores",
    role: "QA Engineer",
    department: "Engineering",
    status: "inactive",
    email: "albert.flores@labourlink.com",
  },
  {
    id: "5",
    name: "Cody Fisher",
    role: "DevOps Engineer",
    department: "Engineering",
    status: "active",
    email: "cody.fisher@labourlink.com",
  },
  {
    id: "6",
    name: "Esther Howard",
    role: "Marketing Specialist",
    department: "Marketing",
    status: "active",
    email: "esther.howard@labourlink.com",
  },
  {
    id: "7",
    name: "Kristin Watson",
    role: "Head of HR",
    department: "Human Resources",
    status: "active",
    email: "kristin.watson@labourlink.com",
  },
  {
    id: "8",
    name: "Cameron Williamson",
    role: "Frontend Developer",
    department: "Engineering",
    status: "active",
    email: "cameron.williamson@labourlink.com",
  },
  {
    id: "9",
    name: "Leslie Alexander",
    role: "Content Writer",
    department: "Marketing",
    status: "on_leave",
    email: "leslie.alexander@labourlink.com",
  },
  {
    id: "10",
    name: "Eleanor Pena",
    role: "Customer Success Specialist",
    department: "Operations",
    status: "active",
    email: "eleanor.pena@labourlink.com",
  },
  {
    id: "11",
    name: "Devon Lane",
    role: "Operations Manager",
    department: "Operations",
    status: "inactive",
    email: "devon.lane@labourlink.com",
  },
  {
    id: "12",
    name: "Guy Hawkins",
    role: "Backend Engineer",
    department: "Engineering",
    status: "active",
    email: "guy.hawkins@labourlink.com",
  }
];

export const CURRENT_USER_ID = "2"; // Johannes Kepler

// Past 7 dates for team history
export const PAST_DATES = [
  "2026-06-29", // Mon
  "2026-06-30", // Tue
  "2026-07-01", // Wed
  "2026-07-02", // Thu
  "2026-07-03", // Fri
  "2026-07-04", // Sat
  "2026-07-05", // Sun (Today)
];

// Helper to generate seed attendance records
const generateInitialAttendance = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  let recordId = 1;

  // 1. Generate 7-day team attendance records (June 29 to July 5)
  MOCK_EMPLOYEES.forEach((employee) => {
    PAST_DATES.forEach((date) => {
      // Don't generate today's attendance for the current user yet (unchecked by default)
      if (employee.id === CURRENT_USER_ID && date === "2026-07-05") {
        return;
      }

      let status: AttendanceStatus = "present";
      let checkIn: string | undefined = "09:00 AM";
      let checkOut: string | undefined = "05:30 PM";
      let workHours: string | undefined = "8h 30m";
      let notes = "Regular check-in";

      // Customize based on employee status
      if (employee.status === "on_leave") {
        status = "pending"; // On Leave
        checkIn = undefined;
        checkOut = undefined;
        workHours = undefined;
        notes = "Approved Leave";
      } else if (employee.status === "inactive") {
        status = "absent";
        checkIn = undefined;
        checkOut = undefined;
        workHours = undefined;
        notes = "Absent";
      } else {
        // Active employee randomizations
        const hash = (parseInt(employee.id) * 31 + date.charCodeAt(date.length - 1)) % 10;
        if (hash === 0) {
          status = "absent";
          checkIn = undefined;
          checkOut = undefined;
          workHours = undefined;
          notes = "Unexcused Absence";
        } else if (hash === 1) {
          status = "pending";
          checkIn = undefined;
          checkOut = undefined;
          workHours = undefined;
          notes = "Sick Leave";
        } else {
          // Present with small offsets
          const minutesOffset = hash * 3;
          checkIn = `08:${45 + minutesOffset} AM`;
          checkOut = `05:${15 + minutesOffset} PM`;
          workHours = "8h 30m";
        }
      }

      records.push({
        id: `att_${recordId++}`,
        employeeId: employee.id,
        date,
        status,
        checkIn,
        checkOut,
        workHours,
        notes,
      });
    });
  });

  // 2. Generate detailed 14-day history specifically for the logged-in user (Johannes Kepler)
  const userExtraDates = [
    "2026-06-22",
    "2026-06-23",
    "2026-06-24",
    "2026-06-25",
    "2026-06-26",
    "2026-06-27",
    "2026-06-28",
  ];

  userExtraDates.forEach((date) => {
    const isWeekend = date === "2026-06-27" || date === "2026-06-28";
    records.push({
      id: `att_${recordId++}`,
      employeeId: CURRENT_USER_ID,
      date,
      status: isWeekend ? "absent" : "present",
      checkIn: isWeekend ? undefined : "08:52 AM",
      checkOut: isWeekend ? undefined : "05:40 PM",
      workHours: isWeekend ? undefined : "8h 48m",
      notes: isWeekend ? "Weekend" : "Regular check-in",
    });
  });

  return records;
};

export const MOCK_LEAVE_BALANCES: LeaveBalance[] = [
  { leaveType: "annual", allocated: 12, used: 8 },
  { leaveType: "sick", allocated: 6, used: 2 },
  { leaveType: "unpaid", allocated: 10, used: 1 },
];

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: "lr_1",
    employeeId: CURRENT_USER_ID,
    leaveType: "annual",
    startDate: "2026-05-12",
    endDate: "2026-05-14",
    reason: "Family vacation",
    status: "approved",
    createdAt: "2026-05-01T10:00:00Z",
  },
  {
    id: "lr_2",
    employeeId: CURRENT_USER_ID,
    leaveType: "annual",
    startDate: "2026-06-15",
    endDate: "2026-06-19",
    reason: "Summer holiday",
    status: "approved",
    createdAt: "2026-06-01T09:30:00Z",
  },
  {
    id: "lr_3",
    employeeId: CURRENT_USER_ID,
    leaveType: "sick",
    startDate: "2026-04-06",
    endDate: "2026-04-07",
    reason: "Flu and fever",
    status: "approved",
    createdAt: "2026-04-06T08:00:00Z",
  },
  {
    id: "lr_4",
    employeeId: CURRENT_USER_ID,
    leaveType: "unpaid",
    startDate: "2026-02-10",
    endDate: "2026-02-10",
    reason: "Personal urgent matter",
    status: "approved",
    createdAt: "2026-02-09T14:00:00Z",
  },
  {
    id: "lr_5",
    employeeId: "1", // Dianne Russell
    leaveType: "annual",
    startDate: "2026-07-12",
    endDate: "2026-07-16",
    reason: "Attending Design Week conference in Paris",
    status: "pending",
    createdAt: "2026-07-04T10:00:00Z",
  },
  {
    id: "lr_6",
    employeeId: "3", // Arlene McCoy
    leaveType: "sick",
    startDate: "2026-07-06",
    endDate: "2026-07-07",
    reason: "Wisdom tooth extraction surgery",
    status: "pending",
    createdAt: "2026-07-05T08:15:00Z",
  },
  {
    id: "lr_7",
    employeeId: "5", // Cody Fisher
    leaveType: "unpaid",
    startDate: "2026-07-20",
    endDate: "2026-07-24",
    reason: "Moving into new apartment and setting up utilities",
    status: "pending",
    createdAt: "2026-07-05T11:00:00Z",
  },
];

// Seeding function
export const initializeDb = () => {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem("employees")) {
    localStorage.setItem("employees", JSON.stringify(MOCK_EMPLOYEES));
  }
  if (!localStorage.getItem("attendance")) {
    localStorage.setItem("attendance", JSON.stringify(generateInitialAttendance()));
  }
  if (!localStorage.getItem("leaveBalances")) {
    localStorage.setItem("leaveBalances", JSON.stringify(MOCK_LEAVE_BALANCES));
  }
  if (!localStorage.getItem("leaveRequests")) {
    localStorage.setItem("leaveRequests", JSON.stringify(MOCK_LEAVE_REQUESTS));
  }
};

// Database Access Methods
export const getEmployeesFromDb = (): Employee[] => {
  initializeDb();
  const data = localStorage.getItem("employees");
  return data ? JSON.parse(data) : MOCK_EMPLOYEES;
};

export const getAttendanceFromDb = (): AttendanceRecord[] => {
  initializeDb();
  const data = localStorage.getItem("attendance");
  return data ? JSON.parse(data) : [];
};

export const saveAttendanceToDb = (records: AttendanceRecord[]) => {
  localStorage.setItem("attendance", JSON.stringify(records));
};

export const checkInUser = (date: string, checkInTime: string): AttendanceRecord => {
  const attendance = getAttendanceFromDb();
  
  // Remove any pre-existing record for today
  const filtered = attendance.filter(
    (r) => !(r.employeeId === CURRENT_USER_ID && r.date === date)
  );

  const newRecord: AttendanceRecord = {
    id: `att_user_${Date.now()}`,
    employeeId: CURRENT_USER_ID,
    date,
    status: "present",
    checkIn: checkInTime,
    notes: "Checked in via dashboard",
  };

  filtered.push(newRecord);
  saveAttendanceToDb(filtered);
  return newRecord;
};

export const checkOutUser = (date: string, checkOutTime: string, workHours: string): AttendanceRecord => {
  const attendance = getAttendanceFromDb();
  const record = attendance.find(
    (r) => r.employeeId === CURRENT_USER_ID && r.date === date
  );

  if (record) {
    record.status = "present";
    record.checkOut = checkOutTime;
    record.workHours = workHours;
    record.notes = "Checked out via dashboard";
  } else {
    // Fallback if checkout clicked before checkin (should not happen UI-wise)
    const newRecord: AttendanceRecord = {
      id: `att_user_${Date.now()}`,
      employeeId: CURRENT_USER_ID,
      date,
      status: "present",
      checkIn: "09:00 AM",
      checkOut: checkOutTime,
      workHours,
      notes: "Checked out via dashboard",
    };
    attendance.push(newRecord);
  }

  saveAttendanceToDb(attendance);
  return record || attendance[attendance.length - 1];
};

export const getLeaveBalancesFromDb = (): LeaveBalance[] => {
  initializeDb();
  const data = localStorage.getItem("leaveBalances");
  return data ? JSON.parse(data) : MOCK_LEAVE_BALANCES;
};

export const getLeaveRequestsFromDb = (): LeaveRequest[] => {
  initializeDb();
  const data = localStorage.getItem("leaveRequests");
  return data ? JSON.parse(data) : MOCK_LEAVE_REQUESTS;
};

export const calculateDateDiff = (startDateStr: string, endDateStr: string): number => {
  const start = new Date(startDateStr + "T00:00:00");
  const end = new Date(endDateStr + "T00:00:00");
  const diffTime = end.getTime() - start.getTime();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) + 1;
};

export const saveLeaveRequestsToDb = (requests: LeaveRequest[]) => {
  localStorage.setItem("leaveRequests", JSON.stringify(requests));
  
  // Dynamically update the leave balances used values based on approved requests
  const balances = getLeaveBalancesFromDb();
  const userRequests = requests.filter(r => r.employeeId === CURRENT_USER_ID && r.status === "approved");
  
  const updatedBalances = balances.map(balance => {
    const matchingRequests = userRequests.filter(r => r.leaveType === balance.leaveType);
    const usedDays = matchingRequests.reduce((sum, r) => sum + calculateDateDiff(r.startDate, r.endDate), 0);
    return {
      ...balance,
      used: usedDays
    };
  });
  
  localStorage.setItem("leaveBalances", JSON.stringify(updatedBalances));
};

export const resetDb = () => {
  localStorage.removeItem("employees");
  localStorage.removeItem("attendance");
  localStorage.removeItem("leaveBalances");
  localStorage.removeItem("leaveRequests");
  initializeDb();
};
