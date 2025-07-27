import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, LogOut, Menu, X } from "lucide-react";
import { AuthContext } from "../App";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated, username, logout } = useContext(AuthContext);
    const isMobile = useIsMobile();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when screen size changes
    useEffect(() => {
        if (!isMobile) {
            setIsMobileMenuOpen(false);
        }
    }, [isMobile]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsMobileMenuOpen(false);
        }
    };

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`
        fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-in-out
        ${
            isScrolled
                ? "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/95 shadow-sm"
                : "bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60"
        }
      `}
        >
            <div className="container-custom">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <BookOpen className="w-7 h-7 text-primary transition-transform duration-300 hover:scale-110" />
                        <Link
                            to="/"
                            className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            WriteVerse
                        </Link>
                    </div>

                    {/* Desktop Search */}
                    <div className="hidden lg:flex flex-1 items-center justify-center px-8">
                        <form
                            onSubmit={handleSearch}
                            className="w-full max-w-md"
                        >
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search posts..."
                                    className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-transparent bg-muted/50
                           focus:border-primary/50 focus:bg-background transition-all duration-300
                           hover:bg-muted/70"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </div>
                        </form>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <NavigationMenu>
                            <NavigationMenuList className="flex items-center gap-1">
                                <NavigationMenuItem>
                                    <Link to="/search">
                                        <Button
                                            variant="ghost"
                                            className="px-4 py-2 rounded-lg hover:bg-accent/80 transition-all duration-300 hover:scale-105"
                                        >
                                            Explore
                                        </Button>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link to="/write">
                                        <Button
                                            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90
                               transition-all duration-300 hover:scale-105 hover:shadow-md"
                                        >
                                            Write
                                        </Button>
                                    </Link>
                                </NavigationMenuItem>
                                {isAuthenticated && (
                                    <>
                                        <NavigationMenuItem>
                                            <Link to="/myposts">
                                                <Button
                                                    variant="ghost"
                                                    className="px-4 py-2 rounded-lg hover:bg-accent/80 transition-all duration-300 hover:scale-105"
                                                >
                                                    My Posts
                                                </Button>
                                            </Link>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <div className="flex items-center gap-3 px-2">
                                                <span className="text-sm text-muted-foreground font-medium">
                                                    Hi, {username}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={logout}
                                                    title="Logout"
                                                    className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive
                                   transition-all duration-300 hover:scale-105"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </NavigationMenuItem>
                                    </>
                                )}
                                {!isAuthenticated && (
                                    <NavigationMenuItem>
                                        <Link to="/login">
                                            <Button
                                                variant="outline"
                                                className="px-4 py-2 rounded-lg border-2 hover:bg-primary hover:text-primary-foreground
                                 transition-all duration-300 hover:scale-105"
                                            >
                                                Sign In
                                            </Button>
                                        </Link>
                                    </NavigationMenuItem>
                                )}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="h-10 w-10 rounded-lg hover:bg-accent/80 transition-all duration-300"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${
                isMobileMenuOpen
                    ? "max-h-96 opacity-100 border-t"
                    : "max-h-0 opacity-0"
            }
          `}
                >
                    <div className="py-4 space-y-3">
                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="px-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search posts..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted/50 border-2 border-transparent
                           focus:border-primary/50 focus:bg-background transition-all duration-300"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </div>
                        </form>

                        {/* Mobile Navigation Links */}
                        <div className="space-y-2 px-1">
                            <Link
                                to="/search"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block"
                            >
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start rounded-lg hover:bg-accent/80 transition-all duration-300"
                                >
                                    Explore
                                </Button>
                            </Link>

                            <Link
                                to="/write"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block"
                            >
                                <Button
                                    className="w-full justify-start rounded-lg bg-primary hover:bg-primary/90
                           transition-all duration-300"
                                >
                                    Write
                                </Button>
                            </Link>

                            {isAuthenticated && (
                                <>
                                    <Link
                                        to="/myposts"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                        className="block"
                                    >
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start rounded-lg hover:bg-accent/80 transition-all duration-300"
                                        >
                                            My Posts
                                        </Button>
                                    </Link>

                                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/30">
                                        <span className="text-sm text-muted-foreground font-medium">
                                            Hi, {username}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleLogout}
                                            className="h-8 px-3 rounded-md hover:bg-destructive/10 hover:text-destructive
                               transition-all duration-300"
                                        >
                                            <LogOut className="h-4 w-4 mr-1" />
                                            Logout
                                        </Button>
                                    </div>
                                </>
                            )}

                            {!isAuthenticated && (
                                <Link
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start rounded-lg border-2 hover:bg-primary
                             hover:text-primary-foreground transition-all duration-300"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
