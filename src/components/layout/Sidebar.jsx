"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavItems, othersNavItems } from "./navigationData";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [mainExpanded, setMainExpanded] = useState(true);
  const [othersExpanded, setOthersExpanded] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});
  const pathname = usePathname();

  // Recursive function to check if any child (at any level) is active
  const hasActiveChildRecursive = (item) => {
    if (!item.children) return false;
    return item.children.some(child => {
      const isChildActive = pathname.startsWith(child.href) && child.href !== "#";
      return isChildActive || hasActiveChildRecursive(child);
    });
  };

  // Auto-expand items with active children (recursive)
  React.useEffect(() => {
    const checkAndExpand = (items) => {
      items.forEach(item => {
        if (item.children) {
          if (hasActiveChildRecursive(item)) {
            setExpandedItems(prev => ({ ...prev, [item.id]: true }));
          }
          // Recursively check children
          checkAndExpand(item.children);
        }
      });
    };
    checkAndExpand(mainNavItems);
    checkAndExpand(othersNavItems);
  }, [pathname]);

  const toggleItem = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const renderNavItem = (item, level = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.id] || false;
    
    // Check if active based on href. Simple check: exact match or starts with if not root
    const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href) && item.href !== "#";
    
    // Check if any child is active (recursive)
    const hasActiveChild = hasActiveChildRecursive(item);
    
    const shouldShowExpanded = hasActiveChild || isExpanded;
    const iconSize = level === 0 ? "w-5 h-5" : "w-4 h-4";
    
    return (
      <div key={item.id} className="space-y-1">
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleItem(item.id)}
              className={cn(
                "group w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ease-in-out",
                "hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100/50",
                "hover:shadow-sm hover:scale-[1.02]",
                (isActive || hasActiveChild)
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-500/30"
                  : "text-gray-700"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn(
                  iconSize,
                  "transition-transform duration-200",
                  (isActive || hasActiveChild) ? "text-white" : "text-gray-600 group-hover:text-purple-600",
                  "group-hover:scale-110"
                )} />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className={cn(
                "w-4 h-4 transition-all duration-300 ease-in-out",
                shouldShowExpanded ? "rotate-90" : "rotate-0",
                (isActive || hasActiveChild) ? "text-white" : "text-gray-400 group-hover:text-purple-600"
              )} />
            </button>
            <div className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              shouldShowExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            )}>
              <div className={cn(
                "space-y-1 border-l-2 pl-3 ml-2 mt-1",
                level === 0 ? "border-purple-300" : "border-gray-300"
              )}>
                {item.children.map((child) => renderNavItem(child, level + 1))}
              </div>
            </div>
          </>
        ) : (
          <Link
            href={item.href || "#"}
            className={cn(
              "group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ease-in-out",
              "hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100/50",
              "hover:shadow-sm hover:scale-[1.02] hover:translate-x-1",
              isActive
                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-500/30"
                : "text-gray-700"
            )}
          >
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full animate-pulse" />
            )}
            <Icon className={cn(
              iconSize,
              "transition-all duration-200",
              isActive ? "text-white" : "text-gray-600 group-hover:text-purple-600",
              "group-hover:scale-110 group-hover:rotate-3"
            )} />
            <span className={cn(
              "font-medium transition-colors",
              isActive ? "text-white" : "text-gray-700 group-hover:text-purple-700"
            )}>{item.label}</span>
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-gradient-to-b from-gray-50 to-white h-screen flex flex-col border-r border-gray-200/60 shadow-lg shadow-gray-900/5">
      {/* Logo and Company */}
      <div className="p-6 border-b border-gray-200/60 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4 group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <div className="w-5 h-5 bg-white rounded-sm"></div>
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm text-gray-900 transition-colors group-hover:text-purple-600">
              Makmur Bahagia
            </div>
            <div className="text-xs text-gray-500">Company</div>
          </div>
          <button className="text-gray-400 hover:text-purple-600 transition-colors duration-200 hover:scale-110">
            <ChevronDown className="w-4 h-4 transition-transform duration-200" />
          </button>
        </div>
        {/* Quick Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors duration-200 group-focus-within:text-purple-600" />
          <input
            type="text"
            placeholder="Quick search..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-gray-200 rounded-lg text-sm 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 
                     transition-all duration-200 hover:border-purple-300 hover:bg-white
                     placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        {/* MAIN Section */}
        <div className="mb-6">
          <button
            onClick={() => setMainExpanded(!mainExpanded)}
            className="group flex items-center justify-between w-full mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider 
                     hover:text-purple-600 transition-all duration-200"
          >
            <span className="transition-colors duration-200">MAIN</span>
            <ChevronDown className={cn(
              "w-4 h-4 transition-all duration-300 ease-in-out",
              mainExpanded ? "rotate-180" : "rotate-0",
              "group-hover:text-purple-600"
            )} />
          </button>
          <div className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            mainExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className="space-y-1">
              {mainNavItems.map(renderNavItem)}
            </div>
          </div>
        </div>

        {/* OTHERS Section */}
        <div>
          <button
            onClick={() => setOthersExpanded(!othersExpanded)}
            className="group flex items-center justify-between w-full mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider 
                     hover:text-purple-600 transition-all duration-200"
          >
            <span className="transition-colors duration-200">OTHERS</span>
            <ChevronDown className={cn(
              "w-4 h-4 transition-all duration-300 ease-in-out",
              othersExpanded ? "rotate-180" : "rotate-0",
              "group-hover:text-purple-600"
            )} />
          </button>
          <div className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            othersExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className="space-y-1">
              {othersNavItems.map(renderNavItem)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
