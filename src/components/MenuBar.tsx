import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Users, User, Home, Info, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MenuBarProps {
  activeTab?: "user" | "influencer";
  setActiveTab?: (tab: "user" | "influencer") => void;
}

const MenuBar = ({ activeTab = "user", setActiveTab }: MenuBarProps) => {
  const [localActiveTab, setLocalActiveTab] = useState<"user" | "influencer">(activeTab);
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleTabChange = (tab: "user" | "influencer") => {
    if (setActiveTab) {
      setActiveTab(tab);
    } else {
      setLocalActiveTab(tab);
    }
    setIsSheetOpen(false); // Close mobile menu after selection
  };

  const currentTab = setActiveTab ? activeTab : localActiveTab;

  const mobileMenu = (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[240px] sm:w-[280px]">
        <div className="flex flex-col gap-4 py-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-2"
            onClick={() => setIsSheetOpen(false)}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link 
            to="/how-it-works" 
            className="flex items-center gap-2 px-2"
            onClick={() => setIsSheetOpen(false)}
          >
            <Info className="h-4 w-4" />
            <span>How It Works</span>
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-2 px-2" 
            onClick={() => handleTabChange("user")}
          >
            <Users className="h-4 w-4" />
            <span>For Fans</span>
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-2 px-2" 
            onClick={() => handleTabChange("influencer")}
          >
            <User className="h-4 w-4" />
            <span>For Influencers</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="./public/logoreplu.png" 
              alt="Replu Logo" 
              className="h-10 mr-2" 
            />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Replu
            </h1>
          </Link>
        </div>
        
        <div className="flex items-center">
          {isMobile ? (
            mobileMenu
          ) : (
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
              
              <MenubarMenu>
                <Link to="/">
                  <MenubarTrigger 
                    className={cn(
                      "cursor-pointer transition-colors",
                      currentTab === "user" ? "text-blue-600 font-medium" : "text-gray-600"
                    )}
                    onClick={() => handleTabChange("user")}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>For Fans</span>
                    </div>
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>
              
              <MenubarMenu>
                <Link to="/">
                  <MenubarTrigger 
                    className={cn(
                      "cursor-pointer transition-colors",
                      currentTab === "influencer" ? "text-purple-600 font-medium" : "text-gray-600"
                    )}
                    onClick={() => handleTabChange("influencer")}
                  >
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>For Influencers</span>
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
