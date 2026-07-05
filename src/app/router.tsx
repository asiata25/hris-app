import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import HomeDashboard from "@/features/home/HomeDashboard";
import TeamDirectory from "@/features/team/TeamDirectory";
import AttendanceDashboard from "@/features/attendance/AttendanceDashboard";
import LeaveDashboard from "@/features/leave/LeaveDashboard";
import { Card } from "@/components/ui/Card";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomeDashboard />,
      },
      {
        path: "team",
        element: <TeamDirectory />,
      },
      {
        path: "attendance",
        element: <AttendanceDashboard />,
      },
      {
        path: "leave",
        element: <LeaveDashboard />,
      },
      {
        path: "*",
        element: (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-ink">
              Page Not Found
            </h2>
            <Card>
              <p className="text-ink-muted font-body text-sm">
                The requested URL path was not recognized. Please use the
                sidebar to navigate.
              </p>
            </Card>
          </div>
        ),
      },
    ],
  },
]);
