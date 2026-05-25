import { Outlet } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/custom-components/Sidebar";
import Navbar from "@/components/custom-components/Navbar"; // Import your custom navbar

export default function PageLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        {/* 1. Outer full-screen column layout */}
        <div className="flex flex-col min-h-screen w-full">
          {/* 2. Full-width top Navbar */}
          <div className="w-full z-50 border-b bg-background">
            <Navbar />
          </div>

          {/* 3. Horizontal container for everything under the navbar */}
          <div className="flex flex-1 w-full overflow-hidden ">
            {/* Left side: Navigation panel */}
            <AppSidebar />

            {/* Right side: Active dashboard view space */}
            <main className="w-full ">
              <SidebarTrigger />
              < Outlet/>
              {/* {children} */}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
