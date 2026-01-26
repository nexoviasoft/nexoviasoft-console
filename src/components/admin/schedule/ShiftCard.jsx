"use client";

import React from "react";
import { Clock, Sparkles } from "lucide-react";

export default function ShiftCard({ shift }) {
  // Enhanced color schemes with vibrant gradients and glow effects
  const colorStyles = {
    morning:
      "bg-gradient-to-br from-amber-400/25 via-yellow-300/20 to-[#EFFC76]/15 " +
      "border border-amber-400/40 " +
      "hover:from-amber-400/35 hover:via-yellow-300/30 hover:to-[#EFFC76]/25 hover:border-amber-400/60 " +
      "shadow-[0_8px_32px_rgba(251,191,36,0.2)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.35)] " +
      "hover:scale-[1.02] hover:-translate-y-0.5",

    afternoon:
      "bg-gradient-to-br from-orange-500/25 via-pink-400/20 to-rose-400/15 " +
      "border border-orange-400/40 " +
      "hover:from-orange-500/35 hover:via-pink-400/30 hover:to-rose-400/25 hover:border-orange-400/60 " +
      "shadow-[0_8px_32px_rgba(249,115,22,0.2)] hover:shadow-[0_12px_48px_rgba(249,115,22,0.35)] " +
      "hover:scale-[1.02] hover:-translate-y-0.5",

    night:
      "bg-gradient-to-br from-indigo-500/25 via-purple-400/20 to-blue-500/15 " +
      "border border-indigo-400/40 " +
      "hover:from-indigo-500/35 hover:via-purple-400/30 hover:to-blue-500/25 hover:border-indigo-400/60 " +
      "shadow-[0_8px_32px_rgba(99,102,241,0.2)] hover:shadow-[0_12px_48px_rgba(99,102,241,0.35)] " +
      "hover:scale-[1.02] hover:-translate-y-0.5",

    evening:
      "bg-gradient-to-br from-purple-500/25 via-fuchsia-400/20 to-pink-500/15 " +
      "border border-purple-400/40 " +
      "hover:from-purple-500/35 hover:via-fuchsia-400/30 hover:to-pink-500/25 hover:border-purple-400/60 " +
      "shadow-[0_8px_32px_rgba(168,85,247,0.2)] hover:shadow-[0_12px_48px_rgba(168,85,247,0.35)] " +
      "hover:scale-[1.02] hover:-translate-y-0.5",

    off: 
      "bg-gradient-to-br from-white/5 to-white/[0.02] " +
      "border border-white/10 " +
      "hover:bg-white/10 hover:border-white/20",
  };

  const textColors = {
    morning: "text-amber-300",
    afternoon: "text-orange-300",
    night: "text-indigo-300",
    evening: "text-purple-300",
    off: "text-white/40",
  };

  const badgeColors = {
    morning: "bg-amber-400/20 text-amber-200 border-amber-400/30",
    afternoon: "bg-orange-400/20 text-orange-200 border-orange-400/30",
    night: "bg-indigo-400/20 text-indigo-200 border-indigo-400/30",
    evening: "bg-purple-400/20 text-purple-200 border-purple-400/30",
    off: "bg-white/10 text-white/40 border-white/20",
  };

  // Empty state with modern design
  if (!shift) {
    return (
      <div 
        className="
          h-full w-full min-h-[100px] rounded-2xl 
          border-2 border-dashed border-white/15 
          hover:border-[#EFFC76]/60 hover:bg-[#EFFC76]/5 
          transition-all duration-500 ease-out
          flex items-center justify-center 
          cursor-pointer group
          relative overflow-hidden
        "
      >
        {/* Animated background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EFFC76]/0 to-[#EFFC76]/0 group-hover:from-[#EFFC76]/10 group-hover:to-transparent transition-all duration-500" />
        
        <div className="relative flex flex-col items-center gap-1">
          <span className="text-4xl text-white/15 group-hover:text-[#EFFC76]/70 transition-all duration-300 group-hover:scale-110">
            +
          </span>
          <span className="text-[10px] text-white/30 group-hover:text-[#EFFC76]/60 font-medium transition-colors duration-300">
            Add Shift
          </span>
        </div>
      </div>
    );
  }

  const style = colorStyles[shift.type] || colorStyles.morning;
  const textColor = textColors[shift.type] || textColors.morning;
  const badgeColor = badgeColors[shift.type] || badgeColors.morning;

  return (
    <div
      className={`
        h-full w-full min-h-[100px] 
        p-4 rounded-2xl 
        ${style} 
        transition-all duration-500 ease-out
        cursor-pointer 
        flex flex-col justify-between
        backdrop-blur-md
        group
        relative overflow-hidden
      `}
    >
      {/* Animated shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Time badge */}
        <div className={`
          inline-flex items-center gap-1.5 
          px-2.5 py-1.5 rounded-lg 
          border ${badgeColor}
          backdrop-blur-sm
          mb-3
          group-hover:scale-105 transition-transform duration-300
        `}>
          <Clock className={`w-3.5 h-3.5 ${textColor}`} />
          <span className={`font-semibold text-xs ${textColor} tracking-wide`}>
            {shift.time}
          </span>
        </div>

        {/* Shift label */}
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className={`w-4 h-4 ${textColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
          <h3 
            className={`
              text-sm font-bold uppercase 
              tracking-wider ${textColor} 
              opacity-90 group-hover:opacity-100 
              transition-opacity duration-300
            `}
          >
            {shift.label}
          </h3>
        </div>

        {/* Decorative elements */}
        <div className="flex gap-1 mt-3">
          <div className={`h-1 w-8 ${textColor} opacity-40 rounded-full group-hover:w-12 transition-all duration-500`} />
          <div className={`h-1 w-4 ${textColor} opacity-20 rounded-full group-hover:w-6 transition-all duration-500 delay-75`} />
        </div>
      </div>

      {/* Corner accent */}
      <div className={`absolute top-0 right-0 w-16 h-16 ${textColor} opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity duration-300`} />
    </div>
  );
}
