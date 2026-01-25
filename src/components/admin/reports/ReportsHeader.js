"use client";

import React from "react";
import { Download, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, subDays } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

export default function ReportsHeader() {
  const [date, setDate] = React.useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-2">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Reports</h1>
        <p className="text-xs sm:text-sm text-white/70 mt-1">
          Analyze business performance and team efficiency.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-[260px] justify-start text-left font-normal bg-white/5 border border-white/20 text-white hover:bg-white/10 glass-button h-9 sm:h-10 text-xs sm:text-sm"
            >
              <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-[#EFFC76]" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span className="text-white/60">Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex-1 sm:flex-none glass-button border border-white/20 bg-transparent text-white/80 hover:bg-white/10 hover:text-white h-9 sm:h-10 text-xs sm:text-sm"
          >
            <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Filter
          </Button>

          <Button className="flex-1 sm:flex-none bg-[#EFFC76] hover:bg-[#e0ef5f] text-black border-none shadow-sm gap-2 glass-button h-9 sm:h-10 text-xs sm:text-sm">
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
