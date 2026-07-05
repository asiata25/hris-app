import type { Employee, AttendanceRecord, AttendanceStatus, LeaveBalance, LeaveRequest, Announcement, Notification } from "@/types";

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

export const WEEK_1_DATES = [
  "2026-06-22",
  "2026-06-23",
  "2026-06-24",
  "2026-06-25",
  "2026-06-26",
  "2026-06-27",
  "2026-06-28",
];

export const WEEK_2_DATES = [
  "2026-06-29",
  "2026-06-30",
  "2026-07-01",
  "2026-07-02",
  "2026-07-03",
  "2026-07-04",
  "2026-07-05",
];

const ALL_SEED_DATES = [...WEEK_1_DATES, ...WEEK_2_DATES];

// Helper to generate seed attendance records
const generateInitialAttendance = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  let recordId = 1;

  // 1. Generate 14-day team attendance records (June 22 to July 5)
  MOCK_EMPLOYEES.forEach((employee) => {
    ALL_SEED_DATES.forEach((date) => {
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
        const isWeekend = date.endsWith("-06-27") || date.endsWith("-06-28") || date.endsWith("-07-04") || date.endsWith("-07-05");
        
        if (isWeekend) {
          status = "absent";
          checkIn = undefined;
          checkOut = undefined;
          workHours = undefined;
          notes = "Weekend";
        } else if (hash === 0) {
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

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann_1",
    title: "Q3 Hackathon: Building the Future of HR Tech",
    date: "2026-07-05",
    body: "We are thrilled to announce our upcoming Q3 Hackathon! This quarter, our theme is 'Building the Future of HR Tech'. Whether you're an engineer, designer, product manager, or HR specialist, we want your creative ideas. The event will kick off on July 20th and run for 48 hours. Team registrations are open starting today. Great prizes, custom swag, and plenty of pizza/coffee are guaranteed. Start brainstorming and finding your team members!",
    authorId: "1",
    category: "Engineering"
  },
  {
    id: "ann_2",
    title: "Annual Company Picnic & Team Building Details",
    date: "2026-07-01",
    body: "It's that time of the year again! Our Annual Company Picnic is scheduled for Saturday, July 18th at Golden Gate Park. We'll have catered BBQ (including vegan/vegetarian options), outdoor games, team building challenges, and a raffle draw. Families are welcome to join. Please RSVP on the portal by July 10th so we can finalize the food and beverage counts. We hope to see everyone there!",
    authorId: "7",
    category: "Social"
  },
  {
    id: "ann_3",
    title: "Important Security Update: Mandatory 2FA Enrollment",
    date: "2026-06-28",
    body: "To keep our company data and client information secure, we are mandating Two-Factor Authentication (2FA) for all internal accounts. Starting next Monday, July 6th, you will be prompted to set up 2FA via Google Authenticator or your preferred authenticator app upon logging in. Please complete this setup as soon as possible. If you experience any issues or need assistance, feel free to contact the IT Support team.",
    authorId: "5",
    category: "Security"
  },
  {
    id: "ann_4",
    title: "New Remote Work Reimbursement Guidelines",
    date: "2026-06-20",
    body: "We are updating our remote work reimbursement guidelines to better support our hybrid team. Starting next month, all full-time employees are eligible for a monthly home office stipend of up to $100 to cover internet and utility expenses. Additionally, a one-time equipment allowance of up to $500 is available for ergonomic chairs, monitors, or keyboards. Please review the updated policy document on the wiki for details on how to submit claims.",
    authorId: "7",
    category: "Policy"
  },
  {
    id: "ann_5",
    title: "Welcoming Sarah Jenkins as Our New Chief Product Officer",
    date: "2026-06-15",
    body: "We are excited to welcome Sarah Jenkins to the Labourlink team as our new Chief Product Officer (CPO), effective today! Sarah brings over 15 years of product management experience in SaaS and HR technologies, most recently leading the product division at TalentCorp. She will be overseeing our product strategy, design, and roadmap. Please join us in welcoming Sarah during our town hall meeting this Thursday!",
    authorId: "7",
    category: "Company"
  }
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
  if (!localStorage.getItem("announcements")) {
    localStorage.setItem("announcements", JSON.stringify(MOCK_ANNOUNCEMENTS));
  }
  if (!localStorage.getItem("notifications")) {
    localStorage.setItem("notifications", JSON.stringify(MOCK_NOTIFICATIONS));
  }
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif_1",
    type: "announcement",
    title: "Q3 Hackathon: Building the Future of HR Tech",
    description: "New: Q3 Hackathon registration is now open.",
    timeAgo: "2h ago",
    isRead: false,
    linkTo: "/announcements/ann_1",
  },
  {
    id: "notif_2",
    type: "leave",
    title: "Sick Leave Approved",
    description: "Your Sick Leave request for Apr 6 has been approved.",
    timeAgo: "Yesterday",
    isRead: false,
    linkTo: "/leave",
  },
  {
    id: "notif_3",
    type: "announcement",
    title: "Annual Company Picnic & Team Building Details",
    description: "New: Annual Company Picnic details updated.",
    timeAgo: "4d ago",
    isRead: true,
    linkTo: "/announcements/ann_2",
  },
  {
    id: "notif_4",
    type: "leave",
    title: "Annual Leave Approved",
    description: "Your Annual Leave request for Jun 15 has been approved.",
    timeAgo: "3w ago",
    isRead: true,
    linkTo: "/leave",
  },
];


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

export const getAnnouncementsFromDb = (): Announcement[] => {
  initializeDb();
  const data = localStorage.getItem("announcements");
  if (data) {
    const list = JSON.parse(data) as Announcement[];
    if (list.length > 0 && !list[0].authorId) {
      localStorage.setItem("announcements", JSON.stringify(MOCK_ANNOUNCEMENTS));
      return MOCK_ANNOUNCEMENTS;
    }
    return list;
  }
  return MOCK_ANNOUNCEMENTS;
};

export const getNotificationsFromDb = (): Notification[] => {
  initializeDb();
  const data = localStorage.getItem("notifications");
  return data ? JSON.parse(data) : MOCK_NOTIFICATIONS;
};

export const saveNotificationsToDb = (notifications: Notification[]) => {
  localStorage.setItem("notifications", JSON.stringify(notifications));
};

export const resetDb = () => {
  localStorage.removeItem("employees");
  localStorage.removeItem("attendance");
  localStorage.removeItem("leaveBalances");
  localStorage.removeItem("leaveRequests");
  localStorage.removeItem("announcements");
  localStorage.removeItem("notifications");
  initializeDb();
};

