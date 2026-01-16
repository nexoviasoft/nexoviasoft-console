"use client";

import React from "react";
import ScheduleHeader from "@/components/admin/schedule/ScheduleHeader";
import ScheduleGrid from "@/components/admin/schedule/ScheduleGrid";

export default function Schedule() {
  return (
    <div className="bg-gray-50 px-8 py-8 flex flex-col">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full">
        <ScheduleHeader />
        <div className="flex-1 min-h-0">
           <ScheduleGrid />
        </div>
      </div>
    </div>
  );
}
