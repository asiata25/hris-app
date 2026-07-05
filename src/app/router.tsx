import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Users, CheckCircle2, AlertCircle } from "lucide-react";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h2 className="text-2xl font-bold font-display text-ink leading-tight">
                Welcome back, Johannes
              </h2>
              <p className="text-sm text-ink-muted mt-1 font-body">
                Here's a quick overview of today's team status and action items.
              </p>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="flex items-center gap-4.5">
                <div className="w-12 h-12 rounded-md bg-accent/10 text-accent flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-ink">154</div>
                  <div className="text-xs text-ink-muted font-body font-medium">Total Employees</div>
                </div>
              </Card>

              <Card className="flex items-center gap-4.5">
                <div className="w-12 h-12 rounded-md bg-status-present/15 text-status-present flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-ink">92%</div>
                  <div className="text-xs text-ink-muted font-body font-medium flex items-center gap-1.5">
                    Attendance Rate <Badge variant="present" className="ml-1.5 px-1 py-0 text-[10px]">On Track</Badge>
                  </div>
                </div>
              </Card>

              <Card className="flex items-center gap-4.5">
                <div className="w-12 h-12 rounded-md bg-status-pending/15 text-status-pending flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-ink">6</div>
                  <div className="text-xs text-ink-muted font-body font-medium flex items-center gap-1.5">
                    Pending Leave Requests <Badge variant="pending" className="ml-1.5 px-1 py-0 text-[10px]">Urgent</Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions & Elements Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Primary, Secondary, Ghost Button Showcase */}
              <Card className="lg:col-span-2 space-y-4">
                <h3 className="font-display font-bold text-base text-ink">
                  Quick Actions (UI Primitives Showcase)
                </h3>
                <p className="text-xs text-ink-muted font-body">
                  Demonstrating the token-driven variants of our custom `Button` component:
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <Button variant="primary" size="sm">Small Primary</Button>
                  <Button variant="secondary" size="sm">Small Secondary</Button>
                  <Button variant="ghost" size="sm">Small Ghost</Button>
                </div>
              </Card>

              {/* Status Badge Showcase */}
              <Card className="space-y-4">
                <h3 className="font-display font-bold text-base text-ink">
                  Attendance Statuses
                </h3>
                <p className="text-xs text-ink-muted font-body">
                  Token-driven `Badge` components mapping opacity-muted status colors:
                </p>

                <ul className="space-y-3 pt-2 font-body text-sm text-ink">
                  <li className="flex items-center justify-between">
                    <span>Johannes Kepler</span>
                    <Badge variant="present">Present</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Arlene McCoy</span>
                    <Badge variant="absent">Absent</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Albert Flores</span>
                    <Badge variant="pending">Pending</Badge>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        )
      },
      {
        path: "team",
        element: (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold font-display text-ink">Team Directory</h2>
            <Card>
              <p className="text-ink-muted font-body text-sm">
                Team screen directory interface — coming soon in Phase 1.
              </p>
            </Card>
          </div>
        ),
      },
      {
        path: "attendance",
        element: (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold font-display text-ink">Attendance Log</h2>
            <Card>
              <p className="text-ink-muted font-body text-sm">
                Daily attendance logs and calendar status strips — coming soon in Phase 1.
              </p>
            </Card>
          </div>
        ),
      },
      {
        path: "leave",
        element: (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold font-display text-ink">Leave Summary</h2>
            <Card>
              <p className="text-ink-muted font-body text-sm">
                Used/remaining leave count summaries and request forms — coming soon in Phase 1.
              </p>
            </Card>
          </div>
        ),
      },
      {
        path: "*",
        element: (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-ink">Page Not Found</h2>
            <Card>
              <p className="text-ink-muted font-body text-sm">
                The requested URL path was not recognized. Please use the sidebar to navigate.
              </p>
            </Card>
          </div>
        )
      }
    ],
  },
]);
