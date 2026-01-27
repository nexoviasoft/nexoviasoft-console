"use client";

import React from "react";
import {
  Calendar,
  Search,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut,
  Shield,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const Header = ({ title = "Squadlog", subtitle, onMenuClick }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const defaultSubtitle =
    subtitle ||
    "An overview of key HR metrics and quick insights on employee activity.";

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const getUserInitials = () => {
    if (!user) return "U";
    const name = user.name || user.username || user.email || "";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0]?.toUpperCase() || "U";
  };

  const getUserName = () => {
    if (!user) return "User";
    return user.name || user.username || user.email || "User";
  };

  return (
    <header className="relative bg-white/5 backdrop-blur-xl border-b border-white/10 px-4 lg:px-8 py-4 lg:py-6 text-white">
      <div className="absolute inset-y-0 left-0 w-1 bg-[#EFFC76] rounded-r-full shadow-[0_0_18px_rgba(239,252,118,0.6)]" />
      <div className="absolute inset-y-0 right-0 w-1 bg-[#EFFC76] rounded-l-full shadow-[0_0_18px_rgba(239,252,118,0.6)]" />
      <div className="flex items-center lg:items-start justify-between mb-0 lg:mb-4 relative z-10 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-white/70 hover:text-[#EFFC76] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">{title}</h1>
            <p className="text-white/70 text-sm hidden sm:block">{defaultSubtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Date Range Picker */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg bg-white/5">
            <button className="text-[#EFFC76] hover:brightness-110">
              <ChevronLeft className="w-4 h-4 text-[#EFFC76]" />
            </button>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#EFFC76]" />
              <span className="text-sm text-white/80">
                January 1 - January 7, 2025
              </span>
            </div>
            <button className="text-[#EFFC76] hover:brightness-110">
              <ChevronRight className="w-4 h-4 text-[#EFFC76]" />
            </button>
          </div>
          <button className="p-2 text-[#EFFC76] hover:bg-white/10 rounded-lg">
            <Search className="w-5 h-5 text-[#EFFC76]" />
          </button>
          <button className="relative p-2 text-[#EFFC76] hover:bg-white/10 rounded-lg">
            <Bell className="w-5 h-5 text-[#EFFC76]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#EFFC76] rounded-full shadow-[0_0_12px_rgba(239,252,118,0.8)]"></span>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-[#EFFC76] hover:bg-white/10 rounded-lg transition-colors">
                <Avatar className="w-8 h-8 border border-[#EFFC76]/30">
                  {user?.profileImage ? (
                    <AvatarImage src={user.profileImage} alt={getUserName()} />
                  ) : null}
                  <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76] text-sm font-semibold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-[#0F0F0F]/95 backdrop-blur-xl border-white/10">
              <DropdownMenuLabel className="px-3 py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border border-white/20">
                    {user?.profileImage ? (
                      <AvatarImage src={user.profileImage} alt={getUserName()} />
                    ) : null}
                    <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76] font-semibold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-sm">{getUserName()}</span>
                    {user?.email && (
                      <span className="text-white/60 text-xs">{user.email}</span>
                    )}
                  </div>
                </div>
              </DropdownMenuLabel>
              {user?.role && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="px-3 py-2 cursor-default">
                    <Shield className="w-4 h-4 mr-2 text-white/60" />
                    <span className="text-white/80 text-sm capitalize">{user.role}</span>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="px-3 py-2 text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
