"use client";

import React from "react";
import { Download, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function AttendanceHeader() {
  const [date, setDate] = React.useState(new Date());

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Attendance</h1>
        <p className="text-sm text-white/60 mt-1">
          Track employee attendance, work hours, and status.
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center rounded-lg border border-white/15 bg-white/5 backdrop-blur-xl p-1 shadow-[0_0_24px_rgba(0,0,0,0.45)]">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/60 hover:text-[#EFFC76] hover:bg-white/5"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
               <Button
                 variant="ghost"
                 className="h-8 px-3 text-sm font-medium text-white hover:bg-white/5 hover:text-[#EFFC76]"
               >
                 <CalendarIcon className="mr-2 h-4 w-4 text-[#EFFC76]" />
                 {format(date, "MMM dd, yyyy")}
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/60 hover:text-[#EFFC76] hover:bg-white/5"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <Button
          variant="outline"
          className="gap-2 glass-button border border-[#EFFC76]/60 bg-[#EFFC76] text-black hover:bg-[#e0ef5f]"
        >
          <Download className="w-4 h-4 text-black" />
          <span className="font-medium">Export Report</span>
        </Button>
      </div>
    </div>
  );
}
