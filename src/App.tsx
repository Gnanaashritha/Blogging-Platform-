
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext } from "react";
import Index from "./pages/Index";
import WriteBlog from "./pages/WriteBlog";
import BlogSearch from "./pages/BlogSearch";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AboutPage from "./pages/AboutPage";
import MyPosts from "./pages/MyPosts";


export interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  username: string;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
  username: "",
});

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  // Mock authentication
  const login = (username: string, password: string) => {
    // Simple validation - in a real app, this would validate against a backend
    if (username.trim() && password.trim()) {
      setIsAuthenticated(true);
      setUsername(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
              <Route path="/" element={isAuthenticated ? <Index /> : <Navigate to="/login" />} />
              <Route path="/write" element={isAuthenticated ? <WriteBlog /> : <Navigate to="/login" />} />
              <Route path="/search" element={isAuthenticated ? <BlogSearch /> : <Navigate to="/login" />} />
              <Route path="/blog/:id" element={isAuthenticated ? <BlogPost /> : <Navigate to="/login" />} />
              <Route path="/about" element={isAuthenticated ? <AboutPage /> : <Navigate to="/login" />} />
              <Route path="/myposts" element={isAuthenticated ? <MyPosts /> : <Navigate to="/login" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
