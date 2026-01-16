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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track employee attendance, work hours, and status.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
               <Button variant="ghost" className="h-8 px-3 text-sm font-medium text-gray-900 hover:bg-transparent">
                 <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
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

          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <Button variant="outline" className="gap-2 bg-white hover:bg-gray-50 text-gray-700 border-gray-200">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </Button>
      </div>
    </div>
  );
}
