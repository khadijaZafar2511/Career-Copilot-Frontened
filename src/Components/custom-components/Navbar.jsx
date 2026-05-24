import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {

     const navItems = [
       { label: "Dashboard", href: "/dashboard" },
       { label: "Projects", href: "/projects" },
       { label: "Roadmap", href: "/roadmaps" },
       { label: "AI Mentor", href: "/mentor" },
     ];
    
    return (
      <>
        <div className="w-full bg-white border-b px-6 py-1 sticky top-0 z-50 flex items-center justify-between  ">
          {/* left side content */}
          <div>
            <div className=" font-bold text-xl">
              Career Copilot 🚀
            </div>
          </div>

          {/* middle content for md    */}
          <div className="gap-5 hidden md:flex  text-gray-500 text-sm">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link to={item.href}>
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          {/* middle content for mobile */}
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="px-4 py-7">
              <div className="flex flex-col gap-3 text-gray-500 text-sm">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link to={item.href}>
                     {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* right content  */}
          <div className="hidden md:flex ">
            <Button className=" p-4 h-11">
              Get Started
            </Button>
          </div>
        </div>
      </>
    );
}