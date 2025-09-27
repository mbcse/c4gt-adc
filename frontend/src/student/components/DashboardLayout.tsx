import React, { useState } from "react";
import { Button } from "@/student/components/ui/button";
import { Avatar, AvatarFallback } from "@/student/components/ui/avatar";
import {
  BookOpen,
  Trophy,
  TrendingUp,
  Home,
  User,
  Menu,
  Brain,
  Crown,
  X,
  Zap,
  LogOut,
} from "lucide-react";
import { cn } from "@/student/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/student/components/ui/dropdown-menu";
import { useAuth } from '@/shared/context/AuthContext';
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function getInitials(name: string) {
  const names = name.trim().split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userName = user?.name || "User Name";
  const initials = getInitials(userName);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "My Courses", href: "/courses", icon: BookOpen },
    { name: "Progress", href: "/progress", icon: TrendingUp },
    { name: "Quizzes", href: "/quizzes", icon: Brain },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-violet-500 via-purple-500 to-indigo-600 shadow-xl flex flex-col relative overflow-hidden">
            {/* Animated Background Elements for Mobile */}
            <div className="absolute top-4 left-2 w-3 h-3 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
            <div className="absolute top-20 right-3 w-2 h-2 bg-pink-300 rounded-full animate-pulse opacity-70"></div>
            <div className="absolute bottom-32 left-4 w-4 h-4 bg-rose-300 rounded-full animate-bounce opacity-50"></div>
            <div className="absolute bottom-16 right-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-60"></div>

            <div className="flex items-center justify-between p-4 border-b border-white/20 relative z-10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-400 rounded-lg flex items-center justify-center shadow-md">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white drop-shadow-md">Rohtak Guided Learning Tracker</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-2 flex-1 relative z-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-x-3 rounded-xl p-3 text-sm font-medium transition-all duration-200",
                    location.pathname === item.href
                      ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg scale-105"
                      : "text-white/90 hover:bg-white/20 hover:text-white hover:scale-105",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Logout Button */}
            <div className="p-4 border-t border-white/20 relative z-10">
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-x-3 rounded-xl p-3 text-sm font-medium transition-all duration-200 w-full text-white/90 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white hover:scale-105"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-screen bg-gradient-to-b from-violet-500 via-purple-500 to-indigo-600 text-white shadow-2xl transition-all duration-300 z-30 hidden lg:flex flex-col",
          sidebarExpanded ? "w-64" : "w-16",
        )}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600"></div>
        <div className="absolute top-4 left-2 w-3 h-3 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-20 right-3 w-2 h-2 bg-pink-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute bottom-32 left-4 w-4 h-4 bg-rose-300 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute bottom-16 right-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-40 left-1 w-3 h-3 bg-emerald-300 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-60 right-4 w-2 h-2 bg-rose-300 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute bottom-40 left-3 w-2 h-2 bg-blue-300 rounded-full animate-ping opacity-60"></div>

        {/* Logo */}
        <div className="p-4 relative z-10">
          <div className={cn(
            "flex items-center bg-gradient-to-r from-rose-400 to-pink-400 rounded-xl transition-all duration-300 shadow-lg border-2 border-white/20",
            sidebarExpanded ? "space-x-3 p-3" : "p-2 justify-center"
          )}>
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
            {sidebarExpanded && (
              <span className="font-bold text-white drop-shadow-md">Rohtak Guided Learning Tracker</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-2 space-y-2 flex-1 relative z-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center gap-x-3 rounded-xl text-sm font-medium transition-all duration-200 backdrop-blur-sm",
                sidebarExpanded ? "p-3" : "p-2 justify-center",
                location.pathname === item.href
                  ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg scale-105 border border-white/30"
                  : "text-white/90 hover:bg-white/20 hover:text-white hover:scale-105 hover:shadow-md",
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0 drop-shadow-sm" />
              {sidebarExpanded && (
                <span className="transition-opacity duration-200 drop-shadow-sm">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-2 pb-4 border-t border-white/20 pt-2 relative z-10">
          <button
            onClick={handleLogout}
            className={cn(
              "group flex items-center gap-x-3 rounded-xl text-sm font-medium transition-all duration-200 w-full text-white/90 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white hover:scale-105 hover:shadow-md backdrop-blur-sm",
              sidebarExpanded ? "p-3" : "p-2 justify-center"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0 drop-shadow-sm" />
            {sidebarExpanded && (
              <span className="transition-opacity duration-200 drop-shadow-sm">
                Logout
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("min-h-screen relative z-10 transition-all duration-300", "lg:ml-16")}>
        {/* Mobile Header */}
        <div className="lg:hidden bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-600 border-b border-white/20 p-4 relative overflow-hidden">
          {/* Animated background elements for mobile header */}
          <div className="absolute top-1 left-4 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-2 right-8 w-1 h-1 bg-pink-300 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute bottom-1 left-16 w-2 h-2 bg-rose-300 rounded-full animate-bounce opacity-50"></div>

          <div className="flex items-center justify-between relative z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(true)}
              className="text-white hover:bg-white/20"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-rose-400 to-pink-400 rounded-md flex items-center justify-center shadow-md">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-white drop-shadow-md">Rohtak Guided Learning Tracker</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/profile">
                <Avatar className="h-8 w-8 cursor-pointer hover:scale-110 transition-transform duration-200 shadow-md border-2 border-white/30">
                  <AvatarFallback className="bg-gradient-to-r from-rose-400 to-pink-400 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Desktop Actions */}
        <div className="hidden lg:block fixed top-4 right-6 z-50">
          <div className="flex items-center space-x-3">
            <Link to="/profile">
              <Avatar className="h-10 w-10 cursor-pointer hover:scale-110 transition-transform duration-200 shadow-lg border-2 border-white/50 hover:border-rose-300">
                <AvatarFallback className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
