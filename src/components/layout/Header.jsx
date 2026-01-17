"use client";

import React from "react";
import {
  Calendar,
  Search,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Header = ({ title = "Squadlog", subtitle }) => {
  const defaultSubtitle =
    subtitle ||
    "An overview of key HR metrics and quick insights on employee activity.";

  return (
    <header className="relative bg-white/5 backdrop-blur-xl border-b border-white/10 px-8 py-6 text-white">
      <div className="absolute inset-y-0 left-0 w-1 bg-[#EFFC76] rounded-r-full shadow-[0_0_18px_rgba(239,252,118,0.6)]" />
      <div className="absolute inset-y-0 right-0 w-1 bg-[#EFFC76] rounded-l-full shadow-[0_0_18px_rgba(239,252,118,0.6)]" />
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">{title}</h1>
          <p className="text-white/70 text-sm">{defaultSubtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Date Range Picker */}
          <div className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg bg-white/5">
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
          <button className="p-2 text-[#EFFC76] hover:bg-white/10 rounded-lg">
            <User className="w-5 h-5 text-[#EFFC76]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
