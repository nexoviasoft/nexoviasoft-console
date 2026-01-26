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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
      <div>
        <h1 className="text-2xl font-bold text-white">Payroll</h1>
        <p className="text-sm text-white/70 mt-1">
          Manage salaries, bonuses, and process payments.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row mb-5 items-center gap-3 w-full md:w-auto">
        <div className="flex items-center justify-between w-full sm:w-auto glass-card rounded-xl px-2 py-1 border-white/20">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevMonth}
            className="h-8 w-8 text-white/70 hover:text-[#EFFC76] hover:bg-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium px-4 min-w-[140px] text-center text-white">
            {format(currentDate, "MMMM yyyy")}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextMonth}
            className="h-8 w-8 text-white/70 hover:text-[#EFFC76] hover:bg-white/10"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <Button className="w-full sm:w-auto bg-[#EFFC76] hover:bg-[#e0ef5f] text-black gap-2 glass-button">
          <PlayCircle className="w-4 h-4" />
          <span>Run Payroll</span>
        </Button>
      </div>
    </div>
  );
}
