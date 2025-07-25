
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem 
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, LogOut } from "lucide-react";
import { AuthContext } from "../App";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");
  const { isAuthenticated, username, logout } = useContext(AuthContext);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          <Link to="/" className="text-xl font-bold">
            WriteVerse
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 items-center justify-center px-8">
          <form onSubmit={handleSearch} className="w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-2">
            <NavigationMenuItem>
              <Link to="/search">
                <Button variant="ghost">Explore</Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/write">
                <Button>Write</Button>
              </Link>
            </NavigationMenuItem>
            {isAuthenticated && (
              <>
                <NavigationMenuItem>
                  <Link to="/myposts">
                    <Button variant="ghost">My Posts</Button>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <span className="text-sm text-muted-foreground mr-2">
                    Hi, {username}
                  </span>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={logout} 
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="md:hidden border-t">
        <form onSubmit={handleSearch} className="p-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Navbar;
