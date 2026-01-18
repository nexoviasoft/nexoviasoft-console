"use client";

import React from "react";

export default function ShiftCard({ shift }) {
  const colorStyles = {
    morning:
      "bg-gradient-to-br from-[#D7E36A]/90 to-black/70 border border-[#D7E36A]/70 text-[#D7E36A] hover:from-[#9aa63e]/95 hover:to-black shadow-[0_0_18px_rgba(215,227,106,0.7)]",

    afternoon:
      "bg-gradient-to-br from-[#D7E36A]/95 via-[#5b6a1f]/85 to-[#1f240f]/90 border border-[#D7E36A]/70 text-white hover:from-[#b7c857]/95 hover:to-[#2a300f] shadow-[0_0_26px_rgba(215,227,106,0.85)]",

    night:
      "bg-gradient-to-br from-[#5b6a1f]/90 to-black/80 border border-[#D7E36A]/50 text-[#e6f0a8] hover:from-[#6f8125]/95 hover:to-black shadow-[0_0_22px_rgba(215,227,106,0.6)]",

    off: "bg-white/5 border-[#D7E36A]/20 text-white/40 hover:bg-[#D7E36A]/10 hover:text-white/70",
  };

  if (!shift) {
    return (
      <div className="h-full w-full min-h-[80px] rounded-lg border border-dashed border-white/25 hover:border-[#EFFC76] hover:bg-white/5 transition-colors flex items-center justify-center cursor-pointer group">
        <span className="text-2xl text-white/30 group-hover:text-[#EFFC76] font-light">
          +
        </span>
      </div>
    );
  }

  const style = colorStyles[shift.type] || colorStyles.morning;

  return (
    <div
      className={`h-full w-full min-h-[80px] p-2 rounded-xl ${style} transition-all cursor-pointer flex flex-col justify-center backdrop-blur-md shadow-[0_0_22px_rgba(0,0,0,0.55)]`}
    >
      <div className="font-semibold text-[11px] mb-1 text-white tracking-wide">
        {shift.time}
      </div>
      <div className="text-[10px] font-medium opacity-90 uppercase tracking-[0.16em] text-white/80">
        {shift.label}
      </div>
    </div>
  );
}
