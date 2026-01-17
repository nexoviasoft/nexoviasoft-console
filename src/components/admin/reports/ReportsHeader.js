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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
      <div>
        <h1 className="text-2xl font-bold text-white">Reports</h1>
        <p className="text-sm text-white/70 mt-1">
          Analyze business performance and team efficiency.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[260px] justify-start text-left font-normal bg-white/5 border border-white/20 text-white hover:bg-white/10 glass-button"
            >
              <Calendar className="mr-2 h-4 w-4 text-[#EFFC76]" />
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
        
        <Button
          variant="outline"
          className="glass-button border border-white/20 bg-transparent text-white/80 hover:bg-white/10 hover:text-white"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>

        <Button className="bg-white hover:bg-white/90 text-black border border-white/30 shadow-sm gap-2 glass-button">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </Button>
      </div>
    </div>
  );
}
