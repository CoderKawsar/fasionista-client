"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/common/Sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full px-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
