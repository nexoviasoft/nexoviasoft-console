"use client";

import React from "react";

export default function ShiftCard({ shift }) {
  const colorStyles = {
    morning: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100",
    afternoon: "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100",
    night: "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100",
    off: "bg-gray-50 border-gray-200 text-gray-400 opacity-50",
  };

  if (!shift) {
     return (
        <div className="h-full w-full min-h-[80px] rounded-lg border border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors flex items-center justify-center cursor-pointer group">
           <span className="text-2xl text-gray-300 group-hover:text-purple-400 font-light">+</span>
        </div>
     );
  }

  const style = colorStyles[shift.type] || colorStyles.morning;

  return (
    <div className={`h-full w-full min-h-[80px] p-2 rounded-lg border ${style} transition-colors cursor-pointer flex flex-col justify-center`}>
      <div className="font-semibold text-xs mb-1">{shift.time}</div>
      <div className="text-[10px] font-medium opacity-80 uppercase tracking-wide">{shift.label}</div>
    </div>
  );
}
