
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import WaqfAssets from "./pages/WaqfAssets";
import ScholarshipManagement from "./pages/ScholarshipManagement";
import TaawunDonations from "./pages/TaawunDonations";
import ProductiveWaqf from "./pages/ProductiveWaqf";
import TeacherWelfare from "./pages/TeacherWelfare";
import DocumentManagement from "./pages/DocumentManagement";
import EventsCalendar from "./pages/EventsCalendar";
import UserManagement from "./pages/UserManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gradient-to-br from-green-50 to-amber-50">
            <Routes>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="waqf-assets" element={<WaqfAssets />} />
                <Route path="scholarships" element={<ScholarshipManagement />} />
                <Route path="taawun" element={<TaawunDonations />} />
                <Route path="productive-waqf" element={<ProductiveWaqf />} />
                <Route path="teacher-welfare" element={<TeacherWelfare />} />
                <Route path="documents" element={<DocumentManagement />} />
                <Route path="events" element={<EventsCalendar />} />
                <Route path="users" element={<UserManagement />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
