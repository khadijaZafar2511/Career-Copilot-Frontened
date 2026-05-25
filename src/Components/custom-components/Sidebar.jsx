import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Map,
  CheckSquare,
  FolderOpen,
  Sparkles,
  BarChart3,
  Settings,
  Briefcase,
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
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Roadmaps", url: "/roadmaps", icon: Map },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Resources", url: "/resources", icon: FolderOpen },
  { title: "Projects", url: "/projects", icon: Briefcase },
  { title: "AI mentor", url: "/mentor", icon: Sparkles },
  { title: "Settings", url: "/setting", icon: Settings },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent className="mt-14 bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="p-2">CareerCopilot</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-3">
              {items.map((item) => {
                // Check if the current route matches the link item
                const isActive = location.pathname === item.url;

                return (
                  <div key={item.title}>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link className="flex gap-2 " to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
