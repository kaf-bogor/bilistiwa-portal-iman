
import { Outlet } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b bg-white/80 backdrop-blur-sm flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-green-700 hover:bg-green-50" />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-green-800">Portal Bilistiwa Bogor</h1>
              <p className="text-sm text-green-600">Kuttab Al Fatih Bogor - Internal Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-50">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-50">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
