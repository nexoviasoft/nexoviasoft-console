"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Plus, Upload, Video, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addDays, startOfWeek } from "date-fns";

export default function ScheduleHeader({ onAddShift, onScheduleMeeting }) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDate = addDays(startDate, 6);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      {/* Title Section - more compact */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFFC76]/20 to-transparent blur-xl" />
          <Sparkles className="w-6 h-6 text-[#EFFC76] relative z-10" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Schedule
          </h1>
          <p className="text-xs text-white/50 mt-0.5 font-medium">
            Manage weekly employee shifts and meetings
          </p>
        </div>
      </div>

      {/* Actions Section - more compact */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Date Navigation */}
        <div className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-xl p-1 shadow-lg">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/60 hover:text-[#EFFC76] hover:bg-[#EFFC76]/10 transition-all duration-300 rounded-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="px-3 py-1 rounded-md bg-white/5">
            <span className="text-xs font-bold text-white/90 whitespace-nowrap">
              {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/60 hover:text-[#EFFC76] hover:bg-[#EFFC76]/10 transition-all duration-300 rounded-md"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Action Buttons - more compact */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="glass-button border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Upload className="w-3.5 h-3.5 mr-1.5 text-[#EFFC76]" />
            <span className="font-semibold text-xs">Publish</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="glass-button border border-purple-400/30 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-200 hover:from-purple-500/20 hover:to-indigo-500/20 hover:border-purple-400/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
            onClick={onScheduleMeeting}
          >
            <Video className="w-3.5 h-3.5 mr-1.5" />
            <span className="font-semibold text-xs">Schedule Meeting</span>
          </Button>
          
          <Button
            size="sm"
            className="bg-gradient-to-r from-[#EFFC76] to-[#e0ef5f] hover:from-[#e0ef5f] hover:to-[#d0df4f] text-black font-bold shadow-lg shadow-[#EFFC76]/30 hover:shadow-xl hover:shadow-[#EFFC76]/40 transition-all duration-300 hover:scale-105"
            onClick={onAddShift}
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            <span className="text-xs">Add Shift</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
