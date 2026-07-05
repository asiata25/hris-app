import { useState, useEffect, useMemo } from "react";
import {
  getAttendanceFromDb,
  checkInUser,
  checkOutUser,
  CURRENT_USER_ID,
} from "@/lib/mockDb";
import type { AttendanceRecord } from "@/types";
import { formatCurrentTime, calculateWorkHours } from "@/utils/helpers";

const TODAY_DATE = "2026-07-05";

export function useAttendance() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() =>
    getAttendanceFromDb()
  );

  useEffect(() => {
    const syncState = () => {
      setAttendance(getAttendanceFromDb());
    };
    
    // Sync across windows/tabs
    window.addEventListener("storage", syncState);
    
    // Sync across components in the same window
    window.addEventListener("attendance-update", syncState);

    // Backup interval for real-time safety
    const interval = setInterval(syncState, 1000);

    return () => {
      window.removeEventListener("storage", syncState);
      window.removeEventListener("attendance-update", syncState);
      clearInterval(interval);
    };
  }, []);

  const triggerUpdate = () => {
    setAttendance(getAttendanceFromDb());
    window.dispatchEvent(new Event("attendance-update"));
  };

  const todayRecord = useMemo(() => {
    return attendance.find(
      (r) => r.employeeId === CURRENT_USER_ID && r.date === TODAY_DATE
    );
  }, [attendance]);

  const checkInState = useMemo<"idle" | "checked_in" | "checked_out">(() => {
    if (!todayRecord) return "idle";
    if (todayRecord.checkIn && !todayRecord.checkOut) return "checked_in";
    return "checked_out";
  }, [todayRecord]);

  const handleCheckIn = () => {
    const checkInTime = formatCurrentTime();
    checkInUser(TODAY_DATE, checkInTime);
    triggerUpdate();
  };

  const handleCheckOut = () => {
    if (!todayRecord?.checkIn) return;
    const checkOutTime = formatCurrentTime();
    const workHours = calculateWorkHours(todayRecord.checkIn, checkOutTime);
    checkOutUser(TODAY_DATE, checkOutTime, workHours);
    triggerUpdate();
  };

  return {
    attendance,
    todayRecord,
    checkInState,
    checkIn: handleCheckIn,
    checkOut: handleCheckOut,
    triggerUpdate,
  };
}
