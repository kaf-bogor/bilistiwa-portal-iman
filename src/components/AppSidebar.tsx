
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  GraduationCap,
  Heart,
  Store,
  Users2,
  FileText,
  Calendar,
  Settings,
  Sparkles
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Waqf & Assets", url: "/waqf-assets", icon: Building2 },
  { title: "Scholarship Management", url: "/scholarships", icon: GraduationCap },
  { title: "Ta'awun Donations", url: "/taawun", icon: Heart },
  { title: "Productive Waqf Units", url: "/productive-waqf", icon: Store },
  { title: "Teacher Welfare", url: "/teacher-welfare", icon: Users2 },
  { title: "Document Management", url: "/documents", icon: FileText },
  { title: "Events & Calendar", url: "/events", icon: Calendar },
  { title: "User Management", url: "/users", icon: Settings },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r-2 border-green-100 bg-gradient-to-b from-green-800 to-green-900`}>
      <SidebarContent>
        {/* Logo Section */}
        <div className="p-4 border-b border-green-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-green-800" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-white font-bold text-lg">Bilistiwa</h2>
                <p className="text-green-200 text-xs">Bogor Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-green-200 px-4 py-2">
            {!collapsed && "Main Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive: navIsActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition-all duration-200
                        ${navIsActive || isActive(item.url)
                          ? "bg-amber-400 text-green-800 font-semibold shadow-lg"
                          : "text-green-100 hover:bg-green-700 hover:text-white"
                        }
                      `}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Islamic Pattern Decoration */}
        {!collapsed && (
          <div className="mt-auto p-4">
            <div className="bg-green-700 rounded-lg p-3 text-center">
              <div className="text-amber-300 text-lg mb-1">بِسْمِ اللَّهِ</div>
              <p className="text-green-200 text-xs">Barakallahu Fiikum</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
