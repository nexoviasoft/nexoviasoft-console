"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Plus, Upload, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addDays, startOfWeek } from "date-fns";

export default function ScheduleHeader({ onAddShift, onScheduleMeeting }) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDate = addDays(startDate, 6);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-white">Schedule</h1>
           <p className="text-sm text-white/60 mt-1">Manage weekly employee shifts</p>
        </div>
        
        <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 backdrop-blur-xl p-1 ml-4 shadow-[0_0_24px_rgba(0,0,0,0.45)]">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/60 hover:text-[#EFFC76] hover:bg-white/5"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium px-2 w-48 text-center text-white/80">
            {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/60 hover:text-[#EFFC76] hover:bg-white/5"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="glass-button border border-white/30 bg-white/10 text-white hover:bg-white/15"
        >
          <Upload className="w-4 h-4 mr-2 text-[#EFFC76]" />
          <span className="font-medium">Publish</span>
        </Button>
        <Button
          variant="outline"
          className="glass-button border border-white/30 bg-white/10 text-white hover:bg-white/15"
          onClick={onScheduleMeeting}
        >
          <Video className="w-4 h-4 mr-2 text-[#EFFC76]" />
          <span className="font-medium">Schedule Meeting</span>
        </Button>
        <Button
          className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
          onClick={onAddShift}
        >
          <Plus className="w-4 h-4 mr-2 text-black" />
          Add Shift
        </Button>
      </div>
    </div>
  );
}
