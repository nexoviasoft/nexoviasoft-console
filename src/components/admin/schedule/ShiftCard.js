"use client";

import React from "react";
import { Clock } from "lucide-react";

/**
 * ShiftCard Component
 * 
 * Displays an individual shift card in the schedule grid with modern design.
 * Features include:
 * - Gradient backgrounds based on shift type
 * - Smooth hover animations
 * - Icon integration for better visual hierarchy
 * - Responsive sizing and spacing
 * 
 * @param {Object} props - Component props
 * @param {Object|null} props.shift - Shift data object containing time, label, and type
 * @param {string} props.shift.time - Time range for the shift (e.g., "09:00 - 17:00")
 * @param {string} props.shift.label - Shift category/label (e.g., "Design", "Dev")
 * @param {string} props.shift.type - Shift type: "morning", "afternoon", "night", or "off"
 */
export default function ShiftCard({ shift }) {
  /**
   * Color scheme definitions for different shift types
   * Each type has unique gradients, borders, shadows, and hover states
   */
  const colorStyles = {
    // Morning shift: Bright yellow-green with high contrast
    morning:
      "bg-gradient-to-br from-[#EFFC76]/20 via-[#EFFC76]/10 to-transparent " +
      "border border-[#EFFC76]/30 " +
      "hover:from-[#EFFC76]/30 hover:via-[#EFFC76]/15 hover:border-[#EFFC76]/50 " +
      "shadow-[0_4px_20px_rgba(239,252,118,0.15)] hover:shadow-[0_6px_30px_rgba(239,252,118,0.25)]",

    // Afternoon shift: Warmer tones with medium intensity
    afternoon:
      "bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent " +
      "border border-emerald-500/30 " +
      "hover:from-emerald-500/30 hover:via-emerald-500/15 hover:border-emerald-500/50 " +
      "shadow-[0_4px_20px_rgba(16,185,129,0.15)] hover:shadow-[0_6px_30px_rgba(16,185,129,0.25)]",

    // Night shift: Cooler blue tones for evening work
    night:
      "bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent " +
      "border border-blue-500/30 " +
      "hover:from-blue-500/30 hover:via-blue-500/15 hover:border-blue-500/50 " +
      "shadow-[0_4px_20px_rgba(59,130,246,0.15)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.25)]",

    // Off/empty shift: Subtle neutral styling
    off: 
      "bg-white/5 border border-white/10 " +
      "hover:bg-white/10 hover:border-white/20",
  };

  /**
   * Text color schemes matching shift types
   * Ensures proper contrast and readability
   */
  const textColors = {
    morning: "text-[#EFFC76]",
    afternoon: "text-emerald-400",
    night: "text-blue-400",
    off: "text-white/40",
  };

  // Render empty state for null shifts (days off or unscheduled)
  if (!shift) {
    return (
      <div 
        className="
          h-full w-full min-h-[90px] rounded-xl 
          border-2 border-dashed border-white/20 
          hover:border-[#EFFC76]/50 hover:bg-[#EFFC76]/5 
          transition-all duration-300 
          flex items-center justify-center 
          cursor-pointer group
        "
      >
        <span className="text-3xl text-white/20 group-hover:text-[#EFFC76]/60 transition-colors duration-300">
          +
        </span>
      </div>
    );
  }

  // Get styling based on shift type, default to morning if type is invalid
  const style = colorStyles[shift.type] || colorStyles.morning;
  const textColor = textColors[shift.type] || textColors.morning;

  return (
    <div
      className={`
        h-full w-full min-h-[90px] 
        p-3 rounded-xl 
        ${style} 
        transition-all duration-300 
        cursor-pointer 
        flex flex-col justify-between
        backdrop-blur-sm
        group
      `}
    >
      {/* Time display with icon */}
      <div className="flex items-center gap-1.5 mb-2">
        <Clock className={`w-3.5 h-3.5 ${textColor} opacity-80`} />
        <div className={`font-semibold text-xs ${textColor} tracking-wide`}>
          {shift.time}
        </div>
      </div>

      {/* Shift label/category */}
      <div className="flex-1 flex items-end">
        <div 
          className={`
            text-[11px] font-bold uppercase 
            tracking-wider ${textColor} 
            opacity-90 group-hover:opacity-100 
            transition-opacity duration-300
          `}
        >
          {shift.label}
        </div>
      </div>

      {/* Decorative accent line */}
      <div className={`h-0.5 w-8 ${textColor} opacity-30 mt-2 rounded-full`} />
    </div>
  );
}
