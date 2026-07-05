import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import HomeDashboard from "@/features/home/HomeDashboard";
import TeamDirectory from "@/features/team/TeamDirectory";
import AttendanceDashboard from "@/features/attendance/AttendanceDashboard";
import LeaveDashboard from "@/features/leave/LeaveDashboard";
import NewLeaveRequest from "@/features/leave/NewLeaveRequest";
import AnnouncementsFeed from "@/features/announcements/AnnouncementsFeed";
import AnnouncementDetails from "@/features/announcements/AnnouncementDetails";
import PrivacyTerms from "@/features/support/PrivacyTerms";
import Contact from "@/features/support/Contact";
import ReportBug from "@/features/support/ReportBug";
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
        children: [
          {
            index: true,
            element: <LeaveDashboard />,
          },
          {
            path: "new",
            element: <NewLeaveRequest />,
          },
        ],
      },
      {
        path: "announcements",
        children: [
          {
            index: true,
            element: <AnnouncementsFeed />,
          },
          {
            path: ":id",
            element: <AnnouncementDetails />,
          },
        ],
      },

      {
        path: "privacy-terms",
        element: <PrivacyTerms />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "report-bug",
        element: <ReportBug />,
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
