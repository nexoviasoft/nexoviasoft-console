"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const timelineData = [
  {
    category: "Crypto App Redesign",
    dateRange: "May 12 - May 14",
    items: [
      { 
         title: "Create Wireframe", 
         start: 1, // Mon (0 index based relative to view)
         duration: 2, 
         assignees: ["/avatars/01.png", "/avatars/02.png"],
         color: "bg-blue-100 border-blue-200"
      },
      { 
         title: "Style Guide", 
         start: 3, 
         duration: 2, 
         assignees: ["/avatars/03.png", "/avatars/04.png"],
         color: "bg-purple-100 border-purple-200"
      }
    ]
  },
  {
    category: "Financy Landingpage",
    dateRange: "May 12 - May 14",
    items: [
      { 
         title: "Slicing Design", 
         start: 2, 
         duration: 2,
         assignees: ["/avatars/02.png"],
         color: "bg-orange-100 border-orange-200"
      },
      { 
         title: "Back-end", 
         start: 4, 
         duration: 3, 
         assignees: ["/avatars/01.png", "/avatars/05.png"],
         color: "bg-green-100 border-green-200" 
      }
    ]
  },
  {
    category: "Icon Set Crypto",
    dateRange: "May 12 - May 14",
    items: [
       { 
         title: "Icon Low Fidelity", 
         start: 1, 
         duration: 2, 
         assignees: ["/avatars/03.png", "/avatars/04.png"],
         color: "bg-yellow-100 border-yellow-200"
      },
       { 
         title: "Icon High Fidelity", 
         start: 3, 
         duration: 2, 
         assignees: ["/avatars/01.png"],
         color: "bg-pink-100 border-pink-200"
      }
    ]
  },
   {
    category: "Binance Website",
    dateRange: "May 12 - May 14",
    items: [
       { 
         title: "Binance Website", 
         start: 3, 
         duration: 2, 
         assignees: ["/avatars/05.png"],
         color: "bg-lime-100 border-lime-200"
      }
    ]
  },
  {
    category: "Flowee Landing..",
    dateRange: "May 12 - May 14",
    items: [
       { 
         title: "Illustration", 
         start: 2, 
         duration: 2, 
         assignees: ["/avatars/02.png"],
         color: "bg-indigo-100 border-indigo-200"
      },
       { 
         title: "Wireframe", 
         start: 4, 
         duration: 2, 
         assignees: ["/avatars/03.png"],
         color: "bg-cyan-100 border-cyan-200"
      }
    ]
  },
   {
    category: "News - UI Kit",
    dateRange: "May 12 - May 14",
    items: [
       { 
         title: "UI Kit", 
         start: 2, 
         duration: 2, 
         assignees: ["/avatars/04.png"],
         color: "bg-sky-100 border-sky-200"
      },
       { 
         title: "Thumbnail Preview", 
         start: 5, 
         duration: 2, 
         assignees: ["/avatars/01.png", "/avatars/02.png"],
         color: "bg-rose-100 border-rose-200"
      }
    ]
  }
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function TimelineView() {
  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Header Row */}
      <div className="flex border-b border-gray-200">
        <div className="w-64 p-4 font-semibold text-gray-500 text-sm border-r border-gray-200">
           Task
        </div>
        <div className="flex-1 grid grid-cols-7">
          {days.map((day) => (
             <div key={day} className="p-4 text-center text-sm font-medium text-gray-500 border-r border-gray-100 last:border-r-0">
               {day}
             </div>
          ))}
        </div>
      </div>

      {/* Content Rows */}
      <div className="overflow-y-auto">
        {timelineData.map((row, index) => (
          <div key={index} className="flex border-b border-gray-100 min-h-[100px]">
            {/* Task Label */}
            <div className="w-64 p-4 border-r border-gray-200 flex flex-col justify-center">
              <div className="font-semibold text-gray-900 text-sm mb-1">{row.category}</div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span className="w-3 h-3"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></span>
                {row.dateRange}
              </div>
            </div>

            {/* Timeline Grid */}
            <div className="flex-1 grid grid-cols-7 relative">
               {/* Background Grid Lines */}
               {[0,1,2,3,4,5,6].map(i => (
                 <div key={i} className="border-r border-gray-50 h-full col-start-[auto] row-start-1 row-end-2"></div>
               ))}
               
               {/* Timeline Items */}
               {row.items.map((item, idx) => {
                 const startCol = item.start + 1; // grid columns are 1-based
                 const endCol = startCol + item.duration; // span

                 return (
                   <div 
                      key={idx}
                      className="relative z-10 m-2 mt-4"
                      style={{ 
                        gridColumnStart: startCol, 
                        gridColumnEnd: endCol,
                        gridRow: 1
                      }}
                   >
                     <div className={`p-3 rounded-lg border ${item.color} shadow-sm group hover:shadow-md transition-all cursor-pointer`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-gray-800">{item.title}</span>
                          <div className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100"></div>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] text-gray-500">Development</span>
                           <div className="flex -space-x-1.5">
                              {item.assignees.map((src, i) => (
                                 <Avatar key={i} className="w-4 h-4 border border-white">
                                    <AvatarImage src={src} />
                                    <AvatarFallback>U</AvatarFallback>
                                 </Avatar>
                              ))}
                           </div>
                        </div>
                     </div>
                   </div>
                 );
               })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Floating Action Button */}
      <div className="absolute bottom-8 right-8">
        <Button className="rounded-full h-12 px-6 shadow-lg bg-purple-600 hover:bg-purple-700">
           <Plus className="w-4 h-4 mr-2" />
           New Task
        </Button>
      </div>
    </div>
  );
}
