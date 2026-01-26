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
      "shadow-[0_4px_20px_rgba(251,191,36,0.15)] hover:shadow-[0_8px_32px_rgba(251,191,36,0.25)] " +
      "hover:scale-[1.01] hover:-translate-y-0.5",

    afternoon:
      "bg-gradient-to-br from-orange-500/25 via-pink-400/20 to-rose-400/15 " +
      "border border-orange-400/40 " +
      "hover:from-orange-500/35 hover:via-pink-400/30 hover:to-rose-400/25 hover:border-orange-400/60 " +
      "shadow-[0_4px_20px_rgba(249,115,22,0.15)] hover:shadow-[0_8px_32px_rgba(249,115,22,0.25)] " +
      "hover:scale-[1.01] hover:-translate-y-0.5",

    night:
      "bg-gradient-to-br from-indigo-500/25 via-purple-400/20 to-blue-500/15 " +
      "border border-indigo-400/40 " +
      "hover:from-indigo-500/35 hover:via-purple-400/30 hover:to-blue-500/25 hover:border-indigo-400/60 " +
      "shadow-[0_4px_20px_rgba(99,102,241,0.15)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.25)] " +
      "hover:scale-[1.01] hover:-translate-y-0.5",

    evening:
      "bg-gradient-to-br from-purple-500/25 via-fuchsia-400/20 to-pink-500/15 " +
      "border border-purple-400/40 " +
      "hover:from-purple-500/35 hover:via-fuchsia-400/30 hover:to-pink-500/25 hover:border-purple-400/60 " +
      "shadow-[0_4px_20px_rgba(168,85,247,0.15)] hover:shadow-[0_8px_32px_rgba(168,85,247,0.25)] " +
      "hover:scale-[1.01] hover:-translate-y-0.5",

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

  // Empty state with modern design - more compact
  if (!shift) {
    return (
      <div 
        className="
          h-full w-full min-h-[75px] rounded-xl 
          border-2 border-dashed border-white/15 
          hover:border-[#EFFC76]/60 hover:bg-[#EFFC76]/5 
          transition-all duration-300 ease-out
          flex items-center justify-center 
          cursor-pointer group
          relative overflow-hidden
        "
      >
        {/* Animated background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EFFC76]/0 to-[#EFFC76]/0 group-hover:from-[#EFFC76]/10 group-hover:to-transparent transition-all duration-300" />
        
        <span className="relative text-2xl text-white/15 group-hover:text-[#EFFC76]/70 transition-all duration-300 group-hover:scale-110">
          +
        </span>
      </div>
    );
  }

  const style = colorStyles[shift.type] || colorStyles.morning;
  const textColor = textColors[shift.type] || textColors.morning;
  const badgeColor = badgeColors[shift.type] || badgeColors.morning;

  return (
    <div
      className={`
        h-full w-full min-h-[75px] 
        p-3 rounded-xl 
        ${style} 
        transition-all duration-300 ease-out
        cursor-pointer 
        flex flex-col justify-between
        backdrop-blur-md
        group
        relative overflow-hidden
      `}
    >
      {/* Animated shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Time badge - more compact */}
        <div className={`
          inline-flex items-center gap-1 
          px-2 py-0.5 rounded-md 
          border ${badgeColor}
          backdrop-blur-sm
          mb-2
          group-hover:scale-105 transition-transform duration-300
        `}>
          <Clock className={`w-3 h-3 ${textColor}`} />
          <span className={`font-semibold text-[10px] ${textColor} tracking-wide`}>
            {shift.time}
          </span>
        </div>

        {/* Shift label - more compact */}
        <div className="flex items-center gap-1.5">
          <Sparkles className={`w-3 h-3 ${textColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
          <h3 
            className={`
              text-xs font-bold uppercase 
              tracking-wider ${textColor} 
              opacity-90 group-hover:opacity-100 
              transition-opacity duration-300
            `}
          >
            {shift.label}
          </h3>
        </div>

        {/* Decorative elements - smaller */}
        <div className="flex gap-1 mt-2">
          <div className={`h-0.5 w-6 ${textColor} opacity-40 rounded-full group-hover:w-10 transition-all duration-300`} />
          <div className={`h-0.5 w-3 ${textColor} opacity-20 rounded-full group-hover:w-5 transition-all duration-300 delay-75`} />
        </div>
      </div>

      {/* Corner accent - smaller */}
      <div className={`absolute top-0 right-0 w-12 h-12 ${textColor} opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity duration-300`} />
    </div>
  );
}
