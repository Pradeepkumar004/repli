import { Button } from "@/components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Home, Info, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MenuBar = () => {
  const isMobile = useIsMobile();
  
  const mobileMenu = (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[280px]">
        <div className="flex flex-col gap-4 py-4">
          <Link to="/" className="flex items-center gap-2 px-2">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link to="/how-it-works" className="flex items-center gap-2 px-2">
            <Info className="h-4 w-4" />
            <span>How It Works</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
  
  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/logoreplu.png" 
              alt="Replu Logo" 
              className="h-8 w-auto" 
            />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Replu
            </h1>
          </Link>
        </div>
        
        {/* Menu items on the right */}
        <div className="flex items-center justify-end">
          {isMobile ? mobileMenu : (
            <Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <Link to="/">
                  <MenubarTrigger className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </div>
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>
              
              <MenubarMenu>
                <Link to="/how-it-works">
                  <MenubarTrigger className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      <span>How It Works</span>
                    </div>
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>
            </Menubar>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;