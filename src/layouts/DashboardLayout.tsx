import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface text-ink font-body transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <Topbar />

        {/* Dynamic Route Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-surface transition-colors duration-200">
          <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
