import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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
import * as LucideIcons from "lucide-react";
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
import { menuItemsService } from "@/lib/firebaseService";
import { Timestamp } from "firebase/firestore";

interface MenuItem {
  id?: string;
  title: string;
  url: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const defaultMenuItems = [
  { title: "Dashboard", url: "/", icon: "LayoutDashboard", order: 1, isActive: true },
  { title: "Inisialisasi Database", url: "/firestore-init", icon: "Database", order: 2, isActive: true },
  { title: "Wakaf & Aset", url: "/waqf-assets", icon: "Building2", order: 3, isActive: true },
  { title: "Manajemen Beasiswa", url: "/scholarships", icon: "GraduationCap", order: 4, isActive: true },
  { title: "Donasi Ta'awun", url: "/taawun", icon: "Heart", order: 5, isActive: true },
  { title: "Unit Wakaf Produktif", url: "/productive-waqf", icon: "Store", order: 6, isActive: true },
  { title: "Kesejahteraan Guru", url: "/teacher-welfare", icon: "Users2", order: 7, isActive: true },
  { title: "Manajemen Dokumen", url: "/documents", icon: "FileText", order: 8, isActive: true },
  { title: "Acara & Kalender", url: "/events", icon: "Calendar", order: 9, isActive: true },
  { title: "Manajemen Pengguna", url: "/users", icon: "Settings", order: 10, isActive: true },
  { title: "Manajemen Menu", url: "/menu-management", icon: "Menu", order: 11, isActive: true },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeMenu = async () => {
      try {
        const items = await menuItemsService.getAll({ orderByField: 'order', orderDirection: 'asc' });

        if (items.length === 0) {
          // Initialize with default menu items if empty
          await menuItemsService.batchCreate(defaultMenuItems);
          const newItems = await menuItemsService.getAll({ orderByField: 'order', orderDirection: 'asc' });
          setMenuItems(newItems as MenuItem[]);
        } else {
          setMenuItems(items as MenuItem[]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading menu items:', error);
        setMenuItems(defaultMenuItems as MenuItem[]);
        setLoading(false);
      }
    };

    initializeMenu();

    // Set up real-time listener
    const unsubscribe = menuItemsService.onSnapshot((documents) => {
      setMenuItems(documents as MenuItem[]);
    }, { orderByField: 'order', orderDirection: 'asc' });

    return () => unsubscribe();
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const getIconComponent = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.Circle;
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white shadow-sm">
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
            {!collapsed && "Navigasi Utama"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {loading ? (
                <div className="px-4 py-3 text-gray-500 text-sm">Memuat menu...</div>
              ) : (
                menuItems
                  .filter(item => item.isActive)
                  .map((item) => {
                    const IconComponent = getIconComponent(item.icon);
                    return (
                      <SidebarMenuItem key={item.id || item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive: navIsActive }) => `
                              flex items-center gap-3 px-4 py-3 rounded-xl mx-2 transition-all duration-300 ease-in-out
                              ${navIsActive || isActive(item.url)
                                ? "bg-islamic-primary text-white font-medium"
                                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              }
                            `}
                          >
                            <IconComponent className="h-5 w-5 flex-shrink-0" />
                            {!collapsed && <span className="text-sm">{item.title}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
}
