"use client";

import React from "react";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, subMonths, addMonths } from "date-fns";

export default function PayrollHeader() {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payroll</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage salaries, bonuses, and process payments.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
          <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="h-8 w-8 text-gray-500 hover:text-gray-900">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium px-4 min-w-[140px] text-center text-gray-900">
            {format(currentDate, "MMMM yyyy")}
          </span>
          <Button variant="ghost" size="icon" onClick={handleNextMonth} className="h-8 w-8 text-gray-500 hover:text-gray-900">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 shadow-sm">
          <PlayCircle className="w-4 h-4" />
          <span>Run Payroll</span>
        </Button>
      </div>
    </div>
  );
}
