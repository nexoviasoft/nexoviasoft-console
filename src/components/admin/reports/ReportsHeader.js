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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-1">
          Analyze business performance and team efficiency.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal bg-white border-gray-200">
              <Calendar className="mr-2 h-4 w-4 text-gray-400" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
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
        
        <Button variant="outline" className="text-gray-600 bg-white border-gray-200 hover:bg-gray-50">
           <Filter className="w-4 h-4 mr-2" />
           Filter
        </Button>

        <Button className="bg-white border text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm gap-2">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </Button>
      </div>
    </div>
  );
}
