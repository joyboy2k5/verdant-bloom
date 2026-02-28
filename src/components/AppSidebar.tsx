import { useLocation, Link } from "react-router-dom";
import { Sprout, Leaf, ScanLine } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Agri-Pulse", url: "/dashboard/agri-pulse", icon: Sprout },
  { title: "Crop Health", url: "/dashboard/crop-health", icon: ScanLine },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="forest-sidebar pt-4">
        {/* Brand */}
        {!collapsed && (
          <div className="px-5 pb-4 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center">
              <Leaf className="w-5 h-5 text-sidebar-foreground" strokeWidth={1.5} />
            </div>
            <span className="font-display text-xl text-sidebar-foreground font-bold tracking-wide">
              BioSync
            </span>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 font-sans text-[10px] tracking-[0.15em] uppercase">
            Dashboards
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={active ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"}
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" strokeWidth={1.5} />
                        {!collapsed && (
                          <span className="font-sans text-sm font-medium">{item.title}</span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
