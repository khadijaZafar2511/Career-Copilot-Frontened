import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/Components/custom-components/Navbar";
import SiteFooter from "./Footer"
export default function HomepageLayout({ children }) {
  return (
    <TooltipProvider>
      {/* 1. Root page layout container */}
      <div className="flex flex-col min-h-screen w-full bg-background antialiased">
        {/* 2. Full-width, sticky top navigation bar */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <Navbar />
        </header>

        {/* 3. Central main workspace container */}
        <main className="flex-1 w-full mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
       <SiteFooter />
    </TooltipProvider>
  );
}
