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

const Header = ({ title = "Dashboard", subtitle }) => {
  const defaultSubtitle =
    subtitle ||
    "An overview of key HR metrics and quick insights on employee activity.";

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 text-sm">{defaultSubtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Date Range Picker */}
          <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white">
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">
                January 1 - January 7, 2025
              </span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <Search className="w-5 h-5" />
          </button>
          <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-purple-600 rounded-full"></span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
