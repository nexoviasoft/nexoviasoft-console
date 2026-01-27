"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, ChevronRight, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavItems, othersNavItems } from "./navigationData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { filterNavItemsByRole } from "@/lib/utils/roleAccess";

const Sidebar = ({ isOpen, onClose }) => {
  const [mainExpanded, setMainExpanded] = useState(true);
  const [othersExpanded, setOthersExpanded] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});
  const pathname = usePathname();
  const { userRole, isLoading: authLoading } = useAuth();

  // Filter navigation items based on user role
  const filteredMainNavItems = useMemo(() => {
    if (authLoading || !userRole) return [];
    return filterNavItemsByRole(mainNavItems, userRole);
  }, [userRole, authLoading]);

  const filteredOthersNavItems = useMemo(() => {
    if (authLoading || !userRole) return [];
    return filterNavItemsByRole(othersNavItems, userRole);
  }, [userRole, authLoading]);

  // Recursive function to check if any child (at any level) is active
  const hasActiveChildRecursive = (item) => {
    if (!item.children) return false;
    return item.children.some((child) => {
      const isChildActive =
        pathname.startsWith(child.href) && child.href !== "#";
      return isChildActive || hasActiveChildRecursive(child);
    });
  };

  // Auto-expand items with active children (recursive)
  React.useEffect(() => {
    const checkAndExpand = (items) => {
      items.forEach((item) => {
        if (item.children) {
          if (hasActiveChildRecursive(item)) {
            setExpandedItems((prev) => ({ ...prev, [item.id]: true }));
          }
          // Recursively check children
          checkAndExpand(item.children);
        }
      });
    };
    checkAndExpand(filteredMainNavItems);
    checkAndExpand(filteredOthersNavItems);
  }, [pathname, filteredMainNavItems, filteredOthersNavItems]);

  const toggleItem = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const renderNavItem = (item, level = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.id] || false;

    // Check if active based on href. Simple check: exact match or starts with if not root
    const isActive =
      item.href === "/"
        ? pathname === "/"
        : pathname.startsWith(item.href) && item.href !== "#";

    // Check if any child is active (recursive)
    const hasActiveChild = hasActiveChildRecursive(item);

    const shouldShowExpanded = hasActiveChild || isExpanded;
    const iconSize = level === 0 ? "w-5 h-5" : "w-4 h-4";

    return (
      <div key={item.id} className="space-y-2 mt-3">
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleItem(item.id)}
              className={cn(
                "group w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ease-in-out",
                "hover:bg-white/10 hover:translate-x-1",
                isActive || hasActiveChild
                  ? "bg-[#EFFC76]/10 border border-[#EFFC76]/60 text-white shadow-[0_0_24px_rgba(239,252,118,0.45)]"
                  : "text-white/70",
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    iconSize,
                    "transition-transform duration-200",
                    isActive || hasActiveChild
                      ? "text-[#EFFC76]"
                      : "text-white/60 group-hover:text-[#EFFC76]",
                    "group-hover:scale-110",
                  )}
                />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight
                className={cn(
                  "w-4 h-4 transition-all duration-300 ease-in-out",
                  shouldShowExpanded ? "rotate-90" : "rotate-0",
                  isActive || hasActiveChild
                    ? "text-[#EFFC76]"
                    : "text-white/40 group-hover:text-[#EFFC76]",
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                shouldShowExpanded
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0",
              )}
            >
              <div
                className={cn(
                  "space-y-1 border-l-2 pl-3 ml-2 mt-1",
                  level === 0 ? "border-[#EFFC76]/60" : "border-white/20",
                )}
              >
                {item.children.map((child) => renderNavItem(child, level + 1))}
              </div>
            </div>
          </>
        ) : (
          <Link
            href={item.href || "#"}
            className={cn(
              "group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ease-in-out",
              "hover:bg-white/10 hover:translate-x-1",
              isActive
                ? "bg-[#EFFC76]/10 border border-[#EFFC76]/60 text-white shadow-[0_0_24px_rgba(239,252,118,0.45)]"
                : "text-white/70",
            )}
          >
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#EFFC76] rounded-r-full shadow-[0_0_16px_rgba(239,252,118,0.9)] animate-pulse" />
            )}
            <Icon
              className={cn(
                iconSize,
                "transition-all duration-200",
                isActive
                  ? "text-[#EFFC76]"
                  : "text-white/60 group-hover:text-[#EFFC76]",
                "group-hover:scale-110 group-hover:rotate-3",
              )}
            />
            <span
              className={cn(
                "font-medium transition-colors",
                isActive
                  ? "text-white"
                  : "text-white/70 group-hover:text-white",
              )}
            >
              {item.label}
            </span>
          </Link>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 h-screen flex flex-col border-r border-white/10 bg-[#0A0A0A] lg:bg-black/40 backdrop-blur-2xl text-white shadow-[0_0_40px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 lg:hidden text-white/50 hover:text-white z-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-xl ">
          <div className="flex items-center gap-3 mb-4 group">
            <img src="/customIcon.png" className="w-10 h-9  "></img>

            <div className="flex-1">
              <div className="font-bold text-sm text-white transition-colors group-hover:text-[#EFFC76]">
                SquadLog Console
              </div>
              <div className="text-xs text-white/60">Dashboard</div>
            </div>
            <button className="text-white/50 lg:block hidden hover:text-[#EFFC76] transition-colors duration-200 hover:scale-110">
              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
            </button>
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 transition-colors duration-200 group-focus-within:text-[#EFFC76]" />
            <input
              type="text"
              placeholder="Quick search..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm 
                     focus:outline-none focus:ring-2 focus:ring-[#EFFC76]/40 focus:border-[#EFFC76]/60 
                     transition-all duration-200 hover:border-[#EFFC76]/40 hover:bg-white/10
                     placeholder:text-white/40 text-white"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-glass">
          <div className="mb-6">
            <button
              onClick={() => setMainExpanded(!mainExpanded)}
              className="group flex items-center justify-between w-full mb-3 text-xs font-bold text-white/60 uppercase tracking-wider 
                     hover:text-[#EFFC76] transition-all duration-200"
            >
              <span className="transition-colors duration-200">MAIN</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-all duration-300 ease-in-out",
                  mainExpanded ? "rotate-180" : "rotate-0",
                  "text-white/40 group-hover:text-[#EFFC76]",
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                mainExpanded
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0",
              )}
            >
              <div className="space-y-1">{filteredMainNavItems.map(renderNavItem)}</div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setOthersExpanded(!othersExpanded)}
              className="group flex items-center justify-between w-full mb-3 text-xs font-bold text-white/60 uppercase tracking-wider 
                     hover:text-[#EFFC76] transition-all duration-200"
            >
              <span className="transition-colors duration-200">OTHERS</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-all duration-300 ease-in-out",
                  othersExpanded ? "rotate-180" : "rotate-0",
                  "text-white/40 group-hover:text-[#EFFC76]",
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                othersExpanded
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0",
              )}
            >
              <div className="space-y-1">
                {filteredOthersNavItems.map(renderNavItem)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
