import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content container */}
      <div className="flex-1 flex flex-col lg:pl-16">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 py-8 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet /> {/* Render matched nested admin page */}
          </div>
        </main>
      </div>
    </div>
  );
}
