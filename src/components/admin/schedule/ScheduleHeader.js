"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addDays, startOfWeek } from "date-fns";

export default function ScheduleHeader({ onAddShift }) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDate = addDays(startDate, 6);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
           <p className="text-sm text-gray-500 mt-1">Manage weekly employee shifts</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1 ml-4 shadow-sm">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium px-2 w-48 text-center text-gray-700">
            {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="text-gray-600 border-gray-300 hover:bg-gray-50 bg-white">
          <Upload className="w-4 h-4 mr-2" />
          Publish
        </Button>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={onAddShift}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Shift
        </Button>
      </div>
    </div>
  );
}
