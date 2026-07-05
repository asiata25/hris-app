// Helper: Format current time as HH:MM AM/PM
export const formatCurrentTime = (): string => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
};

// Helper: Calculate work hours between HH:MM AM/PM strings
export const calculateWorkHours = (inTime: string, outTime: string): string => {
  try {
    const parseTime = (str: string) => {
      const [time, modifier] = str.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const diff = parseTime(outTime) - parseTime(inTime);
    if (diff <= 0) return "8h 30m";
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return `${h}h ${m}m`;
  } catch (e) {
    return "8h 30m";
  }
};

// Format date display (e.g. "2026-07-05" -> "Sun, Jul 5")
export const formatDateLabel = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

// Helper to extract initials from name
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

// Helper to hash initials to a theme-cohesive background color
export const getAvatarBg = (name: string): string => {
  const hash = name
    .split("")
    .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const colors = [
    "bg-accent/15 text-accent border-accent/20",
    "bg-status-present/15 text-status-present border-status-present/20",
    "bg-status-pending/15 text-status-pending border-status-pending/20",
    "bg-status-absent/15 text-status-absent border-status-absent/20",
  ];
  return colors[hash % colors.length];
};
