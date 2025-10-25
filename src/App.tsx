
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import WaqfAssets from "./pages/AsetWakaf";
import ScholarshipManagement from "./pages/ManajemenBeasiswa";
import TaawunDonations from "./pages/DonasiTaawun";
import ProductiveWaqf from "./pages/WakafProduktif";
import TeacherWelfare from "./pages/KesejahteraanGuru";
import ManajemenDokumen from "./pages/ManajemenDokumen";
import EventsCalendar from "./pages/KalenderAgenda";
import UserManagement from "./pages/UserManagement";
import MenuManagement from "./pages/MenuManagement";
import FirestoreInit from "./pages/FirestoreInit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <div className="min-h-screen flex w-full bg-gradient-to-br from-islamic-light to-surface-secondary">
                      <DashboardLayout />
                    </div>
                  </SidebarProvider>
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="waqf-assets" element={<WaqfAssets />} />
              <Route path="scholarships" element={<ScholarshipManagement />} />
              <Route path="taawun" element={<TaawunDonations />} />
              <Route path="productive-waqf" element={<ProductiveWaqf />} />
              <Route path="teacher-welfare" element={<TeacherWelfare />} />
              <Route path="documents" element={<ManajemenDokumen />} />
              <Route path="events" element={<EventsCalendar />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="menu-management" element={<MenuManagement />} />
              <Route path="firestore-init" element={<FirestoreInit />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
