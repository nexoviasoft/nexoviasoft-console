"use client";

import React from "react";

export default function ShiftCard({ shift }) {
  const colorStyles = {
    morning:
      "bg-[#EFFC76]/10 border-[#EFFC76]/50 text-[#EFFC76] hover:bg-[#EFFC76]/20",
    afternoon:
      "bg-purple-500/15 border-purple-400/60 text-purple-200 hover:bg-purple-500/25",
    night:
      "bg-indigo-500/20 border-indigo-400/60 text-indigo-200 hover:bg-indigo-500/30",
    off:
      "bg-white/5 border-white/15 text-white/30 hover:bg-white/10 hover:text-white/60",
  };

  if (!shift) {
     return (
        <div className="h-full w-full min-h-[80px] rounded-lg border border-dashed border-white/25 hover:border-[#EFFC76] hover:bg-white/5 transition-colors flex items-center justify-center cursor-pointer group">
           <span className="text-2xl text-white/30 group-hover:text-[#EFFC76] font-light">+</span>
        </div>
     );
  }

  const style = colorStyles[shift.type] || colorStyles.morning;

  return (
    <div className={`h-full w-full min-h-[80px] p-2 rounded-lg border ${style} transition-colors cursor-pointer flex flex-col justify-center backdrop-blur-sm`}>
      <div className="font-semibold text-xs mb-1 text-white">{shift.time}</div>
      <div className="text-[10px] font-medium opacity-80 uppercase tracking-wide text-white/70">
        {shift.label}
      </div>
    </div>
  );
}
